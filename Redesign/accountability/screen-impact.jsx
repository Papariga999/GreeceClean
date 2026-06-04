/* Katharos · Screen 7 — "Ο αντίκτυπός μου" (My Impact) + empty state */

function ImpactScreen() {
  const { T, BadgeChip } = window;
  const mine = [
    { id: 'illegal_dump', status: 'Καθαρίστηκε', days: null, c: T.action, bg: '#DCFCE7' },
    { id: 'roadside_litter', status: 'Προωθήθηκε', days: 12, c: '#6B21A8', bg: '#F3E8FF' },
    { id: 'coastal_pollution', status: 'Υπό εξέταση', days: 4, c: '#1E40AF', bg: '#DBEAFE' },
  ];
  return (
    <window.PhoneFrame height={728} contentBg={T.bg}>
      <window.StatusBar />
      <div style={{ flex: 1, overflow: 'hidden', padding: '6px 16px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h1 style={{ margin: '2px 0 0', fontSize: 24, fontWeight: 800, color: T.primary }}>🛡️ Ο αντίκτυπός μου</h1>

        {/* summary */}
        <div style={{ background: 'linear-gradient(140deg, #6B7C3A, #495427)', borderRadius: 20, padding: '18px 16px', color: '#fff', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          {[['7', 'αναφορές'], ['3', 'καθαρίστηκαν'], ['120', 'επιβεβαιώσεις']].map(([v, l]) => (
            <div key={l}><div style={{ fontSize: 30, fontWeight: 800, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{v}</div><div style={{ fontSize: 11, opacity: 0.9, marginTop: 5 }}>{l}</div></div>
          ))}
        </div>

        {/* badges */}
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: T.ink }}>Διακρίσεις</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            <BadgeChip icon="🥇" label="Πρώτη αναφορά" earned />
            <BadgeChip icon="🛡️" label="Φύλακας Πόλης" earned />
            <BadgeChip icon="🧹" label="Καθαριστής" progress={60} />
            <BadgeChip icon="📣" label="Ακτιβιστής" progress={30} />
          </div>
        </div>

        {/* league */}
        <div style={{ background: T.primary50, borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 26 }}>🏘️</span>
          <span style={{ flex: 1 }}>
            <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: T.primary }}>Η γειτονιά σου: #4</span>
            <span style={{ display: 'block', fontSize: 12, color: T.ink2 }}>Καλαμαριά · 38 ενεργοί πολίτες</span>
          </span>
        </div>

        {/* my reports */}
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: T.ink }}>Οι αναφορές μου</p>
          <window.Card style={{ padding: '4px 14px' }}>
            {mine.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', borderBottom: i < mine.length - 1 ? `1px solid ${T.line}` : 'none' }}>
                <window.CatBadge id={r.id} size="sm" />
                <span style={{ flex: 1 }} />
                <span style={{ background: r.bg, color: r.c, fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 9999 }}>{r.status}</span>
              </div>
            ))}
          </window.Card>
        </div>
      </div>
      <window.BottomTab active="impact" />
    </window.PhoneFrame>
  );
}

function ImpactEmpty() {
  const { T, Btn } = window;
  return (
    <window.PhoneFrame height={904} contentBg={T.bg}>
      <window.StatusBar />
      <div style={{ flex: 1, overflow: 'hidden', padding: '6px 16px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ margin: '2px 0 0', fontSize: 24, fontWeight: 800, color: T.primary }}>🛡️ Ο αντίκτυπός μου</h1>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 12px' }}>
          <div style={{ fontSize: 64, marginBottom: 14 }}>🌱</div>
          <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 800, color: T.ink }}>Η πρώτη σου αναφορά αλλάζει κάτι</h2>
          <p style={{ margin: '0 0 24px', fontSize: 14, color: T.ink2, lineHeight: 1.55, maxWidth: 280 }}>
            Δεν χρειάζεται λογαριασμός. Φωτογράφισε ένα πρόβλημα και ξεκίνα να χτίζεις τον αντίκτυπό σου — ανώνυμα.</p>
          <Btn kind="action" style={{ borderRadius: 22, padding: '14px 28px' }}>📷 Κάνε την πρώτη αναφορά</Btn>
        </div>
      </div>
      <window.BottomTab active="impact" />
    </window.PhoneFrame>
  );
}

Object.assign(window, { ImpactScreen, ImpactEmpty });
