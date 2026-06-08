# DesignSystem-Integration Musikraum

Die Website ist gegen das Contract-basierte `GasserwerkSolutions/DesignSystem` aufgebaut.

## Verwendeter Contract

```html
<html lang="de-CH" data-tone="premium" data-mode="light" data-density="comfortable">
```

Die produktive Site bleibt eine statische Cloudflare-Pages-Direct-Upload-Site ohne Build-Step. Deshalb ist der relevante DesignSystem-Contract lokal in `assets/klang.css` umgesetzt, statt eine externe CDN-Abhängigkeit einzubauen.

## Umsetzung

`assets/klang.css` folgt der Layer-Reihenfolge des DesignSystems:

`reset → tokens → semantic → themes → mode → base → state → components → patterns → site`

Die Website nutzt DesignSystem-kompatible Tokens für:

- Spacing
- Typografie
- Radius
- Motion
- Container
- Buttons
- Cards
- Sections
- Navigation
- Hero-/CTA-Patterns

## Abnahme

- CSS ist self-contained und CSP-kompatibel.
- Keine externen Font-, CDN- oder Runtime-Abhängigkeiten.
- Die Site bleibt deploybar über Cloudflare Pages Direct Upload.
- Visuelle Sprache: `premium`, `light`, `comfortable`.
