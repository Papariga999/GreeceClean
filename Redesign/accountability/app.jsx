/* Katharos · Accountability redesign — design canvas composition */
const { DesignCanvas, DCSection, DCArtboard } = window;

function Spec({ children, pad = 18, bg = '#fff' }) {
  return <div style={{ width: '100%', height: '100%', background: bg, padding: pad, boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column' }}>{children}</div>;
}
const SpecTitle = ({ children }) => <div style={{ fontSize: 13, fontWeight: 800, color: window.T.primary, marginBottom: 12 }}>{children}</div>;

function SevScaleSpec() {
  const { T, SEV_STOPS, SeverityCounter } = window;
  const ranges = ['< 7 ημ.', '7–30 ημ.', '30–60 ημ.', '> 60 ημ.'];
  return (
    <Spec>
      <SpecTitle>Severity scale · κλίμακα δριμύτητας</SpecTitle>
      <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
        {SEV_STOPS.map((s, i) => (
          <div key={s.key} style={{ flex: 1, background: s.fg, color: '#fff', padding: '10px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800 }}>{s.el}</div>
            <div style={{ fontSize: 9.5, opacity: 0.9, marginTop: 2 }}>{ranges[i]}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <SeverityCounter days={3} /><SeverityCounter days={47} /><SeverityCounter days={84} /><SeverityCounter resolved={12} />
      </div>
    </Spec>
  );
}

function VoteSpec() {
  const { T, VoteButton } = window;
  return (
    <Spec>
      <SpecTitle>VoteButton · ψήφος (optimistic + bounce)</SpecTitle>
      <div style={{ display: 'flex', gap: 10 }}>
        <VoteButton kind="important" count={13} label="Σημαντικό" sub="προτεραιότητα" />
        <VoteButton kind="stillthere" count={5} label="Είναι ακόμα εδώ" sub="επιβεβαίωση" />
      </div>
      <p style={{ textAlign: 'center', fontSize: 12, color: T.ink2, margin: '12px 0 0' }}>πάτησε — μετράει αμέσως · <b style={{ color: T.primary }}>14 θέλουν να καθαριστεί</b></p>
    </Spec>
  );
}

function TimelineSpec() {
  const { T, StatusTimeline } = window;
  return <Spec><SpecTitle>StatusTimeline</SpecTitle><StatusTimeline current={1} /></Spec>;
}

function BadgeSpec() {
  const { BadgeChip } = window;
  return (
    <Spec>
      <SpecTitle>BadgeChips · διακρίσεις</SpecTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <BadgeChip icon="🥇" label="Πρώτη αναφορά" earned />
        <BadgeChip icon="🛡️" label="Φύλακας" earned />
        <BadgeChip icon="🧹" label="Καθαριστής" progress={60} />
      </div>
    </Spec>
  );
}

function ShockSpec() {
  const { ShockStat } = window;
  return <Spec bg="#005A80"><div style={{ margin: 'auto' }}><ShockStat value={4812} label="ημέρες αγνοημένων αναφορών" size={46} /></div></Spec>;
}

function NavSpec() {
  const { T, BottomTab } = window;
  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ padding: 16, fontSize: 13, fontWeight: 800, color: T.primary }}>Bottom-Tab · πλοήγηση</div>
      <div style={{ flex: 1 }} />
      <BottomTab active="map" />
    </div>
  );
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="sys" title="Σύστημα · Severity & νέα στοιχεία" subtitle="The new accountability component layer">
        <DCArtboard id="sev" label="Severity scale" width={340} height={210}><SevScaleSpec /></DCArtboard>
        <DCArtboard id="vote" label="VoteButton" width={300} height={210}><VoteSpec /></DCArtboard>
        <DCArtboard id="time" label="StatusTimeline" width={280} height={210}><TimelineSpec /></DCArtboard>
        <DCArtboard id="badge" label="BadgeChips" width={300} height={170}><BadgeSpec /></DCArtboard>
        <DCArtboard id="shock" label="ShockStat" width={280} height={170}><ShockSpec /></DCArtboard>
        <DCArtboard id="nav" label="Bottom-Tab" width={375} height={200}><NavSpec /></DCArtboard>
      </DCSection>

      <DCSection id="s1" title="1 · Αναφορά / Tracking" subtitle="Highest priority — shared links land here; pressure is built here">
        <DCArtboard id="open" label="Ανοιχτή αναφορά" width={375} height={928}><window.TrackingOpen /></DCArtboard>
        <DCArtboard id="resolved" label="Καθαρίστηκε 🎉" width={375} height={850}><window.TrackingResolved /></DCArtboard>
      </DCSection>

      <DCSection id="s8" title="8 · ShareCards (OG)" subtitle="Shareable share images — the growth & pressure artefacts">
        <DCArtboard id="sc-new" label="Νέα αναφορά" width={600} height={340}><window.ShareCard variant="new" /></DCArtboard>
        <DCArtboard id="sc-ign" label="Αγνοείται (πίεση)" width={600} height={340}><window.ShareCard variant="ignored" /></DCArtboard>
        <DCArtboard id="sc-res" label="Καθαρίστηκε (γιορτή)" width={600} height={340}><window.ShareCard variant="resolved" /></DCArtboard>
      </DCSection>

      <DCSection id="s2" title="2 · Χάρτης" subtitle="The emotional home — severity pins, filters, empty-state pull">
        <DCArtboard id="map" label="Κανονικός" width={375} height={812}><window.MapNormal /></DCArtboard>
        <DCArtboard id="map-empty" label="Empty state" width={375} height={812}><window.MapEmpty /></DCArtboard>
      </DCSection>

      <DCSection id="s3" title="3 · Τα πιο επείγοντα" subtitle="Vote-ranked urgency list, shareable rows">
        <DCArtboard id="top10" label="Top-10" width={375} height={812}><window.Top10 /></DCArtboard>
        <DCArtboard id="top10-load" label="Loading skeleton" width={375} height={812}><window.Top10Loading /></DCArtboard>
      </DCSection>

      <DCSection id="s4" title="4 · Επιτυχία μετά την αναφορά" subtitle="The growth moment — ShareCard + follow + nearby pull">
        <DCArtboard id="success" label="Success" width={375} height={820}><window.SuccessScreen /></DCArtboard>
      </DCSection>

      <DCSection id="s5" title="5 · Αρχική" subtitle="ShockStat hero + before/after + leaderboards">
        <DCArtboard id="landing" label="Landing" width={375} height={1320}><window.LandingScreen /></DCArtboard>
      </DCSection>

      <DCSection id="s6" title="6 · Καρτέλα Δήμου" subtitle="Per-municipality scorecard — designed as a pressure asset">
        <DCArtboard id="score" label="Scorecard" width={375} height={690}><window.ScorecardScreen /></DCArtboard>
      </DCSection>

      <DCSection id="s7" title="7 · Ο αντίκτυπός μου" subtitle="Stickiness — personal stats, badges, neighbourhood league">
        <DCArtboard id="impact" label="Με δεδομένα" width={375} height={728}><window.ImpactScreen /></DCArtboard>
        <DCArtboard id="impact-empty" label="Empty state" width={375} height={904}><window.ImpactEmpty /></DCArtboard>
      </DCSection>

      <DCSection id="flow" title="Ροή χρήστη" subtitle="The viral accountability loop">
        <DCArtboard id="loop" label="User flow" width={960} height={560}><window.FlowDiagram /></DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
