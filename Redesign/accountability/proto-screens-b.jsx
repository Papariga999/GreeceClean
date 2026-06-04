/* Katharos · Clickable prototype — detail / flow bodies */

/* ───────── TRACKING (open) ───────── */
function TrackingBody({ nav, days = 47 }) {
  const { T, SeverityCounter, CatBadge, VoteButton, StatusTimeline, EmailFollow, Btn, ShareSheet, PixPhoto } = window;
  const [share, setShare] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Status dark /><BackBar title="Κατάσταση Αναφοράς" onBack={nav.back} share />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14, background: T.bg }}>
        <PixPhoto seed="gc10" height={188} patches={[{ x: '60%', y: '54%', w: 84, h: 34 }]} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SeverityCounter days={days} big />
          <div onClick={() => nav.push({ name: 'scorecard' })} style={{ textAlign: 'right', cursor: 'pointer' }}>
            <CatBadge id="illegal_dump" size="sm" />
            <div style={{ fontSize: 12, color: T.primary, marginTop: 4, fontWeight: 600 }}>Δήμος Θεσσαλονίκης ›</div>
          </div>
        </div>
        <window.Card style={{ padding: 14 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <VoteButton kind="important" count={13} label="Σημαντικό" sub="προτεραιότητα" />
            <VoteButton kind="stillthere" count={5} label="Είναι ακόμα εδώ" sub="επιβεβαίωση" />
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: T.ink2, margin: '12px 0 0' }}><b style={{ color: T.primary }}>14 άνθρωποι</b> θέλουν να καθαριστεί αυτό</p>
        </window.Card>
        <window.Card style={{ padding: 16 }}>
          <p style={{ margin: '0 0 14px', fontWeight: 700, color: T.primary, fontSize: 14 }}>Πορεία</p>
          <StatusTimeline current={1} />
        </window.Card>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setConfirmed(true)} style={{ flex: 1, background: confirmed ? '#DCFCE7' : '#fff', border: `1.5px solid ${confirmed ? T.action : T.line2}`, borderRadius: 18, padding: '12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: confirmed ? '#15803D' : T.ink2 }}>{confirmed ? '✓ Ευχαριστούμε!' : '✅ Φαίνεται καθαρό'}</button>
          <Btn kind="action" onClick={() => setShare(true)} style={{ flex: 1, borderRadius: 18, fontSize: 14 }}>📣 Κοινοποίησε</Btn>
        </div>
        <EmailFollow />
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: T.ink, margin: '2px 0 8px' }}>Κοντά σου · 2 ακόμη ανοιχτές</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['roadside_litter', 12, 'Δ. Καλαμαριάς'], ['coastal_pollution', 68, 'Δ. Θέρμης']].map(([id, d, m]) => {
              const s = window.sev(d), c = window.CAT[id];
              return (
                <div key={m} onClick={() => nav.push({ name: 'tracking', days: d })} style={{ flex: 1, background: '#fff', border: `1px solid ${T.line}`, borderRadius: 16, padding: 10, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 9999, background: c.circ, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{c.icon}</span>
                    <span style={{ background: s.bg, color: s.fg, fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 9999 }}>{d}η</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{c.el}</div>
                  <div style={{ fontSize: 11, color: T.ink3 }}>{m}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ShareSheet open={share} onClose={() => setShare(false)} />
    </div>
  );
}

/* ───────── TRACKING (resolved) ───────── */
function ResolvedBody({ nav }) {
  const { T, SeverityCounter, CatBadge, StatusTimeline, Btn, ShareSheet, Confetti, PixPhoto } = window;
  const [share, setShare] = React.useState(false);
  const [celebrate, setCelebrate] = React.useState(true);
  React.useEffect(() => { const t = setTimeout(() => setCelebrate(false), 2600); return () => clearTimeout(t); }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Status dark /><BackBar title="Κατάσταση Αναφοράς" onBack={nav.back} share />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', background: T.bg }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontSize: 44, marginBottom: 2 }}>🎉</div><h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#15803D' }}>Καθαρίστηκε!</h2></div>
        <div style={{ display: 'flex', justifyContent: 'center' }}><SeverityCounter resolved={12} big /></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}><div style={{ fontSize: 11, fontWeight: 700, color: T.ink3, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Πριν</div><PixPhoto seed="gc10" height={150} radius={14} tag={false} patches={[{ x: '58%', y: '50%', w: 60, h: 26 }]} /></div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 11, fontWeight: 700, color: '#15803D', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Μετά ✅</div><PixPhoto seed="gc-clean-meadow" height={150} radius={14} tag={false} patches={[]} /></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><CatBadge id="illegal_dump" size="sm" /><span style={{ fontSize: 12, color: T.ink3 }}>Δήμος Θεσσαλονίκης</span></div>
        <window.Card style={{ padding: 16 }}><p style={{ margin: '0 0 14px', fontWeight: 700, color: T.primary, fontSize: 14 }}>Πορεία</p><StatusTimeline current={2} /></window.Card>
        <window.Card style={{ padding: 14, background: '#EAF7EC', border: 'none' }}><p style={{ margin: 0, fontSize: 13, color: '#495427', lineHeight: 1.5, textAlign: 'center' }}>Αυτό το πέτυχαν <b>14 άνθρωποι</b> μαζί. Μοιράσου το αποτέλεσμα.</p></window.Card>
        <Btn kind="action" full onClick={() => setShare(true)} style={{ borderRadius: 18 }}>🎉 Μοιράσου τη νίκη</Btn>
        <Confetti run={celebrate} />
      </div>
      <ShareSheet open={share} onClose={() => setShare(false)} />
    </div>
  );
}

/* ───────── SCORECARD ───────── */
function ScorecardBody({ nav }) {
  const { T, Btn } = window;
  const bars = [40, 55, 48, 62, 58, 71, 64, 78];
  const Box = ({ v, l, c }) => <div style={{ flex: 1, background: '#fff', border: `1px solid ${T.line}`, borderRadius: 14, padding: '12px 8px', textAlign: 'center' }}><div style={{ fontSize: 22, fontWeight: 800, color: c || T.ink, lineHeight: 1 }}>{v}</div><div style={{ fontSize: 10.5, color: T.ink3, marginTop: 5, lineHeight: 1.2 }}>{l}</div></div>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Status dark /><BackBar title="Καρτέλα Δήμου" onBack={nav.back} share />
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14, background: T.bg }}>
        <div style={{ background: 'linear-gradient(140deg, #006994, #005A80)', borderRadius: 20, padding: 18, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><div style={{ fontSize: 13, opacity: 0.85 }}>🏛️ Δήμος</div><div style={{ fontSize: 22, fontWeight: 800 }}>Θεσσαλονίκης</div><div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>Κεντρική Μακεδονία</div></div>
          <div style={{ textAlign: 'center', background: 'rgba(234,88,12,0.25)', borderRadius: 16, padding: '10px 14px' }}><div style={{ fontSize: 11, color: '#FED7AA', fontWeight: 600 }}>Κατάταξη</div><div style={{ fontSize: 28, fontWeight: 800 }}>#38</div><div style={{ fontSize: 10, color: '#FED7AA' }}>από 47</div></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}><Box v="54%" l="Λύθηκαν" c={T.action} /><Box v="31η" l="⌀ αντίδραση" c="#EA580C" /><Box v="23" l="Ανοιχτές" c="#DC2626" /><Box v="27" l="Καθαρίστηκαν" c={T.action} /></div>
        <window.Card style={{ padding: 16 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 700, color: T.ink, fontSize: 14 }}>Ποσοστό λύσης ανά μήνα</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 90 }}>
            {bars.map((b, i) => <div key={i} style={{ flex: 1, height: b + '%', background: i === bars.length - 1 ? T.action : '#8BBDCD', borderRadius: '4px 4px 0 0', opacity: i === bars.length - 1 ? 1 : 0.55 }} />)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 9, color: T.ink3 }}>{['Οκτ', 'Νοε', 'Δεκ', 'Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μάι'].map(m => <span key={m}>{m}</span>)}</div>
        </window.Card>
        <window.Card style={{ padding: 14, background: '#FFF7ED', border: 'none' }}><p style={{ margin: 0, fontSize: 13, color: '#9A3412', lineHeight: 1.5 }}><b>23 αναφορές</b> περιμένουν δράση — οι 6 είναι ανοιχτές πάνω από 60 ημέρες.</p></window.Card>
        <Btn kind="primary" full style={{ borderRadius: 18 }}>⤴ Κοινοποίησε την καρτέλα</Btn>
      </div>
    </div>
  );
}

/* ───────── IMPACT ───────── */
function ImpactBody({ nav }) {
  const { T, BadgeChip } = window;
  const mine = [
    { id: 'illegal_dump', status: 'Καθαρίστηκε', c: T.action, bg: '#DCFCE7', go: 'resolved' },
    { id: 'roadside_litter', status: 'Προωθήθηκε', c: '#6B21A8', bg: '#F3E8FF', go: 'tracking' },
    { id: 'coastal_pollution', status: 'Υπό εξέταση', c: '#1E40AF', bg: '#DBEAFE', go: 'tracking' },
  ];
  return (
    <div>
      <Status />
      <div style={{ padding: '6px 16px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <h1 style={{ margin: '2px 0 0', fontSize: 24, fontWeight: 800, color: T.primary }}>🛡️ Ο αντίκτυπός μου</h1>
          <div onClick={() => nav.home()} title="Αρχική" style={{ width: 38, height: 38, borderRadius: 12, background: T.primary50, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><window.BrandMark size={20} /></div>
        </div>
        <div style={{ background: 'linear-gradient(140deg, #6B7C3A, #495427)', borderRadius: 20, padding: '18px 16px', color: '#fff', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          {[['7', 'αναφορές'], ['3', 'καθαρίστηκαν'], ['120', 'επιβεβαιώσεις']].map(([v, l]) => <div key={l}><div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{v}</div><div style={{ fontSize: 11, opacity: 0.9, marginTop: 5 }}>{l}</div></div>)}
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: T.ink }}>Διακρίσεις</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            <BadgeChip icon="🥇" label="Πρώτη αναφορά" earned /><BadgeChip icon="🛡️" label="Φύλακας Πόλης" earned /><BadgeChip icon="🧹" label="Καθαριστής" progress={60} /><BadgeChip icon="📣" label="Ακτιβιστής" progress={30} />
          </div>
        </div>
        <div style={{ background: T.primary50, borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 26 }}>🏘️</span><span style={{ flex: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: T.primary }}>Η γειτονιά σου: #4</span><span style={{ display: 'block', fontSize: 12, color: T.ink2 }}>Καλαμαριά · 38 ενεργοί πολίτες</span></span>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: T.ink }}>Οι αναφορές μου</p>
          <window.Card style={{ padding: '4px 14px' }}>
            {mine.map((r, i) => (
              <div key={i} onClick={() => nav.push({ name: r.go, days: 12 })} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', borderBottom: i < mine.length - 1 ? `1px solid ${T.line}` : 'none', cursor: 'pointer' }}>
                <window.CatBadge id={r.id} size="sm" /><span style={{ flex: 1 }} /><span style={{ background: r.bg, color: r.c, fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 9999 }}>{r.status}</span><span style={{ color: T.ink3 }}>›</span>
              </div>
            ))}
          </window.Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TrackingBody, ResolvedBody, ScorecardBody, ImpactBody });
