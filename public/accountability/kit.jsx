/* GreeceClean · Accountability layer — shared kit
   PhoneFrame, severity engine, and all NEW interactive components.
   Greek-first. Exports to window. */

const T = {
  primary: '#0D6FDB', primary600: '#0B57AD', primary50: '#EAF2FC',
  action: '#39B24A', action600: '#2E8C3B',
  ink: '#111827', ink2: '#4B5563', ink3: '#9CA3AF',
  line: '#F3F4F6', line2: '#E5E7EB', surface: '#fff', bg: '#F9FAFB',
  whatsapp: '#25D366', viber: '#7360F2',
};
// Severity ramp (bold) — by days open
const SEV_STOPS = [
  { max: 7,        key: 'fresh',    fg: '#15A34A', bg: '#DCFCE7', el: 'φρέσκο' },
  { max: 30,       key: 'watch',    fg: '#D97706', bg: '#FEF3C7', el: 'προσοχή' },
  { max: 60,       key: 'escalate', fg: '#EA580C', bg: '#FFEDD5', el: 'κλιμακώνεται' },
  { max: Infinity, key: 'ignored',  fg: '#DC2626', bg: '#FEE2E2', el: 'αγνοείται' },
];
function sev(days) { return SEV_STOPS.find(s => days < s.max) || SEV_STOPS[SEV_STOPS.length - 1]; }

// Greek categories
const CAT = {
  illegal_dump:        { el: 'Παράνομη Χωματερή',  icon: '🗑️', circ: '#FEE2E2' },
  construction_debris: { el: 'Μπάζα',               icon: '🏗️', circ: '#F5F5F4' },
  roadside_litter:     { el: 'Σκουπίδια',           icon: '🚮', circ: '#DBEAFE' },
  plastics:            { el: 'Πλαστικά',            icon: '🧴', circ: '#CCFBF1' },
  tires:               { el: 'Ελαστικά',            icon: '🛞', circ: '#F1F5F9' },
  appliances:          { el: 'Συσκευές',            icon: '🔌', circ: '#FEF9C3' },
  abandoned_vehicle:   { el: 'Όχημα',               icon: '🚗', circ: '#F3E8FF' },
  green_waste:         { el: 'Κλαδιά',              icon: '🌿', circ: '#FFEDD5' },
  bulky_items:         { el: 'Ογκώδη',              icon: '🛋️', circ: '#FEF3C7' },
  coastal_pollution:   { el: 'Ρύπανση Ακτής',       icon: '🌊', circ: '#CFFAFE' },
  sewage:              { el: 'Λύματα',              icon: '☣️', circ: '#FFE4E6' },
  other:               { el: 'Άλλο',                icon: '❓', circ: '#F3F4F6' },
};

// ── Status bar ──────────────────────────────────────────────
function StatusBar({ dark }) {
  const c = dark ? '#fff' : T.ink;
  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 22px', flexShrink: 0, color: c, fontSize: 14, fontWeight: 600 }}>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill={c}><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}><path d="M8 2.2c2 0 3.8.8 5.1 2l1.3-1.4A9.4 9.4 0 008 .1 9.4 9.4 0 001.6 2.8L2.9 4.2A7.4 7.4 0 018 2.2z" opacity="0.9"/><path d="M8 5.6c1.1 0 2.1.4 2.8 1.2l1.3-1.4A6 6 0 008 3.6a6 6 0 00-4.1 1.8l1.3 1.4A3.9 3.9 0 018 5.6z"/><circle cx="8" cy="9.2" r="1.6"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={c} opacity="0.4"/><rect x="2" y="2" width="17" height="8" rx="1.5" fill={c}/><rect x="22.5" y="4" width="1.5" height="4" rx="0.75" fill={c} opacity="0.5"/></svg>
      </div>
    </div>
  );
}

// ── Bottom tab nav ──────────────────────────────────────────
function BottomTab({ active, onNav }) {
  const tabs = [
    { k: 'map', label: 'Χάρτης', icon: '📍' },
    { k: 'top', label: 'Επείγοντα', icon: '🔥' },
    { k: 'report', label: 'Αναφορά', icon: '＋', center: true },
    { k: 'impact', label: 'Αντίκτυπος', icon: '🛡️' },
  ];
  const go = (k) => onNav && onNav(k);
  return (
    <div style={{ flexShrink: 0, borderTop: `1px solid ${T.line}`, background: '#fff',
      display: 'flex', padding: '8px 8px 22px', position: 'relative' }}>
      {tabs.map(t => t.center ? (
        <div key={t.k} onClick={() => go(t.k)} style={{ flex: 1, display: 'flex', justifyContent: 'center', cursor: onNav ? 'pointer' : 'default' }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: T.action, marginTop: -26,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(107,142,35,0.45)', border: '4px solid #fff' }}>
            <span style={{ fontSize: 26, color: '#fff', lineHeight: 1, fontWeight: 300, marginTop: -2 }}>＋</span>
          </div>
        </div>
      ) : (
        <div key={t.k} onClick={() => go(t.k)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          color: active === t.k ? T.primary : T.ink3, cursor: onNav ? 'pointer' : 'default' }}>
          <span style={{ fontSize: 19, lineHeight: 1, filter: active === t.k ? 'none' : 'grayscale(0.6) opacity(0.75)' }}>{t.icon}</span>
          <span style={{ fontSize: 10, fontWeight: active === t.k ? 700 : 500 }}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Phone frame ─────────────────────────────────────────────
function PhoneFrame({ width = 375, height, children, dark, scroll, contentBg = T.bg }) {
  return (
    <div style={{ width, height, background: '#000', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: dark ? T.primary : contentBg }}>
        {children}
      </div>
    </div>
  );
}

// ── Buttons ─────────────────────────────────────────────────
function Btn({ kind = 'primary', children, onClick, style, full }) {
  const map = {
    primary: { bg: T.primary, fg: '#fff' }, action: { bg: T.action, fg: '#fff' },
    ghost: { bg: '#fff', fg: T.ink2, border: `1px solid ${T.line2}` },
    dark: { bg: T.ink, fg: '#fff' },
  };
  const s = map[kind];
  return (
    <button onClick={onClick} style={{ background: s.bg, color: s.fg, border: s.border || 'none',
      borderRadius: 24, padding: '13px 20px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
      fontFamily: 'inherit', width: full ? '100%' : undefined, ...style }}>{children}</button>
  );
}

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    border: `1px solid ${T.line}`, padding: 16, ...style }}>{children}</div>;
}

function CatBadge({ id, size = 'md' }) {
  const c = CAT[id] || { icon: '📍', el: '', circ: '#F3F4F6' };
  const d = size === 'sm' ? 26 : 32;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
      <span style={{ width: d, height: d, borderRadius: 9999, background: c.circ, display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: size === 'sm' ? 14 : 17, flexShrink: 0 }}>{c.icon}</span>
      <span style={{ fontSize: size === 'sm' ? 13 : 14, color: T.ink2, fontWeight: 500 }}>{c.el}</span>
    </span>
  );
}

// ── SeverityCounter ─────────────────────────────────────────
function SeverityCounter({ days, resolved, big }) {
  if (resolved) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#DCFCE7',
        color: '#15803D', borderRadius: 16, padding: big ? '12px 18px' : '8px 14px', fontWeight: 700 }}>
        <span style={{ fontSize: big ? 22 : 18 }}>✅</span>
        <span style={{ fontSize: big ? 17 : 14 }}>Καθαρίστηκε σε {resolved} ημέρες</span>
      </div>
    );
  }
  const s = sev(days);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: s.bg, color: s.fg,
      borderRadius: 16, padding: big ? '12px 18px' : '8px 14px' }}>
      <span style={{ fontSize: big ? 22 : 16 }}>⏱️</span>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{ fontSize: big ? 12 : 11, fontWeight: 600, opacity: 0.85 }}>Ανοιχτό εδώ και</span>
        <span style={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ fontSize: big ? 30 : 19 }}>{days}</span>
          <span style={{ fontSize: big ? 15 : 13, marginLeft: 4 }}>ημέρες</span>
        </span>
      </span>
    </div>
  );
}

// ── VoteButton (optimistic + bounce) ────────────────────────
function VoteButton({ kind, count, label, sub, onVote }) {
  const [voted, setVoted] = React.useState(false);
  const [n, setN] = React.useState(count);
  const [pop, setPop] = React.useState(false);
  const isStill = kind === 'stillthere';
  const accent = isStill ? '#DC2626' : T.primary;
  const accentBg = isStill ? '#FEE2E2' : T.primary50;
  const click = () => {
    setVoted(v => { const nv = !v; setN(count + (nv ? 1 : 0)); return nv; });
    setPop(true); setTimeout(() => setPop(false), 320);
    onVote && onVote();
  };
  return (
    <button onClick={click} style={{ flex: 1, background: voted ? accentBg : '#fff',
      border: `1.5px solid ${voted ? accent : T.line2}`, borderRadius: 18, padding: '12px 10px',
      cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      transition: 'background .15s, border-color .15s' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ fontSize: 19, display: 'inline-block', transform: pop ? 'scale(1.4)' : 'scale(1)',
          transition: 'transform .28s cubic-bezier(.3,1.6,.5,1)' }}>{isStill ? '🔴' : '👍'}</span>
        <span style={{ fontSize: 22, fontWeight: 800, color: accent, fontVariantNumeric: 'tabular-nums' }}>{n}</span>
      </span>
      <span style={{ fontSize: 12, fontWeight: 700, color: voted ? accent : T.ink }}>{label}</span>
      <span style={{ fontSize: 10.5, color: T.ink3, textAlign: 'center', lineHeight: 1.25 }}>{sub}</span>
    </button>
  );
}

// ── StatusTimeline ──────────────────────────────────────────
function StatusTimeline({ current }) {
  // 0 submitted, 1 forwarded, 2 cleaned
  const steps = [
    { label: 'Καταχωρήθηκε', date: '14 Αυγ' },
    { label: 'Προωθήθηκε στον δήμο', date: '15 Αυγ' },
    { label: 'Καθαρίστηκε', date: current >= 2 ? '26 Αυγ' : '—' },
  ];
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {steps.map((s, i) => {
        const done = i <= current, last = i === steps.length - 1;
        return (
          <li key={s.label} style={{ position: 'relative', display: 'flex', gap: 12, paddingBottom: last ? 0 : 22, marginLeft: 4 }}>
            {!last && <span style={{ position: 'absolute', left: 11, top: 24, bottom: 0, width: 2, background: done ? T.action : T.line2 }} />}
            <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: 12, border: '2px solid',
              background: done ? T.action : '#fff', borderColor: done ? T.action : T.line2,
              color: done ? '#fff' : T.ink3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{done ? '✓' : i + 1}</span>
            <span style={{ display: 'flex', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: done ? T.ink : T.ink3, paddingTop: 2 }}>{s.label}</span>
              <span style={{ fontSize: 12, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{s.date}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

// ── BadgeChip ───────────────────────────────────────────────
function BadgeChip({ icon, label, earned, progress }) {
  return (
    <div style={{ background: earned ? '#fff' : T.bg, border: `1px solid ${earned ? T.line2 : T.line}`,
      borderRadius: 16, padding: 12, textAlign: 'center', opacity: earned ? 1 : 0.7 }}>
      <div style={{ fontSize: 28, marginBottom: 6, filter: earned ? 'none' : 'grayscale(1)' }}>{icon}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginBottom: earned ? 0 : 6 }}>{label}</div>
      {!earned && progress != null && (
        <div style={{ height: 4, background: T.line2, borderRadius: 9999, overflow: 'hidden', marginTop: 4 }}>
          <div style={{ height: '100%', width: progress + '%', background: T.action }} />
        </div>
      )}
      {earned && <div style={{ fontSize: 10, color: T.action, fontWeight: 600 }}>✓ Ξεκλειδώθηκε</div>}
    </div>
  );
}

// ── ShockStat (counts up) ───────────────────────────────────
function ShockStat({ value, label, color = '#fff', size = 56 }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    let raf, start;
    const dur = 1400;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * e));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: size, fontWeight: 800, color, lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
        {n.toLocaleString('el-GR')}</div>
      <div style={{ fontSize: 13, color, opacity: 0.85, marginTop: 8, lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

// ── EmailFollow strip ───────────────────────────────────────
function EmailFollow() {
  const [on, setOn] = React.useState(false);
  return (
    <div style={{ background: T.primary50, borderRadius: 18, padding: 14 }}>
      {!on ? (
        <button onClick={() => setOn(true)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}>
          <span style={{ fontSize: 20 }}>🔔</span>
          <span style={{ flex: 1 }}>
            <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: T.primary }}>Λάβε ενημερώσεις</span>
            <span style={{ display: 'block', fontSize: 12, color: T.ink2 }}>Ειδοποίηση όταν αλλάξει η κατάσταση · προαιρετικό</span>
          </span>
          <span style={{ fontSize: 18, color: T.primary }}>›</span>
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="email σου (προαιρετικό)" style={{ flex: 1, border: `1px solid ${T.line2}`, borderRadius: 14,
            padding: '10px 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
          <button style={{ background: T.primary, color: '#fff', border: 'none', borderRadius: 14, padding: '0 16px',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>🔔</button>
        </div>
      )}
    </div>
  );
}

// ── Confetti burst ──────────────────────────────────────────
function Confetti({ run }) {
  const colors = ['#0D6FDB', '#39B24A', '#F59E0B', '#DC2626', '#15A34A', '#3387D7'];
  const bits = React.useMemo(() => Array.from({ length: 36 }, (_, i) => ({
    id: i, x: 50 + (Math.random() * 80 - 40), d: 200 + Math.random() * 360,
    rot: Math.random() * 720 - 360, delay: Math.random() * 0.25,
    c: colors[i % colors.length], s: 6 + Math.random() * 6, dx: Math.random() * 120 - 60,
  })), []);
  if (!run) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 20 }}>
      <style>{`@keyframes gc-fall{0%{transform:translate(0,-20px) rotate(0);opacity:1}100%{transform:translate(var(--dx),var(--d)) rotate(var(--r));opacity:0}}`}</style>
      {bits.map(b => (
        <span key={b.id} style={{ position: 'absolute', left: b.x + '%', top: 60, width: b.s, height: b.s * 0.5,
          background: b.c, borderRadius: 1, '--dx': b.dx + 'px', '--d': b.d + 'px', '--r': b.rot + 'deg',
          animation: `gc-fall ${1.1 + Math.random() * 0.6}s ${b.delay}s cubic-bezier(.2,.6,.4,1) forwards` }} />
      ))}
    </div>
  );
}

// ── Pixelated / anonymised photo ────────────────────────────
// Real placeholder photo with heavy-blur patches over plate/face zones + a tag.
function PixPhoto({ seed, height = 200, radius = 18, patches = [], tag = true }) {
  const url = `https://picsum.photos/seed/${seed}/720/520`;
  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: radius, overflow: 'hidden', background: T.line }}>
      <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      {patches.map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h,
          backdropFilter: 'blur(9px)', WebkitBackdropFilter: 'blur(9px)', borderRadius: 6,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.25)',
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,.10) 0 4px, rgba(255,255,255,.10) 4px 8px)' }} />
      ))}
      {tag && (
        <span style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.6)', color: '#fff',
          fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 9999, backdropFilter: 'blur(4px)' }}>🔒 ανωνυμοποιημένο</span>
      )}
    </div>
  );
}

// ── ShareSheet (bottom sheet) ───────────────────────────────
function ShareSheet({ open, onClose }) {
  const [done, setDone] = React.useState(null);
  const items = [
    { k: 'WhatsApp', icon: '💬', bg: '#25D366' },
    { k: 'Viber', icon: '📞', bg: '#7360F2' },
    { k: 'Facebook', icon: 'f', bg: '#1877F2' },
    { k: 'X', icon: '𝕏', bg: '#000' },
    { k: 'LinkedIn', icon: 'in', bg: '#0A66C2' },
    { k: 'Αντιγραφή', icon: '🔗', bg: '#6B7280' },
  ];
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', background: '#fff', borderRadius: '24px 24px 0 0', padding: '14px 18px 28px' }}>
        <div style={{ width: 40, height: 4, background: T.line2, borderRadius: 9999, margin: '0 auto 16px' }} />
        <p style={{ margin: '0 0 16px', fontWeight: 700, color: T.ink, fontSize: 16, textAlign: 'center' }}>Κοινοποίησε για να μην αγνοηθεί</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {items.map(it => (
            <button key={it.k} onClick={() => { setDone(it.k); setTimeout(() => { setDone(null); onClose(); }, 700); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 52, height: 52, borderRadius: 16, background: it.bg, color: '#fff', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700 }}>{it.icon}</span>
              <span style={{ fontSize: 11, color: T.ink2, fontWeight: 500 }}>{it.k}</span>
            </button>
          ))}
        </div>
        {done && <p style={{ textAlign: 'center', color: T.action, fontWeight: 600, fontSize: 14, margin: '16px 0 0' }}>κοινοποιήθηκε ✓</p>}
      </div>
    </div>
  );
}

Object.assign(window, { T, sev, SEV_STOPS, CAT, StatusBar, BottomTab, PhoneFrame, Btn, Card, CatBadge,
  SeverityCounter, VoteButton, StatusTimeline, BadgeChip, ShockStat, EmailFollow, Confetti, PixPhoto, ShareSheet });
