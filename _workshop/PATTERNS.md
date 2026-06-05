# MusikraumUI Patterns

Diese Muster gelten als Basis fuer neue Seiten und weitere Iterationen.

## Mobile Navigation
- Oben bleibt eine volle Headerleiste mit Marke links und Hamburger rechts.
- Der Hamburger oeffnet ein eigenes `mobile-menu` Panel unter dem Header.
- Die Bottom-Nav ist davon unabhaengig und dient nur der schnellen Orientierung.
- Tippen auf die Flaeche neben dem offenen Mobile-Menue schliesst sofort.
- Das geschlossene Mobile-Menue nutzt `hidden` und `aria-hidden="true"`; beim Oeffnen wird `aria-hidden` auf `false` gesetzt.
- Menue, Hamburger und Bottom-Nav bewegen sich weich und respektieren `prefers-reduced-motion`.

## Footer Als Breadcrumb
- Die Bottom-Nav blendet sanft aus, bevor der Footer die Navigation uebernimmt.
- Im Footer bekommt die aktuelle Seite `aria-current="page"`.
- Der aktuelle Footer-Link ist heller weiss, fett und unterstrichen.

## Auftritte Hintergrund
- Die Auftritte-Seite nutzt ein einziges festes Hintergrundsystem mit zwei Bildausschnitten.
- Die Auftritte-Bilder werden als eigene warme `*-wood.webp` Ausschnitte vorbereitet, statt nur per Sonderoverlay angepasst zu werden.
- Der Wechsel auf den unteren Bildausschnitt ist ein harter Schnitt ohne Fade.
- Der Schnitt passiert erst, wenn die opake Zwischen-Sektion (`#auftritte-verbinden`) den Viewport voll deckt.
- Der untere CTA hat keinen eigenen Foto-Layer; er nutzt nur Overlay und Text ueber dem festen Seitenhintergrund.
- Am Footer wird der feste Bildhintergrund erst ausgeblendet, wenn der Footer den oberen Viewportrand erreicht.

## Lebendige Bewegung
- Hero-Hintergruende: alle Hero-artigen Bereiche nutzen exakt dieselbe Overlay-Variable (`--hero-overlay`). Unterschiede gehoeren ins bearbeitete Bildasset, nicht in seitenweise andere Overlay-Werte.
- Hero: feine Resonanzlinie, ruhig pulsierend.
- Scroll-Reveal: Abschnitte erscheinen weich und einmalig.
- Cards: kein wandernder Wellen-Effekt. Jede Section definiert eine ruhige virtuelle Lichtquelle (`--card-light-x`, `--card-light-y`, `--card-light-angle`); alle Cards zeigen einen leichten Grundreflex und spiegeln beim Hover deutlich, aber ruhig, zu diesem Punkt.
- CTA: einmaliger warmer Atemimpuls beim Erscheinen.
- Eyebrows und Listenpunkte: kurzes, dezentes Aufleuchten.
- Zitat: feine Linie als lebendiger Moment.

## Motion Sicherheit
- Alle dekorativen Bewegungen muessen unter `prefers-reduced-motion: reduce` still oder deutlich reduziert sein.
- Keine dauernden, nervoesen Bewegungen in Inhaltsbereichen.
- Animationen sollen wie Klang wirken: langsam, organisch, leise.
- Resonance-Linie pulst nur über `opacity` (kein animierter `filter:blur` — Performance), Stand 2026-06-03.

---

# Komponenten-Katalog

Konkrete, wiederverwendbare Bausteine in `assets/klang.css`. Regel: jede Komponente
**einmal** definiert, hier dokumentiert, per Klasse wiederverwendet. Nach CSS-Änderung
`?v=N` bumpen; nach HTML-Edits `node _workshop/scripts/validate-html.js`.

## Tokens (`:root`)
- **Spacing 4/8:** `--s-1`…`--s-10` (4·8·12·16·24·32·48·64·96·128). Alle Abstände daraus.
- **Layout:** `--section-py`, `--golden` (1.618), `--header-h`, `--reading-measure` (~64ch), `--radius`.
- **Farben:** Grundgerüst `--paper/-soft`, `--surface`, `--cream`, `--ink`, `--muted`, `--border`; Buttons `--forest/-dark`; Akzente `--accent/-dark`, `--clay`, `--gold`; Sektions-Akzente `--klangreise/--trommelkreis/--obertoene/--auftritte`.
- **Effekte:** `--grain`, `--shadow/-strong`. **Schrift:** `--font-display` (Serif), `--font-body`.

## Layout
- **`.container`** — zentrierte Inhaltsbreite.
- **`.grid` `.grid--2` `.grid--3`** — einfache Kartenreihen.
- **`.grid-12` + `.col-1…12`** — 12-Spalten-Raster (≤768px volle Breite).
- **`.split-golden` / `--reverse`** — Links/Rechts im Goldenen Schnitt.
- **`.page-grid` + `.aside`** — Inhalt + sticky Sidebar (Offset = `--header-h`).
- **`.section` / `--soft`**, **`.section-head` / `--center`**, Abstände `.section-offset` / `.section-spacer`.

## (Sub)Hero (fixe Bildebene)
- **`.hero`** (`__grid/__inner/__title/__title-word/__lead/__actions/__notes`) + **`.hero__resonance`** (Deko-Pulslinie).
- **`.subhero`** (`__content`) + Bild-Modifier `--klangreise/--trommelkreis/--obertoene/--auftritte`.
- Bild via `::before` (z-index:-2), Overlay via `::after` (z-index:-1), **identisch über alle Seiten**; mobil/reduced-motion → `position:absolute`.

## Sektions-Bausteine
- **`.sound-band`** (`__media`) — dunkle Zitat-Band (Golden-Split).
- **`.cta`** — farbige Abschluss-CTA. **`.stage-cta`** (`__content`) — CTA über festem Seiten-BG (kein eigener Foto-Layer; nur Overlay `::after` + Text).
- **`.welcome`** (`__text/__quote/__image(--cutout)/__caption`) + **`.moment-list`** (Gold-Punkte).

## Cards
- **`.card`** · **`.card--link`** (klickbar, Hover-Lift) · **`.card--compact`** (weniger Padding).
- Teile: `.card__image` (Foto via `<picture>`), `.card__meta`, `.card__tags`, `.card__more`.

## Inhalts-Patterns
- **`.eyebrow`** (Mikro-Überzeile), **`.lead`**, **`.quote`** (`__credit`, `--moment`).
- **`.flow` + `.step` (`__num`)** (Ablauf 01/02/03), **`.overtone-note`** (Hinweis-Box).
- **`.facts`** (`<dl>`/`<dt>`/`<dd>` — Praktisches/Anfragen-Box), **`.faq` + `.faq__item`** (`<details>` — + `FAQPage`-JSON-LD pflegen), **`.list`** (Gold-Punkte).
- **`.btn` (`--primary` / `--ghost`)** — auf dunklen Sektionen Primary invertiert.

## Effekte & Verhalten
- **Grain:** `body::after` mit `var(--grain)`, normale Ebene, niedrige Deckkraft (kein `mix-blend-mode` — scroll-performant).
- **Bild-Grading:** Regel in `_workshop/BILD-GRADING.md`.
- **JS-Behaviors** sind in **`assets/site.js`** gebündelt: header-scroll + Mobile-Menü, Reveal-on-Scroll, Stage-BG, Jahr. **Self-activating** (jede IIFE läuft nur, wenn ihre Elemente existieren) → ein File für alle Seiten, eingebunden via `<script defer src="/assets/site.js?v=N">`. **Keine Inline-Duplikate mehr.** (Redirect-Stubs laden es nicht.) Nach JS-Änderung `?v=N` bumpen.
