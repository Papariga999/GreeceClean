# Developer-Briefing — GreeceClean Partner-/Sponsorenseite

**Stand:** 1. Juni 2026
**Designdateien (Prototyp):** `ui_kits/website/` (React + Babel, im „Aegean Clean"-System)
**Status:** Design-Prototyp abnahmebereit. Dieses Briefing beschreibt, was für die produktive Umsetzung zu tun ist.

---

## 1. Was gebaut wurde

Eine **dreisprachige (EL · EN · DE) Partner-/Sponsorenseite** als Unterseite der bestehenden GreeceClean-Website, plus alle Einstiegspunkte aus der Bürger-App dorthin. Substanz vor Ask (≈80/20), seriöser, partnerschaftlicher Ton, keine erfundenen Logos/Zahlen.

### Seiten / Routen
| Route (Hash) | Datei | Inhalt |
|---|---|---|
| `#partners` | `Partners.jsx` | Die Partnerseite: 9 Sektionen (siehe unten). |
| `#region` | `RegionLayer.jsx` | Regionaler Tourismus-/QR-Landepunkt (co-branded Beispiel für Hotels/Destinationen). |
| `#home`, `#map`, `#tracking`, `#report` | bestehende Dateien | Bürger-App; enthält die Einstiegspunkte zur Partnerseite. |

### Die 9 Sektionen der Partnerseite (`Partners.jsx`)
1. **Hero** — Vision in einem Satz, 2 CTAs (Primär → Formular, Sekundär → „So funktioniert es").
2. **Problem** — 3 faktenbasierte Stat-Cards + Kernzeile + Quellenangabe.
3. **Lösung** — 3-Schritte-Erklärung + Feature-Chips (anonym, ohne Konto, DSGVO, dreisprachig, Bürger & Touristen).
4. **Mission & Vision** — Statement-Band auf blauem Verlauf.
5. **Warum unterstützenswert** — das Kern-Argument der Seite („das Herz"): 6 prägnante Claims (5.1–5.6) als nummeriertes Kartenraster + ehrlicher (leerer) Partner-Logo-Bereich.
6. **Warum Partner werden** — Kartenraster mit 5 Zielgruppen (Stiftungen, Unternehmen/CSR & EPR, Tourismus, Gemeinden, NGOs).
7. **Was wir bieten** — Leistungs-Grid + Unabhängigkeits-/Transparenz-Block.
8. **Kontakt** — Kontaktformular + alternative Kontaktwege + Vertrauenszeile.
9. **Footer** — bestehender Footer, ergänzt um den Link „Partner & Sponsoren".

### Sektion 5 im Detail — die 6 Claims (Text 1:1 übernehmen)

Reihenfolge fix; Register formell. Quelle: `greececlean-partnerseite-copy.md` §5. Im i18n unter dem Key `claims.items` (`{ title, desc }` × 6); Rahmen-Texte: Eyebrow „Warum unterstützenswert" · Heading „Warum GreeceClean unterstützenswert ist" · Sub „Sechs Gründe, kurz und konkret — das Kernargument für eine Unterstützung."

| # | DE | EN | EL |
|---|---|---|---|
| 01 | **Ein echtes, EU-sanktioniertes Problem.** — Nicht theoretisch: Griechenland zahlt Millionen an EU-Strafen wegen Abfall. Das Problem ist messbar und dringend. | **A real problem, sanctioned by the EU.** — Not theoretical: Greece pays millions in EU fines over waste. The problem is measurable and urgent. | **Ένα πραγματικό πρόβλημα, με κυρώσεις από την ΕΕ.** — Δεν είναι θεωρητικό· η Ελλάδα πληρώνει εκατομμύρια σε πρόστιμα της ΕΕ. |
| 02 | **Wir schließen die fehlende Lücke.** — Gemeinden wissen oft nicht, wo der Müll liegt. Wir verbinden die Meldung mit sichtbarer Handlung – das fehlende Stück. | **We close the missing gap.** — Municipalities often don’t know where the waste is. We connect the report to visible action — the missing piece. | **Καλύπτουμε το κομμάτι που λείπει.** — Συνδέουμε την αναφορά με την ορατή δράση. |
| 03 | **Wenig Mittel, große Wirkung.** — Digitale Infrastruktur, die landesweit skaliert – ohne proportionale Kosten. Jeder Euro Unterstützung wird vervielfacht. | **Few resources, big impact.** — Digital infrastructure that scales nationwide without proportional cost. Every euro of support is multiplied. | **Λίγοι πόροι, μεγάλη επίδραση.** — Κάθε ευρώ στήριξης πολλαπλασιάζεται. |
| 04 | **Unabhängig, transparent, datenschutzkonform.** — Offene Ergebnisse, klare Mittelverwendung, anonyme Meldungen, DSGVO-konform. Keine Abhängigkeit von einem einzelnen Interesse. | **Independent, transparent, GDPR-compliant.** — Open results, clear use of funds, anonymous reporting, GDPR-compliant. No dependence on any single interest. | **Ανεξάρτητο, διαφανές, συμβατό με GDPR.** — Καμία εξάρτηση από ένα μόνο συμφέρον. |
| 05 | **Daten mit öffentlichem Wert.** — Aggregierte, anonymisierte Müll-Daten – nützlich für Politik, Forschung und Recycling-/EPR-Ziele. | **Data with public value.** — Aggregated, anonymised waste data — useful for policy, research, and recycling/EPR goals. | **Δεδομένα με δημόσια αξία.** — Χρήσιμα για πολιτική, έρευνα και στόχους ανακύκλωσης/EPR. |
| 06 | **Der richtige Moment.** — EU-Druck, Recyclingziele und Tourismussaison fallen jetzt zusammen. Unterstützung heute hat die größte Wirkung. | **The right moment.** — EU pressure, recycling targets and the tourist season converge now. Support today has the greatest impact. | **Η σωστή στιγμή.** — Η στήριξη σήμερα έχει τον μεγαλύτερο αντίκτυπο. |

**Claim-Card (Muster, `Partners.jsx` §5):** `window.Card` (weiß, `rounded-2xl`, Hairline-Border, `shadow-sm`) → Kopfzeile mit nummeriertem Badge `01`–`06` (46×46, `radius 14`, BG `#EAF2FC`, Text `#0D6FDB`, **Mono**, weight 800) + Titel (`h3`, 18px, bold, `#0D6FDB`) → Stützzeile (14.5px, `#4B5563`). Hover-Lift identisch zu §6. Sektionsfläche **Sea Mist `#F2F7FB`** (Rhythmus §4 Blau → §5 Sea Mist → §6 Weiß). Darunter der **leere Partner-Logo-Bereich** (i18n `claims.partnersLabel` / `claims.partnersNote`) — erst mit echten Logos befüllen.

> Diese Sektion ersetzt die frühere Traction-/„Wirkung & Fortschritt"-Sektion (leere Kennzahlen, Vorher/Nachher). Beim Überführen ins App-i18n die alten `traction.*`-Keys **nicht** übernehmen.

---

## 2. Einstiegspunkte zur Partnerseite (bewusst gesetzt)

> **Header-Nav: ENTFERNT** (auf Wunsch). Die Bürger-App bleibt fokussiert; B2B-Ansprache erscheint nur an den folgenden, kontextstarken Stellen.

| # | Ort | Sichtbar auf | Komponente |
|---|---|---|---|
| 1 | **Footer-Link „Partner & Sponsoren"** | jeder Seite | `SiteFooter` in `components.jsx` |
| 2 | **Impact-CTA-Band** („Dieses Dashboard wird durch unsere Partner möglich…") | Startseite, unter dem Leaderboard | `Landing.jsx` |
| 3 | **Pre-Footer-Band** („Möchten Sie ein saubereres Griechenland unterstützen?") | Karte, Tracking | `SupportBanner` in `components.jsx` |
| 4 | **Erfolgsbildschirm nach Meldung** (dezenter Hinweis, klar von der Bürger-Aktion getrennt) | nach Absenden einer Meldung | `ReportFlow.jsx` |
| 5 | **Tourismus-Kachel → Region-Layer** + Partner-Nudge im Region-Layer | Partnerseite / `#region` | `Partners.jsx`, `RegionLayer.jsx` |

**Regel: pro Seite genau ein Partner-CTA** — kein doppeltes B2B-Rauschen.

---

## 3. Kontaktformular — Umsetzung erforderlich

**Datei:** `PartnerForm.jsx`. Design liefert Felder + alle Zustände; die Backend-Anbindung ist zu bauen.

### Felder
| Feld | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Name | text | ✅ | |
| Organisation | text | ✅ | |
| Rolle / Funktion | text | – | optional |
| E-Mail | email | ✅ | Format validiert |
| Art des Interesses | select | ✅ | 6 Optionen (Stiftung/Förderung, Unternehmen/CSR, Tourismus, Gemeinde/öffentlich, NGO/Partner, Sonstiges) |
| Region / Ort | text | – | optional |
| Nachricht | textarea | ✅ | max. 1000 Zeichen |
| Einwilligung (DSGVO) | checkbox | ✅ | mit Link zur Datenschutzseite |
| `company` (Honeypot) | hidden | – | unsichtbar; bei Befüllung Submit verwerfen/„still erfolgreich" |

### Verhalten / Zustände (alle im Prototyp vorhanden)
- **Inline-Validierung** beim Submit; Fehlertexte je Feld, lokalisiert.
- **Loading:** Button-Spinner + `disabled`, Felder gesperrt.
- **Success:** ruhiger Bestätigungsblock + „Zurück zur Karte" / „Projekt entdecken".
- **Error:** freundlicher Text + Retry + direkte E-Mail (`partners@greececlean.gr`), nie technische Fehlermeldungen.
- ⚠️ **Nur für die Abnahme:** der kleine „Status-Vorschau"-Umschalter (Normal/Erfolg/Fehler) oben im Formular (`DemoSwitch`) **vor Produktivgang entfernen**.

### Backend
- Versand über die **bestehende Resend-/E-Mail-Pipeline** an ein internes Postfach (z. B. `partners@greececlean.gr`).
- Honeypot serverseitig zusätzlich prüfen; Rate-Limiting sinnvoll.
- **Kein** Speichern in der Bürger-/Melder-Datenbank — strikt getrennt (B2B-Kontakt ≠ Melder-Tracking).
- Einwilligung mit Zeitstempel protokollieren (DSGVO-Nachweis).

---

## 4. Platzhalter → echte Inhalte ersetzen

Alle Bilder sind beschriftete, gestreifte Platzhalter (`PHolder` in `Partners.jsx`). Vor Go-Live einsetzen:
- **Hero-Bild** (Küste/Natur, ruhig — kein Schock-Müllbild).
- **Partner-Logos** (in §5): erst einsetzen, wenn real — der Bereich bleibt sonst leer mit Hinweistext (so beauftragt).
- *(Vorher/Nachher-Paare entfallen — die frühere Wirkungs-Sektion wurde durch §5 „Warum unterstützenswert" ersetzt.)*
- **Region-Layer:** echtes Destinationsbild, **echter QR-Code** (aktuell dekorativer Platzhalter, kein scanbarer Code!), realer Sponsor-Logo-Slot.

## 5. Zahlen / Daten
- **Problem-Stats** (EU-Strafe Zakynthos, 5,5 Mio. € + 12.500 €/Tag; Recycling 17 % vs. 49 %; 80.000 €/Tag) vor Veröffentlichung gegen die Originalquellen (EU-Kommission/EuGH; EEA) gegenprüfen.

---

## 6. Mehrsprachigkeit (EL · EN · DE)
- Alle Texte zentral in **`partners-i18n.jsx`** → `window.PARTNERS_I18N[lang]` (Schlüssel: `EL`, `EN`, `DE`).
- Sprachstatus liegt in `App.jsx` (`lang`), wird über den EL/EN/DE-Umschalter im Header gesetzt und an `Landing`, `Partners`, `RegionLayer`, `SiteFooter`, `SupportBanner`, `ReportFlow` durchgereicht.
- Für die produktive Seite: in das bestehende i18n-System der App überführen (Keys sind bereits sauber strukturiert und können 1:1 übernommen werden).
- **Register:** formell (DE „Sie", EL πληθυντικός ευγενείας). Beim Übernehmen beibehalten.

---

## 7. Design-System / Tokens
- **Aegean Blue** `#0D6FDB` (Primär), dunkleres Blau `#0B57AD` / `#0B3F7E`, **Eco Green** `#39B24A` (Hover `#2E8C3B`), Sea Mist `#F2F7FB`, Off-White `#F9FAFB`.
- **Radius:** Cards `rounded-2xl` (24px), Buttons/Inputs 16px.
- **Schrift:** Inter.
- **Card-Primitive:** `window.Card` (`components.jsx`) — wiederverwenden.
- Tokens vollständig in `colors_and_type.css` (Projekt-Root).

### Neue, wiederverwendbare Komponenten (als Specs)
| Komponente | Datei | Zweck |
|---|---|---|
| `PHolder` | `Partners.jsx` | beschrifteter Bild-Platzhalter |
| `SectionHead` | `Partners.jsx` | Eyebrow + Heading + Sub, hell/dunkel |
| Stat-Card | `Partners.jsx` (Sektion 2) | große Zahl + Sublabel + Beschreibung |
| Claim-Card | `Partners.jsx` (Sektion 5) | Mono-Nummer-Badge + Titel + Stützzeile (Hover-Lift) |
| Zielgruppen-Kachel | `Partners.jsx` (Sektion 6) | Icon + Titel + Bullets + leiser CTA |
| Mission-Statement-Block | `Partners.jsx` (Sektion 4) | Label + großes Statement auf Blau |
| `SupportBanner` | `components.jsx` | Pre-Footer-CTA-Band |
| `PartnerForm` + Zustände | `PartnerForm.jsx` | s. o. |
| `RegionLayer` | `RegionLayer.jsx` | regionaler/QR-Landepunkt |

---

## 8. Routing-Hinweis
Der Prototyp nutzt **Hash-Routing** (`#partners`, `#region`) in `App.jsx`. Für die Produktion auf echte Pfade mappen, z. B.:
- `#partners` → `/partners` (EN) bzw. `/sponsoren` (DE) / `/συνεργατες` (EL)
- `#region` → z. B. `/r/<destination-slug>` (die QR-Codes der Hotels zeigen auf je eine solche URL)

---

## 9. Explizit NICHT umzusetzen
- Kein Hard-Selling, keine reine Werbeseite.
- Keine erfundenen Logos/Testimonials/Zahlen.
- Sponsoren erhalten **keine** inhaltliche/redaktionelle Kontrolle (ist Teil des Wertversprechens — sichtbar im Transparenz-Block).
- Keine Vermischung von B2B-Kontaktdaten mit Bürger-/Melder-Daten.
- Kein Bezahl-/Spenden-Checkout (außerhalb des Scopes).

---

## 10. Abnahme-Checkliste (vor Go-Live)
- [ ] `DemoSwitch` aus `PartnerForm.jsx` entfernt.
- [ ] Formular an Resend-Pipeline angebunden; Honeypot serverseitig; Einwilligung protokolliert.
- [ ] Echtes Hero-Bild, **scanbarer** QR-Code, Sponsor-Slot.
- [ ] §5 „Warum unterstützenswert": genau 6 Claims in fester Reihenfolge, Text 1:1 (EL/EN/DE); Claim-Card-Muster (Mono-Nummer-Badge, blauer Titel, Hover-Lift); Partner-Logo-Bereich leer + Hinweistext; alte `traction.*`-Keys nicht übernommen.
- [ ] Problem-Statistiken quellengeprüft.
- [ ] i18n in App-System überführt; alle 3 Sprachen vollständig & korrekt.
- [ ] Hash-Routen auf echte, lokalisierte Pfade gemappt.
- [ ] Datenschutz-/Impressum-Links im Formular & Footer zeigen auf echte Seiten.
