# Webseite

Persönliche Webseite / Online-Lebenslauf.

- `backend/` – Kotlin + Spring Boot, liefert `GET /api/profile` aus `backend/src/main/resources/profile.json`
- `frontend/` – Angular, zeigt das Profil an (Dev-Proxy `/api` → `localhost:8080`)

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
