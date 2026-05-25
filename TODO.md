# Sinsig-Tool – Offene Aufgaben & Roadmap

## ⏳ Offen / Geplant

- [ ] **Fahrzeug-Reminder-Logik vereinfachen**
  Ziel: alle 2 Wochen soll ein Fahrzeug-Post erscheinen. Da es nur eine Person aktiv macht, soll sie rechtzeitig erinnert werden — auch wenn sie z.B. 3 Wochen im Urlaub ist und Posts im Voraus planen muss.
  Die Zwei-Fenster-Logik (`hatKfzInFenster(0,14)` / `hatKfzInFenster(15,28)`) ist inhaltlich korrekt, aber intern schwer lesbar. Texte wurden bereits vereinfacht. Ggf. Code-Struktur klarer schreiben ohne das Verhalten zu ändern.

- [ ] **Mobile Version (v0.5)**
  Aktuell nur für Desktop optimiert. Umbau auf responsive Layout:
  - Sidebar → Bottom-Navigation auf Mobile
  - Haupt-Layout von `flex-row` auf `flex-col` für kleine Screens
  - Grids anpassen (`grid-cols-4` → `grid-cols-2 md:grid-cols-4` etc., ~30–40 Stellen)
  - Canvas-Rendering (Feiertage, 1080×1080px) auf kleinen Screens prüfen
  - Alles über Tailwind-Breakpoints (`sm:`, `md:`), kein eigenes CSS nötig

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
