/* GreeceClean · Screen 1 — Report Detail / Tracking (/r/<token>) */

function TopBar({ title }) {
  const { T } = window;
  return (
    <div style={{ background: T.primary, color: '#fff', display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 16px', flexShrink: 0 }}>
      <span style={{ fontSize: 22, lineHeight: 1 }}>‹</span>
      <span style={{ fontSize: 17, fontWeight: 700, flex: 1 }}>{title}</span>
      <span style={{ fontSize: 18 }}>⤴</span>
    </div>
  );
}

function NearbyCard({ id, days, muni }) {
  const { T, sev, CAT } = window;
  const s = sev(days), c = CAT[id];
  return (
    <div style={{ flex: 1, background: '#fff', border: `1px solid ${T.line}`, borderRadius: 16, padding: 10,
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ width: 26, height: 26, borderRadius: 9999, background: c.circ, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{c.icon}</span>
        <span style={{ background: s.bg, color: s.fg, fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 9999 }}>{days}η</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: T.ink, lineHeight: 1.2 }}>{c.el}</div>
      <div style={{ fontSize: 11, color: T.ink3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{muni}</div>
    </div>
  );
}

function TrackingOpen() {
  const { T, SeverityCounter, CatBadge, VoteButton, StatusTimeline, EmailFollow, Btn, ShareSheet, PixPhoto } = window;
  const [share, setShare] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  return (
    <window.PhoneFrame height={928}>
      <window.StatusBar />
      <TopBar title="Κατάσταση Αναφοράς" />
      <div style={{ flex: 1, overflow: 'hidden', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <PixPhoto seed="gc10" height={188} patches={[{ x: '60%', y: '54%', w: 84, h: 34 }]} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SeverityCounter days={47} big />
          <div style={{ textAlign: 'right' }}>
            <CatBadge id="illegal_dump" size="sm" />
            <div style={{ fontSize: 12, color: T.ink3, marginTop: 4 }}>Δήμος Θεσσαλονίκης</div>
          </div>
        </div>

        <window.Card style={{ padding: 14 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <VoteButton kind="important" count={13} label="Σημαντικό" sub="προτεραιότητα" />
            <VoteButton kind="stillthere" count={5} label="Είναι ακόμα εδώ" sub="επιβεβαίωση" />
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: T.ink2, margin: '12px 0 0' }}>
            <b style={{ color: T.primary }}>14 άνθρωποι</b> θέλουν να καθαριστεί αυτό</p>
        </window.Card>

        <window.Card style={{ padding: 16 }}>
          <p style={{ margin: '0 0 14px', fontWeight: 700, color: T.primary, fontSize: 14 }}>Πορεία</p>
          <StatusTimeline current={1} />
        </window.Card>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setConfirmed(true)} style={{ flex: 1, background: confirmed ? '#DCFCE7' : '#fff',
            border: `1.5px solid ${confirmed ? T.action : T.line2}`, borderRadius: 18, padding: '12px', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: confirmed ? '#15803D' : T.ink2 }}>
            {confirmed ? '✓ Ευχαριστούμε!' : '✅ Φαίνεται καθαρό'}</button>
          <Btn kind="action" onClick={() => setShare(true)} style={{ flex: 1, borderRadius: 18, fontSize: 14 }}>📣 Κοινοποίησε</Btn>
        </div>

        <EmailFollow />

        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: T.ink, margin: '2px 0 8px' }}>Κοντά σου · 2 ακόμη ανοιχτές</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <NearbyCard id="roadside_litter" days={12} muni="Δ. Καλαμαριάς" />
            <NearbyCard id="coastal_pollution" days={68} muni="Δ. Θέρμης" />
          </div>
        </div>
      </div>
      <ShareSheet open={share} onClose={() => setShare(false)} />
    </window.PhoneFrame>
  );
}

function TrackingResolved() {
  const { T, SeverityCounter, CatBadge, StatusTimeline, Btn, ShareSheet, Confetti, PixPhoto } = window;
  const [share, setShare] = React.useState(false);
  const [celebrate, setCelebrate] = React.useState(true);
  React.useEffect(() => { const t = setTimeout(() => setCelebrate(false), 2600); return () => clearTimeout(t); }, []);
  return (
    <window.PhoneFrame height={850}>
      <window.StatusBar />
      <TopBar title="Κατάσταση Αναφοράς" />
      <div style={{ flex: 1, overflow: 'hidden', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 2 }}>🎉</div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#15803D' }}>Καθαρίστηκε!</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SeverityCounter resolved={12} big />
        </div>

        {/* Before / after */}
        <div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.ink3, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Πριν</div>
              <PixPhoto seed="gc10" height={150} radius={14} tag={false} patches={[{ x: '58%', y: '50%', w: 60, h: 26 }]} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#15803D', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Μετά ✅</div>
              <PixPhoto seed="gc-clean-meadow" height={150} radius={14} tag={false} patches={[]} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CatBadge id="illegal_dump" size="sm" />
          <span style={{ fontSize: 12, color: T.ink3 }}>Δήμος Θεσσαλονίκης</span>
        </div>

        <window.Card style={{ padding: 16 }}>
          <p style={{ margin: '0 0 14px', fontWeight: 700, color: T.primary, fontSize: 14 }}>Πορεία</p>
          <StatusTimeline current={2} />
        </window.Card>

        <window.Card style={{ padding: 14, background: '#EAF7EC', border: 'none' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#2E7D34', lineHeight: 1.5, textAlign: 'center' }}>
            Αυτό το πέτυχαν <b>14 άνθρωποι</b> μαζί. Μοιράσου το αποτέλεσμα.</p>
        </window.Card>

        <Btn kind="action" full onClick={() => setShare(true)} style={{ borderRadius: 18 }}>🎉 Μοιράσου τη νίκη</Btn>

        <Confetti run={celebrate} />
      </div>
      <ShareSheet open={share} onClose={() => setShare(false)} />
    </window.PhoneFrame>
  );
}

Object.assign(window, { TrackingOpen, TrackingResolved });
