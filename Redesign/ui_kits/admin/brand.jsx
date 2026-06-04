/* Katharos · Brand mark — pure inline-SVG vector art (no PNG dependency).
   καθαρός · "pure, clean". An editorial emblem: an olive leaf-droplet rising
   from Aegean waves, with a sky-blue centre. Colours:
   Aegean #006994 · Sky #0090C4 · Olive #6B7C3A · Sand #C9A96E · Ink #1A1A2E · Marble #F5F2ED.
   Exposes: BrandMark, Lockup, AppIcon, MapMarker, LockupImage. */

const BRAND = {
  aegean: '#006994', aegeanDark: '#004A6A', sky: '#0090C4',
  olive: '#6B7C3A', oliveDark: '#5A6830', sand: '#C9A96E',
  ink: '#1A1A2E', marble: '#F5F2ED', white: '#FAFAF8',
};

/* Palette per surface. variant: 'color' (on light/marble) | 'white' (on aegean)
   | 'ink' (on dark ink) | 'contour' (monoline outline). */
function markPalette(variant) {
  switch (variant) {
    case 'white':   return { leaf: 'rgba(255,255,255,0.22)', leafStroke: '#FFFFFF', wave1: '#FFFFFF', wave2: 'rgba(255,255,255,0.45)', dot: '#FFFFFF', ring: 'rgba(255,255,255,0.30)' };
    case 'ink':     return { leaf: 'rgba(107,124,58,0.30)',  leafStroke: '#8A9A4D', wave1: '#0090C4', wave2: 'rgba(0,144,196,0.45)', dot: '#0090C4', ring: 'rgba(255,255,255,0.16)' };
    case 'contour': return { leaf: 'none', leafStroke: 'currentColor', wave1: 'currentColor', wave2: 'currentColor', dot: 'currentColor', ring: 'currentColor' };
    default:        return { leaf: 'rgba(107,124,58,0.22)',  leafStroke: '#6B7C3A', wave1: '#006994', wave2: 'rgba(0,144,196,0.40)', dot: '#0090C4', ring: 'rgba(0,144,196,0.28)' };
  }
}

/* The emblem. size = px width/height (square). ring shows the thin outer circle.
   halo adds a soft white outline for legibility over imagery. */
function BrandMark({ size = 44, variant = 'color', ring = false, halo = false, style }) {
  const p = markPalette(variant);
  const haloFilter = 'drop-shadow(0 0 1.4px rgba(255,255,255,0.9)) drop-shadow(0 2px 4px rgba(0,0,0,0.28))';
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none"
      style={{ display: 'block', overflow: 'visible', filter: halo ? haloFilter : (style && style.filter) || 'none', ...style }}
      role="img" aria-label="Katharos">
      {ring && <circle cx="60" cy="60" r="55" stroke={p.ring} strokeWidth="1" />}
      {/* waves (sea) */}
      <path d="M18 72 Q30 60 42 72 Q54 84 66 72 Q78 60 90 72 Q100 81 102 75"
        stroke={p.wave1} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M22 80 Q34 68 46 80 Q58 92 70 80 Q82 68 94 80"
        stroke={p.wave2} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* leaf-droplet (place + nature) */}
      <path d="M60 20 C60 20 40 40 40 55 C40 66 49 74 60 74 C71 74 80 66 80 55 C80 40 60 20 60 20Z"
        fill={p.leaf} stroke={p.leafStroke} strokeWidth="1.6" strokeLinejoin="round" />
      {/* inner highlight */}
      {variant !== 'contour' && (
        <ellipse cx="54" cy="46" rx="3.6" ry="6.4" fill="rgba(255,255,255,0.16)" transform="rotate(-15 54 46)" />
      )}
      {/* centre dot */}
      <circle cx="60" cy="55" r="3" fill={p.dot} />
    </svg>
  );
}

/* Severity map marker — a legible filled teardrop (tip down) carrying the
   leaf-drop DNA, tinted by how long a report has been open. */
const SEV_PIN = {
  fresh:   '#5A6830',  /* olive   — < 7d */
  recent:  '#C9A96E',  /* sand    — < 30d */
  aging:   '#C57A3C',  /* amber   — < 60d */
  ignored: '#9A3517',  /* terracotta — > 60d */
};
function pinKeyForDays(days) {
  if (days == null) return null;
  if (days < 7) return 'fresh';
  if (days < 30) return 'recent';
  if (days < 60) return 'aging';
  return 'ignored';
}

function MapMarker({ size = 30, active, cluster, sev, days, variant = 'color' }) {
  const key = sev || pinKeyForDays(days);
  const fill = key ? SEV_PIN[key] : BRAND.aegean;
  const w = size, h = Math.round(size * 1.36);
  const halo = 'drop-shadow(0 0 1.4px rgba(255,255,255,0.95)) drop-shadow(0 3px 4px rgba(0,0,0,0.30))';
  return (
    <div style={{ position: 'relative', width: w, height: h,
      filter: active ? 'drop-shadow(0 6px 10px rgba(0,105,148,0.45))' : 'none',
      transform: active ? 'scale(1.12)' : 'none', transformOrigin: 'bottom center', transition: 'transform .15s' }}>
      <svg width={w} height={h} viewBox="0 0 44 60" fill="none" style={{ display: 'block', filter: halo }}>
        {/* teardrop pin */}
        <path d="M22 2 C11 2 2 11 2 22 C2 36 22 58 22 58 C22 58 42 36 42 22 C42 11 33 2 22 2Z" fill={fill} />
        {/* leaf knockout */}
        <path d="M22 9 C22 9 13 17 13 24 C13 29 17 33 22 33 C27 33 31 29 31 24 C31 17 22 9 22 9Z" fill="rgba(255,255,255,0.92)" />
        {/* centre dot */}
        <circle cx="22" cy="24" r="2.4" fill={fill} />
      </svg>
      {cluster != null && (
        <span style={{ position: 'absolute', top: -5, right: -7, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 9999,
          background: BRAND.ink, color: '#fff', fontSize: 11, fontWeight: 500, fontFamily: "'DM Mono', monospace",
          display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxSizing: 'border-box' }}>{cluster}</span>
      )}
    </div>
  );
}

/* Wordmark lockup: emblem + "Katharos" (Cormorant, light, the "a" in sky).
   on: 'light' | 'marble' | 'blue' (aegean) | 'ink'. sub adds "καθαρός" line;
   tagline adds "CLEAN · REPORT · CHANGE". */
function Lockup({ mark = 30, on = 'light', sub = false, tagline = false, gap = 12 }) {
  const onDark = on === 'blue' || on === 'ink';
  const variant = on === 'blue' ? 'white' : on === 'ink' ? 'ink' : 'color';
  const wordColor = onDark ? '#FAFAF8' : '#1A1A2E';
  const aColor = on === 'blue' ? '#FFFFFF' : BRAND.sky;
  const subColor = onDark ? 'rgba(255,255,255,0.55)' : 'rgba(26,26,46,0.45)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <BrandMark size={mark * 1.45} variant={variant} ring />
      <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: mark * 1.35, fontWeight: 300, letterSpacing: '0.16em', color: wordColor }}>
          K<span style={{ color: aColor }}>a</span>tharos
        </span>
        {(sub || tagline) && (
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: Math.max(8, mark * 0.30), fontWeight: 400, letterSpacing: '0.30em', textTransform: 'uppercase', color: subColor, marginTop: mark * 0.22 }}>
            {tagline ? 'Clean · Report · Change' : 'καθαρός'}
          </span>
        )}
      </span>
    </span>
  );
}

/* App icon — rounded ink square with a subtle Aegean bloom + white emblem. */
function AppIcon({ size = 96, radius, variant = 'ink', style }) {
  const r = radius != null ? radius : size * 0.22;
  const bg = variant === 'aegean' ? BRAND.aegean : BRAND.ink;
  const bloom = variant === 'aegean' ? 'rgba(0,144,196,0.55)' : 'rgba(0,105,148,0.55)';
  return (
    <div style={{ width: size, height: size, borderRadius: r, background: bg, position: 'relative', overflow: 'hidden',
      boxShadow: '0 10px 26px rgba(26,26,46,0.40)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '120%', height: '90%',
        background: `radial-gradient(ellipse, ${bloom} 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <BrandMark size={size * 0.62} variant="white" ring style={{ position: 'relative' }} />
    </div>
  );
}

/* Full primary lockup, rendered inline (emblem + wordmark + καθαρός + tagline). */
function LockupImage({ height = 64, on = 'light', style }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: height * 0.18, ...style }}>
      <Lockup mark={height * 0.5} on={on} sub />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: Math.max(8, height * 0.13), letterSpacing: '0.32em', textTransform: 'uppercase', color: BRAND.sand }}>Clean · Report · Change</span>
    </span>
  );
}

Object.assign(window, { BRAND, BrandMark, MapMarker, Lockup, AppIcon, LockupImage, SEV_PIN, pinKeyForDays });
