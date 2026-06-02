/* GreeceClean · Brand mark — inline SVG, crisp at any size.
   Aegean Blue #0D6FDB · Eco Green #39B24A.
   Pin-as-"G": open-mouth G + eco leaf + Aegean waves.
   viewBox 0 0 100 136  (matches legacy 221:301 PNG ratio). */

const BRAND = {
  blue: '#0D6FDB', blueDark: '#0B57AD', green: '#39B24A',
  greenDark: '#2E8C3B', mist: '#F2F7FB', white: '#FFFFFF',
};
const SYM_RATIO = 136 / 100;

/* Core G-pin SVG.
   G geometry: center (50,42), outer r=31, inner r=17.
   Opening at upper-right. Spur is the horizontal crossbar at right.
   fill-rule=evenodd makes the G a ring (outer filled, inner hollow). */
function _GPin({ size = 40, fillColor = '#0D6FDB', gColor = 'white', leafColor = '#39B24A', waveColor = 'white' }) {
  const h = Math.round(size * SYM_RATIO);
  return (
    <svg width={size} height={h} viewBox="0 0 100 136" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Teardrop pin body */}
      <path d="M50,2 C78,2 98,22 98,50 C98,79 76,98 56,112 L50,136 L44,112 C24,98 2,79 2,50 C2,22 22,2 50,2 Z"
        fill={fillColor}/>

      {/* G letterform — open-mouth G with horizontal spur.
          Outer arc clockwise (sweep=1) from opening-top → through top/left/bottom → spur-top.
          Spur rectangle, then inner arc counterclockwise (sweep=0) the long way back.
          evenodd fill creates the G ring with hollow interior. */}
      <path
        d="M77,27 A31,31 0 1,1 81,42 L81,52 L67,52 L67,42 A17,17 0 1,0 65,34 Z"
        fill={gColor} fillRule="evenodd"/>

      {/* Eco leaf — ellipse in lower-left of G bowl */}
      {leafColor !== 'none' && (
        <ellipse cx="40" cy="52" rx="11.5" ry="6.5"
          transform="rotate(-38 40 52)" fill={leafColor}/>
      )}

      {/* Aegean waves — two horizontal arcs in lower pin body */}
      <path d="M25,78 Q37,73 50,78 Q63,83 75,78"
        stroke={waveColor} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M29,87 Q40,82 50,87 Q60,92 71,87"
        stroke={waveColor} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* Brand symbol — colour (on light) or white (on blue/dark). */
function BrandMark({ size = 40, variant = 'color', halo = false, style }) {
  const cfgs = {
    color: { fillColor: '#0D6FDB', gColor: 'white',             leafColor: '#39B24A', waveColor: 'white' },
    white: { fillColor: 'white',   gColor: 'rgba(13,111,219,.18)', leafColor: '#39B24A', waveColor: 'rgba(13,111,219,.18)' },
  };
  const cfg = cfgs[variant] || cfgs.color;
  const shadow = halo
    ? 'drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 1.5px #fff) drop-shadow(0 3px 4px rgba(0,0,0,.30))'
    : 'none';
  return (
    <span style={{ display: 'inline-flex', filter: shadow, ...style }}>
      <_GPin size={size} {...cfg} />
    </span>
  );
}

/* Severity-tinted map marker.
   When days is passed the pin colour reflects how long the report has been open.
   Colours match handoff/brand/pins/ PNGs exactly. */
function MapMarker({ size = 30, active, cluster, days }) {
  let fillColor = '#0D6FDB';
  if (days != null) {
    if      (days < 7)  fillColor = '#1FA64B';
    else if (days < 30) fillColor = '#F2B70C';
    else if (days < 60) fillColor = '#F4761B';
    else                fillColor = '#E23B3B';
  }
  const h = Math.round(size * SYM_RATIO);
  return (
    <div style={{
      position: 'relative', width: size, height: h,
      filter: active
        ? 'drop-shadow(0 6px 9px rgba(13,111,219,.5))'
        : 'drop-shadow(0 2px 3px rgba(0,0,0,.35))',
      transform: active ? 'scale(1.12)' : 'none',
      transformOrigin: 'bottom center', transition: 'transform .15s',
    }}>
      <_GPin size={size} fillColor={fillColor} gColor="white"
        leafColor={days == null ? '#39B24A' : 'rgba(255,255,255,.55)'}
        waveColor="white" />
      {cluster != null && (
        <span style={{
          position: 'absolute', top: -5, right: -7, minWidth: 18, height: 18, padding: '0 4px',
          borderRadius: 9999, background: BRAND.blueDark, color: '#fff', fontSize: 11, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid #fff', boxSizing: 'border-box',
        }}>{cluster}</span>
      )}
    </div>
  );
}

/* Wordmark lockup: mark + "GreeceClean" + optional tagline. */
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
            color: onBlue ? 'rgba(255,255,255,.82)' : BRAND.blue,
          }}>REPORT IT. CLEAN IT. LOVE GREECE.</span>
        )}
      </span>
    </span>
  );
}

/* App icon — blue rounded square + white G-pin (matches app-icon.png). */
function AppIcon({ size = 96, radius, style }) {
  const r = radius != null ? radius : Math.round(size * 0.22);
  return (
    <div style={{
      width: size, height: size,
      background: `linear-gradient(150deg, ${BRAND.blue}, ${BRAND.blueDark})`,
      borderRadius: r, display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 22px rgba(13,111,219,.4)', flexShrink: 0, ...style,
    }}>
      <_GPin size={Math.round(size * 0.70)}
        fillColor="white" gColor="rgba(13,111,219,.22)"
        leafColor="#39B24A" waveColor="rgba(13,111,219,.22)" />
    </div>
  );
}

/* Full lockup PNG fallback (mark + wordmark + tagline as single image). */
function LockupImage({ height = 56, style }) {
  return (
    <img src="../brand/logo-lockup.png" alt="GreeceClean — Report it. Clean it. Love Greece."
      height={height} style={{ display: 'block', width: 'auto', ...style }} />
  );
}

Object.assign(window, { BRAND, BrandMark, MapMarker, Lockup, AppIcon, LockupImage });
