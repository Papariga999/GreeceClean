# Severity‑tinted brand map pins

Four map markers that keep the **GreeceClean pin‑“G”** shape (white leaf + Aegean waves knocked out) while encoding **report severity** by fill color. Use these to replace the plain colored dots on the cluster map and the report‑detail map — you get the brand *and* the at‑a‑glance severity read.

## Files (`brand/pins/`)

| File | Severity | Days open | Fill |
|------|----------|-----------|------|
| `pin-fresh.png`   | Fresh    | < 7 days  | `#1FA64B` green |
| `pin-recent.png`  | Recent   | < 30 days | `#F2B70C` amber |
| `pin-aging.png`   | Aging    | < 60 days | `#F4761B` orange |
| `pin-ignored.png` | Ignored  | > 60 days | `#E23B3B` red |

Each PNG is 221×301 (w:h ≈ 0.734), transparent background and transparent G‑counter.

## Leaflet usage

```ts
const SEVERITY_PIN = {
  fresh: '/brand/pins/pin-fresh.png',
  recent: '/brand/pins/pin-recent.png',
  aging: '/brand/pins/pin-aging.png',
  ignored: '/brand/pins/pin-ignored.png',
}

function severityKey(daysOpen: number) {
  if (daysOpen < 7) return 'fresh'
  if (daysOpen < 30) return 'recent'
  if (daysOpen < 60) return 'aging'
  return 'ignored'
}

function pinIcon(daysOpen: number) {
  return L.icon({
    iconUrl: SEVERITY_PIN[severityKey(daysOpen)],
    iconSize: [30, 41],        // ~221:301 scaled
    iconAnchor: [15, 41],      // tip touches the coordinate
    popupAnchor: [0, -38],
    className: 'gc-pin',       // add a drop-shadow via CSS for legibility
  })
}
```

```css
.gc-pin { filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); }
```

- **Resolved reports:** use `pin-fresh.png` (green) or a dedicated resolved style if you have one — green already reads as "good".
- **Clusters:** keep the existing count badge; tint the cluster bubble by the *worst* severity in the cluster for an at‑a‑glance hotspot read.
- Pins are raster; for retina add `iconRetinaUrl` (a 2× export) or switch to an inline SVG `divIcon` tinted via CSS `background-color` if you prefer vector.
