# Claude Design — GreeceClean Sponsoren-/Partnerseite (Unterseite)

---

## Projektkontext

GreeceClean ist eine dreisprachige (Griechisch / Englisch / Deutsch) Civic-Web-App, mit der Bürger und Touristen **illegale Müllkippen und Umweltverstöße in Griechenland melden** — in unter 60 Sekunden, ohne Login. Eine Meldung wird der zuständigen Gemeinde zugestellt, erscheint auf einer öffentlichen Karte und fließt in ein Gemeinde-Leaderboard, das kommunale Reaktionsfähigkeit sichtbar macht.

**Bestehende Designrichtung „Aegean Clean":** Primärfarbe Ägäis-Blau `#005BAE`, grüner Action-/Erfolgs-Ton, Orange/Rot-Severity-Skala, runde Cards (`rounded-2xl`), mobile-first, ruhig und vertrauenswürdig. Diese Unterseite nutzt **dasselbe Design-System**, in einem **ruhigeren, seriöseren, partner-zugewandten Register**.

*(Falls ein Prototype-/Design-Link existiert, hier einfügen.)*

**Fertiger Text:** Die komplette Copy (EL/EN/DE) liegt in `greececlean-partnerseite-copy.md` vor und ist **1:1 zu übernehmen** — keine Platzhalter erfinden. Die Sektionsnummern unten entsprechen den Abschnitten dort.

---

## Zweck dieser Seite (eng gefasst)

Eine **Sponsoren- & Partnerseite** als Unterseite (`/partners` bzw. `/sponsoren`). Ihr **einziger Zweck ist es, Sponsoren und Partner zu gewinnen**. Sie:
1. erklärt **den Mehrwert der App** (Problem, Lösung, Wirkung),
2. liefert **das Argument, warum das Projekt unterstützenswert ist**,
3. zeigt **konkreten Nutzen je Partnertyp**, und
4. führt über ein **Kontaktformular** zur Kontaktaufnahme.

Tonbalance: **Substanz und Argumentation vor Ask.** Wer geht, soll verstanden haben, warum sich Unterstützung lohnt.

---

## Ausdrücklich NICHT auf dieser Seite (wichtig)

- **Kein Team / keine Personen / keine „Über uns / Gründer"-Sektion.** Keine Fotos, Namen oder Rollen von Beteiligten.
- **Keine Mitarbeiter-, Job- oder Freiwilligen-Anwerbung.** Keine „Mach mit / Werde Teil des Teams / Wir suchen"-Elemente. Die Seite richtet sich ausschließlich an **Organisationen** (Geldgeber/Partner), nicht an Einzelpersonen, die mitarbeiten wollen.
- **Keine reine Werbe-/PR-Optik**, kein Hard-Selling.
- **Keine erfundenen Logos, Testimonials oder Zahlen.** Existieren noch keine Partner/Daten, ehrlich als Vision/Ziele rahmen (Partner-Logo-Bereich nur vorbereiten, leer lassen).
- **Sponsoren keine inhaltliche Kontrolle** suggerieren — Unabhängigkeit ist Teil des Wertversprechens.
- **Keine Vermischung mit Bürger-Daten** — das Kontaktformular ist B2B (Organisationen), kein Tracking von Meldern.
- Kein Bezahl-/Spenden-Checkout (außerhalb des Scopes).

---

## Zielgruppen (bestimmen Sektion 6)

1. **Stiftungen / Förderer** · 2. **Unternehmen / CSR & EPR** · 3. **Tourismus** · 4. **Gemeinden / öffentliche Stellen** · 5. **NGOs / Partner**.
Alle sind **Organisationen als Geldgeber/Partner** — keine individuellen Bewerber.

---

## Tone

- **Glaubwürdig & datenbasiert** — Zahlen statt Pathos.
- **Inspirierend, aber nüchtern** — Vision ja, Marktschreierei nein.
- **Partnerschaftlich auf Augenhöhe** — „gemeinsam Wirkung erzielen".
- **Transparent & unabhängig** — Mittelverwendung und Unabhängigkeit sichtbar machen.

---

## Seitenstruktur (Sektionen — Text aus dem Copy-Deck)

### 1. Hero (Copy §1)
Vision-Headline + Subline + Primär-CTA „Partner werden" (scrollt zum Formular) + Sekundär-CTA „So funktioniert es". Ruhiges, hochwertiges Küsten-/Naturbild; kein Schock-Müllbild im Hero.

### 2. Das Problem (Copy §2)
Drei Stat-Cards (große Zahl, kleines Label) + Kernzeile + kleine Quellenzeile. Severity-/Akzentfarben sparsam.

### 3. So funktioniert es (Copy §3)
3-Schritte-Visualisierung (📷 → 📍 → 🗺️), je Titel + eine Zeile. Macht den App-Mehrwert in Sekunden klar.

### 4. Mission & Vision (Copy §4)
Zwei ruhige Statement-Blöcke (Zitat-Optik).

### 5. Warum unterstützenswert (Copy §5) — **Herz der Seite**
6 prägnante Claims (5.1–5.6) als Karten oder klare Liste. Das ist die eigentliche Argumentation; visuell stark, gut scanbar.

### 6. Warum Partner werden — Nutzen je Zielgruppe (Copy §6)
**Karten- oder Tab-Modul mit 5 Kacheln** (Stiftungen / Unternehmen & EPR / Tourismus / Gemeinden / NGOs), je 3 Nutzenpunkte. Jede Kachel endet mit leisem CTA „Sprich mit uns" (→ Formular).

### 7. Was Unterstützer erhalten + Transparenz (Copy §7)
Kurze Leistungsliste **plus** sichtbarer Unabhängigkeits-/Transparenz-Hinweis (keine inhaltliche Kontrolle für Sponsoren, Datenschutz, Mittelverwendung).

### 8. Kontakt / CTA (Copy §8) — **Hauptkonversion**
Überschrift + Subline + Kontaktformular (Spezifikation unten) + Vertrauenszeile + Alternativen (Kontakt-E-Mail, ggf. LinkedIn).

### 9. Footer
In bestehende Footer-Struktur integrieren; Links zu Datenschutz/Impressum/Terms (existieren bereits).

---

## Kontaktformular — Spezifikation

> **Hinweis (kein Widerspruch zum No-Login-Prinzip):** B2B-Kontaktformular für **Organisationen**, die uns erreichen wollen — kein Sammeln von Bürger-/Melder-Daten.

**Felder:**
- Name der Kontaktperson (Pflicht)
- Organisation (Pflicht)
- Rolle / Funktion (optional)
- E-Mail (Pflicht, validiert)
- **Art des Interesses** (Dropdown, Pflicht): Stiftung/Förderung · Unternehmen/CSR · Tourismus · Gemeinde/öffentlich · NGO/Partner · Sonstiges
- Region/Ort von Interesse (optional)
- Nachricht (Pflicht, mehrzeilig)
- **Einwilligungs-Checkbox** (DSGVO, Link zur Datenschutzseite)
- **Honeypot-Feld** (unsichtbar, Spamschutz — konsistent mit der App)

**Verhalten:** Inline-Validierung; Submit mit Lade-/Disabled-State; klarer **Erfolgs-State**; freundlicher **Error-State** mit Retry; nie technische Fehlertexte.
*(Technisch: Versand kann über die bestehende Resend-/E-Mail-Pipeline der App an ein internes Postfach laufen — designseitig nur Form + States nötig.)*

---

## Empty / Error / Loading / Success
- **Traction/Zahlen ohne Daten:** ziel-/visionsbasiert statt leerer Zahlen.
- **Formular-Loading:** Button-Spinner, Felder gesperrt.
- **Formular-Success:** ruhiger Bestätigungs-Block + „Projekt entdecken"/„zur Karte".
- **Formular-Error:** „Etwas ist schiefgelaufen — bitte erneut versuchen oder schreiben Sie an [E-Mail]."

---

## Micro-Interactions
- Stat-Zahlen zählen beim Scrollen sanft hoch.
- Zielgruppen-Kacheln mit dezentem Hover/Expand.
- Smooth-Scroll von Hero-CTA und Kachel-CTAs zum Formular.

---

## Sprachhinweise
- Vollständig **EL / EN / DE** (Sprachumschalter der App). Für Sponsoren sind **EN und EL** am wichtigsten, DE für deutschsprachige Reiseveranstalter/Hotels.
- Register **formell** (DE „Sie", EL πληθυντικός) — exakt wie im Copy-Deck.
- Ton in allen Sprachen seriös, partnerschaftlich, faktenbasiert.

---

## Output-Erwartung
Erstelle:
1. Die **vollständige Sponsoren-/Partnerseite**, responsiv (Mobile 375px **und** Desktop), im Aegean-Clean-System, mit allen Sektionen (Reihenfolge 1–9), Text 1:1 aus `greececlean-partnerseite-copy.md`.
2. Das **Kontaktformular** inkl. Normal-, Loading-, Success- und Error-State.
3. Die **„Warum unterstützenswert"-Sektion (§5)** und die **5 Nutzen-Kacheln (§6)** als visuell starke, wiederverwendbare Module.
4. Neue Komponenten (Stat-Card, Claim-Card, Zielgruppen-Kachel, Mission-Statement-Block) als Specs im bestehenden Design-System.

Beginne mit **Hero (§1) + „Warum unterstützenswert" (§5) + Kontaktformular (§8)** — das ist der Argumentations- und Konversionskern der Seite.
