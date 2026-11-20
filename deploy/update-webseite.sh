#!/usr/bin/env bash
# Lädt das neueste GitHub-Release (webseite.jar) und startet den Dienst neu, wenn es neuer ist.
# Umgebung: WEBSEITE_DIR (Ziel), WEBSEITE_SERVICE (systemd-Unit), optional GITHUB_TOKEN (privates Repo).
set -euo pipefail

repo=${WEBSEITE_REPO:-Chr1ssi/webseite}
dir=${WEBSEITE_DIR:-/var/lib/webseite-release}
service=${WEBSEITE_SERVICE:-webseite.service}

mkdir -p "$dir"
exec 9>"$dir/.update.lock"
flock -n 9 || exit 0

auth=()
if [ -n "${GITHUB_TOKEN:-}" ]; then auth=(-H "Authorization: Bearer $GITHUB_TOKEN"); fi

release=$(curl -fsSL "${auth[@]}" -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$repo/releases/latest")
tag=$(jq -er .tag_name <<<"$release")
[ "$tag" != "$(cat "$dir/version" 2>/dev/null || true)" ] || exit 0

url=$(jq -er '.assets[] | select(.name == "webseite.jar") | .url' <<<"$release")
digest=$(jq -er '.assets[] | select(.name == "webseite.jar") | .digest' <<<"$release")

tmp=$(mktemp "$dir/webseite.jar.XXXXXX")
trap 'rm -f "$tmp"' EXIT
curl -fsSL "${auth[@]}" -H "Accept: application/octet-stream" -o "$tmp" "$url"

# Nie ein JAR veröffentlichen, das unvollständig ist oder die Seite nicht enthält.
[ "$digest" = "sha256:$(sha256sum "$tmp" | cut -d' ' -f1)" ] || { echo "Prüfsumme passt nicht" >&2; exit 1; }
unzip -l "$tmp" | grep -q 'BOOT-INF/classes/static/index.html' || { echo "JAR ohne Seite" >&2; exit 1; }

chmod 0644 "$tmp"
mv "$tmp" "$dir/webseite.jar"
echo "$tag" > "$dir/version"
systemctl restart "$service"
echo "Published $tag"
