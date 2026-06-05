# Bild-Grading-Regel — Musikraum

Damit alle (Sub)Hero-Bilder über die ganze Seite **einheitlich** wirken. Ziel-Look:
**warm, sanft gemutet, aber lebendig** — nicht flau/monoton, nicht knallig; neutral-warmer
Weißabgleich (kein Kühl-/Blau-Stich), leichter Kontrast für Tiefe.

Referenz-Ton: das Klangbehandlungs-/Wood-Set. Neue Fotos werden visuell **gegen ein
vorhandenes Set-Bild abgeglichen** (z. B. `klangreise-wood.jpg`).

## Rezept (Node, `sharp`)

**Weiche/AI-artige Bilder** (das vorhandene Wood-Set — bereits soft):
```js
sharp(src).modulate({ saturation: 0.9 })
          .linear([1.04, 1.0, 0.95], [-6, -6, -4])   // R↑ B↓ = warm, Offset = Kontrast
```

**Echte, satte Fotos** (z. B. `franz-auftritte-instrumente`, künftige Handy-/Profifotos):
```js
sharp(src).modulate({ saturation: 0.62 })            // Sättigung je Foto 0.55–0.70 antasten
          .linear([0.98, 1.0, 1.0], [-5, -5, -3])    // Bunt-Spitzen (Orange/Rot) zähmen, leicht Kontrast
```

## Vorgehen für ein neues Foto
1. Immer vom **Original** graden (nie ein bereits gegradetes Bild nochmal graden).
   Originale liegen als Backup in `assets/photos/_orig-wood/`.
2. Start mit dem „echtes Foto"-Rezept; Sättigung so wählen, dass die kräftigsten Farben
   auf das gemutete Set-Niveau kommen, ohne dass das Bild grau wird.
3. Falls Kühl-/Blau-Stich: `linear`-R leicht >1, B leicht <1 (wärmer). Bei Gelbstich umgekehrt.
4. Export: WebP `quality 80` + JPG `quality 82`, **gleicher Dateiname**, danach `?v=N` bumpen
   (Bild-URLs in `index.html` + `assets/klang.css`).
5. `node _workshop/scripts/validate-html.js` und visuell gegen ein Set-Bild prüfen.

## Stand 2026-06-03
- Wood-Set (hero-klangraum, klangreise, obertoene-klangschale, trommelkreis, og) neu aus
  den Originalen gegradet → lebendiger + warm (vorher zu kühl/monoton).
- `franz-auftritte-instrumente` stark entsättigt/neutralisiert → sitzt jetzt im Set-Ton.
- (Sub)Hero-**Overlay** ist auf Start- und Unterseiten identisch (`.hero::after` = `.subhero::after`).
