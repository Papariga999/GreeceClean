/* GreeceClean · Screen 3 — Top-10 "Τα πιο επείγοντα" + loading skeleton */

function TabBar() {
  const { T } = window;
  const tabs = ['Κοντά μου', 'Ο δήμος μου', 'Πανελλαδικά'];
  return (
    <div style={{ display: 'flex', gap: 6, padding: '0 16px 12px' }}>
      {tabs.map((t, i) => (
        <span key={t} style={{ flex: 1, textAlign: 'center', fontSize: 12.5, fontWeight: 700, padding: '8px 4px', borderRadius: 9999,
          background: i === 0 ? T.primary : '#fff', color: i === 0 ? '#fff' : T.ink2, border: `1px solid ${i === 0 ? T.primary : T.line2}` }}>{t}</span>
      ))}
    </div>
  );
}

function UrgentRow({ rank, id, days, votes, muni }) {
  const { T, sev, CAT } = window;
  const s = sev(days), c = CAT[id];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0', borderBottom: `1px solid ${T.line}` }}>
      <span style={{ fontSize: 17, fontWeight: 800, color: rank <= 3 ? T.primary : T.ink3, width: 22, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{rank}</span>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <window.PixPhoto seed={'gc' + (10 * rank)} height={52} radius={11} tag={false} patches={[]} />
        <span style={{ position: 'absolute', top: -5, right: -5, width: 11, height: 11, borderRadius: 9999, background: s.fg, border: '2px solid #fff' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span>{c.icon}</span><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.el}</span></div>
        <div style={{ fontSize: 11.5, color: T.ink3, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{muni}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.primary }}>👍 {votes}</span>
          <span style={{ background: s.bg, color: s.fg, fontSize: 10, fontWeight: 800, padding: '1px 7px', borderRadius: 9999 }}>⏱️ {days}η</span>
        </div>
      </div>
      <span style={{ fontSize: 17, color: T.ink3 }}>⤴</span>
    </div>
  );
}

function Top10() {
  const { T } = window;
  const rows = [
    { id: 'sewage', days: 84, votes: 41, muni: 'Δήμος Ηρακλείου' },
    { id: 'illegal_dump', days: 72, votes: 38, muni: 'Δήμος Θεσσαλονίκης' },
    { id: 'coastal_pollution', days: 61, votes: 29, muni: 'Δήμος Ρόδου' },
    { id: 'illegal_dump', days: 47, votes: 24, muni: 'Δήμος Βόλου' },
    { id: 'construction_debris', days: 38, votes: 19, muni: 'Δήμος Καλαμαριάς' },
    { id: 'abandoned_vehicle', days: 26, votes: 14, muni: 'Δήμος Χαλανδρίου' },
    { id: 'roadside_litter', days: 12, votes: 9, muni: 'Δήμος Θέρμης' },
  ];
  return (
    <window.PhoneFrame height={812}>
      <window.StatusBar />
      <div style={{ padding: '6px 16px 14px', flexShrink: 0 }}>
        <h1 style={{ margin: '0 0 2px', fontSize: 24, fontWeight: 800, color: T.primary }}>🔥 Τα πιο επείγοντα</h1>
        <p style={{ margin: 0, fontSize: 13, color: T.ink2 }}>Ψηφισμένα από πολίτες · ανοιχτά εδώ και καιρό</p>
      </div>
      <TabBar />
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 16px' }}>
        {rows.map((r, i) => <UrgentRow key={i} rank={i + 1} {...r} />)}
      </div>
      <window.BottomTab active="top" />
    </window.PhoneFrame>
  );
}

function Top10Loading() {
  const { T } = window;
  const Sk = ({ w, h, r = 6, style }) => <div style={{ width: w, height: h, borderRadius: r, background: T.line2, ...style }} />;
  return (
    <window.PhoneFrame height={812}>
      <style>{`@keyframes gc-pulse{0%,100%{opacity:.5}50%{opacity:1}}`}</style>
      <window.StatusBar />
      <div style={{ padding: '6px 16px 14px', flexShrink: 0 }}>
        <h1 style={{ margin: '0 0 2px', fontSize: 24, fontWeight: 800, color: T.primary }}>🔥 Τα πιο επείγοντα</h1>
        <p style={{ margin: 0, fontSize: 13, color: T.ink2 }}>Ψηφισμένα από πολίτες · ανοιχτά εδώ και καιρό</p>
      </div>
      <TabBar />
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 16px', animation: 'gc-pulse 1.4s ease-in-out infinite' }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderBottom: `1px solid ${T.line}` }}>
            <Sk w={16} h={18} />
            <Sk w={52} h={52} r={11} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
              <Sk w="70%" h={12} />
              <Sk w="45%" h={10} />
              <Sk w="35%" h={10} />
            </div>
          </div>
        ))}
      </div>
      <window.BottomTab active="top" />
    </window.PhoneFrame>
  );
}

Object.assign(window, { Top10, Top10Loading });
