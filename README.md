# Musikraum— Website

Statische Site f?r Musik aus der Stille, Klangbehandlungen, Obert?ne und gemeinsames Spielen ohne Noten mit mir.
Deployment via **Cloudflare Pages** (Direct Upload, kein Build-Step).

Detaillierter Projekt-Kontext und Konventionen: siehe [CLAUDE.md](CLAUDE.md).

## Struktur

```
.
├── index.html
├── angebote/
│   ├── klangbehandlung/index.html
│   ├── zusammen-spielen/index.html
│   ├── klangreise/index.html          Weiterleitung
│   └── trommelkreis/index.html        Weiterleitung
├── obertoene/index.html
├── impressum.html
├── datenschutz.html
├── 404.html
├── _headers
├── _redirects
├── robots.txt
├── sitemap.xml
├── manifest.json
├── assets/
│   ├── klang.css
│   ├── favicon.svg · apple-touch-icon.png/.svg
│   └── photos/*-wood.{webp,jpg}
└── _workshop/scripts/
    └── validate-html.js
```

## Pflicht-Check nach HTML-Edits

```
node _workshop/scripts/validate-html.js
```

Muss `✓ Alle N Seiten OK.` liefern, bevor hochgeladen wird.

## Vor dem Go-Live offen

- **Impressum**: Platzhalter `[ ]` (Name, Adresse, Rechtsform) mit echten Angaben füllen.
- **Domain**: `Musikraum.ch` auf Cloudflare Pages aufschalten, SSL aktiv.
- **Validatoren**: schema.org Rich-Results-Test, PageSpeed/Lighthouse.

## Deployment

```
wrangler pages deploy . --project-name=<projekt> --branch=main --commit-dirty=true
```
