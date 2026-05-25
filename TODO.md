# Sinsig-Tool – Offene Aufgaben

## 🔧 In Arbeit / Geplant

- [ ] **Fahrzeug-Reminder-Logik vereinfachen**
  Die aktuelle Zwei-Fenster-Logik (`hatKfzInFenster(0,14)` / `hatKfzInFenster(15,28)`) ist schwer verständlich und der angezeigte Text ("Kein Fahrzeug-Post für die Woche ab Tag 15 geplant") war für Nutzer nicht nachvollziehbar. Logik überarbeiten: klares 14-Tage-Intervall, verständlicher Hinweistext.

- [ ] **Supabase Cloud-Sync**
  Damit mehrere Personen / Geräte denselben Verlauf sehen. Aktuell alles in `localStorage` (sinsig_verlauf, sinsig_geplant, sinsig_session).

- [ ] **Instagram Graph API Integration**
  Direkt aus dem Tool heraus posten oder planen.

## ✅ Erledigt (Referenz)

- Fahrzeug-Warnung in Service Posts, Feiertage & Fahrzeug-Tab
- Alle Insights-Panels einklappbar (Turbopack JSX-Fix)
- Insights-Text familiärer + Kontakthinweis (Till Schellenberger)
- Warnbanner im Redaktionsplan bei Feiertags-Konflikten
- Ersteller in Verlauf & Redaktionsplan
