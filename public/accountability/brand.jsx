/* GreeceClean · Brand mark — uses the delivered logo PNGs from public/brand/.
   The pin-as-"G" mark: new open-mouth G, eco leaf, Aegean waves.
   Aegean Blue #0D6FDB · Eco Green #39B24A.

   PNG assets (new design) live one level up at ../brand/:
     logo-symbol.png       — colour mark (blue pin + green leaf) on transparent
     logo-symbol-white.png — white mark on transparent, for blue/dark surfaces
     app-icon.png          — rounded blue square app icon
     logo-lockup.png       — full wordmark + tagline as single image

   Severity map pins live at ../brand/pins/:
     pin-fresh.png   < 7 days   green  #1FA64B
     pin-recent.png  < 30 days  amber  #F2B70C
     pin-aging.png   < 60 days  orange #F4761B
     pin-ignored.png ≥ 60 days  red    #E23B3B
*/

const BRAND = {
  blue: '#0D6FDB', blueDark: '#0B57AD', green: '#39B24A',
  greenDark: '#2E8C3B', mist: '#F2F7FB', white: '#FFFFFF',
};
const SYM_RATIO = 301 / 221; // h/w of logo-symbol.png

/* Pin symbol — colour (light bg) or white (blue/dark bg).
   halo adds a drop-shadow for legibility on busy map tiles. */
function BrandMark({ size = 40, variant = 'color', halo = false, style }) {
  const src = variant === 'white'
    ? '../brand/logo-symbol-white.png'
    : '../brand/logo-symbol.png';
  const filter = halo
    ? 'drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 1.5px #fff) drop-shadow(0 3px 4px rgba(0,0,0,0.30))'
    : (style && style.filter) || 'none';
  return (
    <img
      src={src}
      alt="GreeceClean"
      width={size}
      height={Math.round(size * SYM_RATIO)}
      style={{ display: 'block', objectFit: 'contain', ...style, filter }}
    />
  );
}

/* Severity-tinted map marker using the delivered pin PNGs.
   When days is provided the correct severity pin is chosen automatically. */
function _sevSrc(days) {
  if (days == null) return '../brand/logo-symbol.png';
  if (days < 7)    return '../brand/pins/pin-fresh.png';
  if (days < 30)   return '../brand/pins/pin-recent.png';
  if (days < 60)   return '../brand/pins/pin-aging.png';
  return               '../brand/pins/pin-ignored.png';
}

function MapMarker({ size = 30, active, cluster, days }) {
  const w = size;
  const h = Math.round(size * SYM_RATIO);
  return (
    <div style={{
      position: 'relative', width: w, height: h,
      filter: active
        ? 'drop-shadow(0 6px 9px rgba(13,111,219,0.5))'
        : 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))',
      transform: active ? 'scale(1.12)' : 'none',
      transformOrigin: 'bottom center', transition: 'transform .15s',
    }}>
      <img src={_sevSrc(days)} alt="" width={w} height={h}
        style={{ display: 'block', objectFit: 'contain' }} />
      {cluster != null && (
        <span style={{
          position: 'absolute', top: -5, right: -7, minWidth: 18, height: 18,
          padding: '0 4px', borderRadius: 9999, background: BRAND.blueDark,
          color: '#fff', fontSize: 11, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid #fff', boxSizing: 'border-box',
        }}>{cluster}</span>
      )}
    </div>
  );
}

/* Wordmark lockup: mark + "GreeceClean" (+ optional tagline). */
function Lockup({ mark = 26, on = 'light', tagline = false, gap = 9 }) {
  const onBlue = on === 'blue';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <BrandMark size={mark} variant={onBlue ? 'white' : 'color'} />
      <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontSize: mark * 0.92, fontWeight: 800, letterSpacing: '-0.02em' }}>
          <span style={{ color: onBlue ? '#fff' : BRAND.blue }}>Greece</span>
          <span style={{ color: onBlue ? '#9FE3AC' : BRAND.green }}>Clean</span>
        </span>
        {tagline && (
          <span style={{
            fontSize: mark * 0.30, fontWeight: 700, letterSpacing: '0.15em', marginTop: 4,
            color: onBlue ? 'rgba(255,255,255,0.82)' : BRAND.blue,
          }}>REPORT IT. CLEAN IT. LOVE GREECE.</span>
        )}
      </span>
    </span>
  );
}

/* Rounded blue square app icon (uses the real app-icon.png). */
function AppIcon({ size = 96, radius, style }) {
  return (
    <img
      src="../brand/app-icon.png"
      alt="GreeceClean"
      width={size}
      height={size}
      style={{
        display: 'block',
        borderRadius: radius != null ? radius : Math.round(size * 0.22),
        boxShadow: '0 8px 22px rgba(13,111,219,0.4)',
        ...style,
      }}
    />
  );
}

/* Full primary lockup as a single image (mark + wordmark + tagline). */
function LockupImage({ height = 56, style }) {
  return (
    <img
      src="../brand/logo-lockup.png"
      alt="GreeceClean — Report it. Clean it. Love Greece."
      height={height}
      style={{ display: 'block', width: 'auto', ...style }}
    />
  );
}

Object.assign(window, { BRAND, BrandMark, MapMarker, Lockup, AppIcon, LockupImage });
