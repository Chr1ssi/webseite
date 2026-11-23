# Webseite

Persönliche Webseite / Online-Lebenslauf.

## Aufbau

```
backend/                       Kotlin + Spring Boot (Paket com.christophkeil.webseite)
  WebseiteApplication.kt       Einstieg
  profile/                     GET /api/profile – liefert resources/profile.json aus
  contact/                     POST /api/contact – Anfrage prüfen (ContactController),
                               Mail verschicken (ContactMailer)
  resources/profile.json       alle Inhalte der Seite
frontend/src/app/              Angular
  app.*                        Seitenrahmen: lädt das Profil, ordnet die Abschnitte an
  profile.ts                   Typen zu profile.json
  sections/<abschnitt>/        je ein Abschnitt der Seite mit eigenem Stil und Druck-Layout:
                               hero, about, projects, timeline (Erfahrung + Ausbildung),
                               skills, contact (Abschnitt + Formular)
frontend/src/styles.css        Farben und gemeinsame Stile (Überschriften, Chips, Druck)
deploy/update-webseite.sh      holt das neueste Release auf den Server
.github/workflows/release.yml  baut webseite.jar (Seite + API) und veröffentlicht es
```

Im Build landet der Angular-Build unter `static/` im JAR; ein Prozess liefert Seite und API aus.
Der Dev-Proxy des Frontends leitet `/api` an `localhost:8080` weiter.

## Entwicklung

```bash
cd backend && ./gradlew bootRun
cd frontend && npm start   # http://localhost:4200
```

Inhalte pflegen: `backend/src/main/resources/profile.json` bearbeiten.

## Kontaktformular

`POST /api/contact` verschickt eine Mail per SMTP. Konfiguration über Umgebungsvariablen:

| Variable | Bedeutung |
|---|---|
| `MAIL_HOST`, `MAIL_PORT` | SMTP-Server (Standard-Port 587, STARTTLS) |
| `MAIL_USERNAME`, `MAIL_PASSWORD` | SMTP-Zugang |
| `CONTACT_RECIPIENT` | Adresse, an die Anfragen gehen |
| `CONTACT_SENDER` | Absender (Standard: `MAIL_USERNAME`) |

Ohne diese Variablen startet das Backend trotzdem, das Senden antwortet dann mit 502.
