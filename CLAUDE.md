# CLAUDE.md — Musikraum

Projekt-Kontext für AI-Sessions. Kurz, dafür Pflicht-Lektüre.

Stand: 2026-06-02.

---

## Was diese Site ist

Statische HTML-Site f?r **Musikraum** - Musik aus der Stille, Klangbehandlungen, Obert?ne und gemeinsames Spielen ohne Noten mit mir.

Deployment: **Cloudflare Pages** (statisches Direct-Upload, kein Build-Step, kein
React/TS). Edits gehen direkt auf live HTML/CSS/JS.

- Geplante Produktions-URL: `https://Musikraum.ch/`
- Cookie-frei, kein Tracking, keine externen Einbindungen (Maps/Analytics/Fonts).
- Kontaktaufnahme läuft per `mailto:info@Musikraum.ch` — **es gibt kein
  Formular-Backend mehr** (die alten Pages Functions `/api/contact` und
  `/api/reviews` wurden am 2026-06-02 entfernt).

### Seiten (Stand 2026-06-04)

**Voller Fokus auf den Seminar.** Die ganze Site dreht sich nur um Franz' Seminar (in der
Gruppe gemeinsam frei spielen & lernen, Musikraum, viele Instrumente). Klangbehandlung
und Auftritte sind **vorerst versteckt** (`noindex`, nicht in Nav/Footer/Sitemap/Startseite,
nur per direkter URL erreichbar — wie Obertöne). Dateien bleiben für späteres Wieder-
Einblenden bestehen.

**Konzept „ohne Noten":** meint *nicht* planloses Spielen. Das **Stück ist nicht
vorgegeben** (keine aufgeschriebenen Noten), aber es wird so zusammen gespielt, dass es
**klanglich zusammenpasst** (zuhören, sich einstimmen). Texte immer als *frei ≠ beliebig*
formulieren — nie als „Hauptsache irgendwie Krach machen".

- `index.html` — Startseite (lädt `klang.css`; komplett Seminar-fokussiert)
- `Seminar/index.html` — **Seminar · einziges sichtbares Angebot.** Konzept-Texte stehen, aber
  Inhalte/Ablauf/Dauer/Preis/Gruppengröße/Termine/Adresse sind noch **Platzhalter `[ ]`**
  (Franz liefert nach — wie die Impressum-Platzhalter **vor Go-Live füllen**).
- `angebote/klangbehandlung/index.html` — versteckt (`noindex`)
- `auftritte/index.html` — versteckt (`noindex`)
- `obertoene/index.html` — versteckt (`noindex`, nur per URL)
- `404.html`
- `impressum.html` + `datenschutz.html` (beide `noindex`)

Indexierbar / in `sitemap.xml`: Startseite + Seminar.
Alle Seiten laden das gemeinsame Stylesheet `assets/klang.css`.
Nav-Reihenfolge (überall identisch): Start · Seminar · Kontakt.

### Alte URLs / Redirects

Die frühere Zahnarzt-Site (Zahnärztehaus Arch) lebte unter `/behandlungen/*` und
`/praxis/`. Diese Pfade werden via `_redirects` per **301** thematisch auf die neuen
Seiten umgeleitet. Die statischen Stub-Dateien wurden entfernt, damit `_redirects`
greift (Cloudflare Pages bevorzugt statische Files vor `_redirects`).

Die frühere `/angebote/zusammen-spielen/` ist **im Seminar aufgegangen** und wird per **301**
auf `/Seminar/` umgeleitet (Datei entfernt, Backup in `_workshop/_archive/`; `trommelkreis`-
Stub zeigt ebenfalls auf `/Seminar/`).

---

## Pflicht-Step nach JEDER HTML-Bearbeitung

```
node _workshop/scripts/validate-html.js
```

Muss `✓ Alle N Seiten OK.` zurückgeben, bevor die Session als „erledigt" gilt.

**Warum:** Früher war eine Produktions-HTML mid-statement abgeschnitten — der inline
`<script>`-Block lief nicht mehr, ohne dass Lighthouse oder visuelles Review das
aufgriff. Das Script prüft pro Seite: endet mit `</html>`, Tag-Balance
(`html`/`head`/`body`/`main`), parst jeden inline-`<script>` mit `vm.Script` und jeden
`application/ld+json`-Block mit `JSON.parse`. Exit 0 = OK, 1 = Fehler.

Bei **Direct Upload** (aktueller Modus) greift kein Build-Hook — vor jedem Upload
manuell ausführen.

---

## Design-System

Verbindlich ist der Code in `assets/klang.css` (Subseiten) bzw. dem inline-`<style>`
in `index.html`. Beide teilen dieselben Tokens und Komponenten-Klassen.

### Farben (Tokens in `:root`)

Konzept: **warmes Grundgerüst + dezenter Blau-Akzent** (Stand 2026-06-02, vorher
reines Holz/Braun — bewusst entsättigt und mit Slate-Blau ergänzt).

- **Grundgerüst (warm, neutral):** `--paper #f6f1e9` (Hintergrund), `--surface #fffdf9`,
  `--cream #faf4ea`, `--ink #2f2922` (Text), `--muted #6e655b`, `--border #e0d8c9`.
- **Buttons (warm, taupe):** `--forest #77654d` / `--forest-dark #4a4138` — bleiben
  bewusst warm. Auf den dunklen Flächen (Hero/Sound-Band/CTA) ist der Primary-Button
  invertiert (weiß, Text `--accent-dark`), sonst verschwände Taupe auf Navy.
- **Blau-Akzent:** `--accent #3a6491` / `--accent-dark #2f5176` (Links, `:focus-visible`,
  Nav-Hover, `card__more`) und `--clay #3a6491` (Eyebrows, `card__meta`, `step__num`,
  auf hellem Grund). `--gold #9db8d4` ist trotz Namens ein **helles Slate-Blau** für
  Labels auf den dunklen Flächen (On-Dark-Eyebrows, Footer-Titel, Soundbite-Label).
- **Dunkelflächen = Slate-Navy:** Hero/Subhero-Basis `#1f3a5c`, Sound-Band
  `#1f3a5c→#33567e`, CTA `#2f5176→#3a6491`, Footer `#1c2530`. Overlays sind kühle
  Navy-Gradienten über den Foto-Hintergründen.
- Alle Kombinationen sind WCAG-AA-geprüft (Text/Akzente ≥ 4.5:1).

### Layout-System (Spacing + Grid)

- **Spacing-Scale (4/8-Rhythmus), Tokens `--s-1`…`--s-10`:** 4 · 8 · 12 · 16 · 24 ·
  32 · 48 · 64 · 96 · 128 px. Für neue Abstände diese Tokens nutzen.
- **`.grid-12`** — 12-Spalten-Grid (`repeat(12,minmax(0,1fr))`, `gap:var(--s-5)`) mit
  Span-Utilities `.col-1`…`.col-12`. Unter 768px stapeln alle Spalten (`grid-column:1/-1`).
  Live im Einsatz: „Warum Klang"-Karten auf der Startseite (3× `.col-4`).
- **`.split-golden`** / **`.split-golden--reverse`** — Links/Rechts-Split im Goldenen
  Schnitt (`1.618fr 1fr`). Bereits angewandt auf `page-grid` (Subseiten Inhalt/Aside)
  und `.sound-band .container`. Token `--golden:1.618`.
- Die alten `.grid`/`.grid--2`/`.grid--3` bleiben für einfache Kartenreihen bestehen.

### Typo

- Display = Serif (`--font-display`: Iowan Old Style / Palatino / Georgia)
- Body = System-Stack (`--font-body`: system-ui …). **Keine Webfonts** — es werden
  bewusst System-/Serif-Stacks genutzt (die früheren woff2-Dateien wurden entfernt).
- `h1` Startseite: `5.6rem` (clamp via Media-Queries auf 4.1rem/2.75rem).

### Komponenten (Klassen in klang.css)

`site-header`/`nav`/`brand` (CSS-generierte `.brand__mark`, kein Logo-Bild),
`hero`/`subhero` (`--klangreise`/`--trommelkreis`/`--obertoene`), `section`
(`--soft`), `card`/`card--link`/`card__image`, `sound-band`, `grid` (`--2`/`--3`),
`page-grid` + `aside`, `flow`/`step`, `overtone-note`, `cta`, `site-footer`, `btn`
(`--primary`/`--ghost`), `eyebrow`.

Breakpoints: **920px** (Layout-Stack, Nav scrollt horizontal) und **560px**
(Phone-Shrink). Neue Media-Queries dieselben Werte nutzen.

---

## Assets

- `assets/klang.css` — einziges externes Stylesheet (Subseiten).
- `assets/favicon.svg`, `assets/apple-touch-icon.png` (+ `.svg`-Quelle) — Holz-
  Gradient mit Schallwellen-Motiv.
- `assets/photos/*-wood.{webp,jpg}` — Hero, Klangreise, Zusammen spielen, Obertöne, OG.
  Eingebunden via `<picture>` mit WebP + JPG-Fallback (alle mit `?v=N`). **Nur die
  `-wood`-Varianten existieren** (die früheren Versionen ohne Suffix wurden entfernt).
  Die Bilder wurden am 2026-06-02 entsättigt/kühler getont; die unbearbeiteten
  Holz-Originale liegen als Backup in `assets/photos/_orig-wood/` (**vor dem Deploy
  entfernen/sperren**, sonst öffentlich abrufbar).

### Cache-Buster (Pflicht nach CSS-/JS-/Bild-Änderung)

`_headers` setzt `max-age` (CSS/HTML 300 s, übrige Assets 1 Tag) — **`immutable` wurde
am 2026-06-02 entfernt**, weil es klang.css UND Fotos nach einem Deploy bis zu ein Jahr
lang gecacht hielt (Symptom: Startseite zeigte neue Farben, Unterseiten/Mobile noch die
alten — Startseite hat CSS inline, Unterseiten laden klang.css).

Da Dateinamen gleich bleiben, **bei jeder Änderung den `?v=N`-Counter bumpen**:
- `klang.css`-`<link>` in allen 6 Unterseiten (404, impressum, datenschutz, obertoene,
  klangreise, trommelkreis) — identisch halten. Aktuell `?v=2`.
- Bild-URLs (in `index.html` + `assets/klang.css`, inkl. `og:image` und JSON-LD-`image`).
  Aktuell `?v=2`.
- `index.html` nutzt **inline-CSS** (kein eigener Counter nötig — deployt mit dem HTML).

---

## Manuelle Sync-Pflichten

- **Header/Footer-Markup** ist über alle Seiten dupliziert (kein Template-Engine).
  Nav-/Footer-Änderungen über alle Seiten mit identischem `old_string` editieren
  (Nav-Reihenfolge **Start · Seminar · Kontakt** überall gleich halten; versteckte Seiten
  erscheinen in keiner Nav).
- **`sitemap.xml`** listet nur Start + Seminar. Bei neuer / wieder eingeblendeter Seite
  Eintrag ergänzen.
- **JSON-LD** (`ProfessionalService` mit `makesOffer`) liegt im `<head>` von `index.html`.
  `makesOffer` enthält aktuell **nur den Seminar**. Bei Änderung von Name/Adresse/Angeboten
  dort mitziehen.

---

## Was AI NICHT machen soll

- **Keine erfundenen Trust-Signale / Heilversprechen.** Klangarbeit ist Wohlbefinden,
  keine Heilbehandlung — keine medizinischen Wirkversprechen, keine Garantien.
- **Keine erfundenen Impressums-/Kontaktdaten.** Platzhalter `[ ]` in `impressum.html`
  nur durch echte, vom Betreiber gelieferte Angaben ersetzen.
- **Nichts in production HTML truncaten.** Immer mit präzisem `old_string`/`new_string`
  arbeiten und danach `validate-html.js` laufen lassen.
- **Keine Tracking-Cookies / Analytics / externe Fonts ohne explizite Zustimmung.**
  Site ist cookie- und drittanbieterfrei und soll es bleiben (siehe CSP in `_headers`).

---

## Workshop-Verzeichnis

`_workshop/scripts/` enthält das HTML-Validierungs-Script. Der Ordner wird vom
Validator selbst übersprungen und ist über `robots.txt` vom Crawling
ausgeschlossen.
