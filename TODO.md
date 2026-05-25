# Sinsig-Tool – Offene Aufgaben & Roadmap

## ⏳ Offen / Geplant

- [ ] **Fahrzeug-Reminder-Logik vereinfachen**
  Die aktuelle Zwei-Fenster-Logik (`hatKfzInFenster(0,14)` / `hatKfzInFenster(15,28)`) ist schwer verständlich und der angezeigte Text war für Nutzer nicht nachvollziehbar. Logik überarbeiten: klares 14-Tage-Intervall, verständlicher Hinweistext.

- [ ] **Supabase — Cloud-Speicherung & Multi-Device**
  Aktuell läuft alles über `localStorage` (`sinsig_verlauf`, `sinsig_geplant`, `sinsig_session`) — Daten sind nur auf dem jeweiligen Gerät verfügbar. Supabase (kostenlose Postgres-DB + REST-API) einbinden, damit mehrere Mitarbeiter gleichzeitig planen können und Daten nicht beim Cache-Leeren verloren gehen.

- [ ] **Instagram Graph API — automatisches Posten**
  Direkt aus dem Tool heraus posten oder planen, ohne manuellen Export.

## ✅ Erledigt

- Feiertags-Canvas mit Mercedes-Logo
- Posting-Empfehlung mit saisonaler Rotation
- Monatsplan mit Verpasst-Erkennung
- Post-Planung mit Terminvorschlägen
- Fahrzeug-Erinnerung in Empfehlungslogik integriert
- Fahrzeug-Warnung in Service Posts, Feiertage & Fahrzeug-Tab sichtbar
- Alle Insights-Panels einklappbar (Turbopack JSX-Fix)
- Insights-Text familiärer + Kontakthinweis (Till Schellenberger)
- Warnbanner im Redaktionsplan bei Feiertags-Konflikten
- Ersteller wird in Verlauf & Redaktionsplan angezeigt
