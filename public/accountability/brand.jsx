/* GreeceClean · Brand mark — uses the REAL logo artwork (PNG), extracted from
   the official brand sheet. Aegean Blue #0D6FDB · Eco Green #39B24A · Sea Mist #F2F7FB.
   Assets resolved from public/brand/ (one level up from this file). */

const BRAND = { blue: '#0D6FDB', blueDark: '#0B57AD', green: '#39B24A', greenDark: '#2E8C3B', mist: '#F2F7FB', white: '#FFFFFF' };
const SYM_RATIO = 301 / 221; // height / width of logo-symbol.png

/* The pin symbol. variant 'color' (default, on light) | 'white' (on blue/dark).
   size = width in px. halo adds a soft white outline for map legibility. */
function BrandMark({ size = 40, variant = 'color', halo = false, style }) {
  const src = variant === 'white' ? '../brand/logo-symbol-white.png' : '../brand/logo-symbol.png';
  const filter = halo
    ? 'drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 1.5px #fff) drop-shadow(0 3px 4px rgba(0,0,0,0.30))'
    : (style && style.filter) || 'none';
  return (
    <img src={src} alt="GreeceClean" width={size} height={Math.round(size * SYM_RATIO)}
      style={{ display: 'block', objectFit: 'contain', ...style, filter }} />
  );
}

/* Severity → brand pin PNG mapping (matches handoff/brand/pins/).
   When days is provided the marker uses the severity-tinted G-pin;
   falls back to the colour logo-symbol for non-severity contexts. */
function _sevPinSrc(days) {
  if (days == null) return '../brand/logo-symbol.png';
  if (days < 7)  return '../brand/pins/pin-fresh.png';
  if (days < 30) return '../brand/pins/pin-recent.png';
  if (days < 60) return '../brand/pins/pin-aging.png';
  return '../brand/pins/pin-ignored.png';
}

/* Filled-pin map marker — severity-tinted brand G-pin. */
function MapMarker({ size = 30, active, cluster, days }) {
  const w = size, h = Math.round(size * SYM_RATIO);
  const src = _sevPinSrc(days);
  return (
    <div style={{ position: 'relative', width: w, height: h,
      filter: active
        ? 'drop-shadow(0 6px 9px rgba(13,111,219,0.5))'
        : 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))',
      transform: active ? 'scale(1.12)' : 'none', transformOrigin: 'bottom center', transition: 'transform .15s' }}>
      <img src={src} alt="" width={w} height={h}
        style={{ display: 'block', objectFit: 'contain' }} />
      {cluster != null && (
        <span style={{ position: 'absolute', top: -5, right: -7, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 9999,
          background: BRAND.blueDark, color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxSizing: 'border-box' }}>{cluster}</span>
      )}
    </div>
  );
}

/* Wordmark lockup: mark + "GreeceClean" (+ optional tagline). */
function Lockup({ mark = 26, on = 'light', tagline = false, gap = 9 }) {
  const onBlue = on === 'blue';
  const greece = onBlue ? '#fff' : BRAND.blue;
  const clean = onBlue ? '#9FE3AC' : BRAND.green;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <BrandMark size={mark} variant={onBlue ? 'white' : 'color'} />
      <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontSize: mark * 0.92, fontWeight: 800, letterSpacing: '-0.02em' }}>
          <span style={{ color: greece }}>Greece</span><span style={{ color: clean }}>Clean</span>
        </span>
        {tagline && <span style={{ fontSize: mark * 0.30, fontWeight: 700, letterSpacing: '0.15em', color: onBlue ? 'rgba(255,255,255,0.82)' : BRAND.blue, marginTop: 4 }}>REPORT IT. CLEAN IT. LOVE GREECE.</span>}
      </span>
    </span>
  );
}

/* The real app icon (rounded blue square + white mark). */
function AppIcon({ size = 96, radius, style }) {
  return (
    <img src="../brand/app-icon.png" alt="GreeceClean" width={size} height={size}
      style={{ display: 'block', borderRadius: radius != null ? radius : size * 0.22, boxShadow: '0 8px 22px rgba(13,111,219,0.4)', ...style }} />
  );
}

/* Full primary lockup as a single image (mark + wordmark + tagline). */
function LockupImage({ height = 56, style }) {
  return <img src="../brand/logo-lockup.png" alt="GreeceClean — Report it. Clean it. Love Greece." height={height}
    style={{ display: 'block', width: 'auto', ...style }} />;
}

Object.assign(window, { BRAND, BrandMark, MapMarker, Lockup, AppIcon, LockupImage });
