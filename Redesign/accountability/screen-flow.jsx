/* Katharos · User-flow diagram — the viral accountability loop */

function FlowNode({ x, y, w, h, icon, title, sub, tone }) {
  const { T } = window;
  const tones = {
    entry: { bg: '#E6EFF3', bd: '#8BBDCD', fg: T.primary },
    core: { bg: T.primary, bd: T.primary, fg: '#fff' },
    action: { bg: '#fff', bd: T.line2, fg: T.ink },
    loop: { bg: '#EAF7EC', bd: '#A4B16E', fg: '#495427' },
    pressure: { bg: '#FEE2E2', bd: '#FCA5A5', fg: '#B91C1C' },
  };
  const t = tones[tone] || tones.action;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: t.bg, border: `1.5px solid ${t.bd}`,
      borderRadius: 16, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: t.fg, lineHeight: 1.15 }}>{title}</span>
      </div>
      {sub && <div style={{ fontSize: 11.5, color: tone === 'core' ? 'rgba(255,255,255,0.85)' : T.ink2, marginTop: 5, lineHeight: 1.3 }}>{sub}</div>}
    </div>
  );
}

function FlowDiagram() {
  const { T } = window;
  const W = 960, H = 560;
  const A = '#94A3B8';
  return (
    <div style={{ width: W, height: H, background: '#fff', position: 'relative', fontFamily: "'Inter', sans-serif", padding: 0 }}>
      <div style={{ position: 'absolute', top: 26, left: 32 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: T.primary }}>Ροή χρήστη · ο ιξός βρόχος</div>
        <div style={{ fontSize: 13, color: T.ink2, marginTop: 2 }}>Κοινοποιημένος σύνδεσμος → Αναφορά → Ψήφος / Κοινοποίηση / Παρακολούθηση → Επιστροφή</div>
      </div>

      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill={A} /></marker>
          <marker id="ahg" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#6B7C3A" /></marker>
        </defs>
        {/* A->B */}
        <path d="M212,300 L268,300" fill="none" stroke={A} strokeWidth="2" markerEnd="url(#ah)" />
        {/* B-> actions */}
        <path d="M470,275 C510,230 510,180 548,150" fill="none" stroke={A} strokeWidth="2" markerEnd="url(#ah)" />
        <path d="M470,300 L548,300" fill="none" stroke={A} strokeWidth="2" markerEnd="url(#ah)" />
        <path d="M470,325 C510,370 510,420 548,450" fill="none" stroke={A} strokeWidth="2" markerEnd="url(#ah)" />
        {/* actions -> outcomes */}
        <path d="M740,150 L772,150" fill="none" stroke={A} strokeWidth="2" markerEnd="url(#ah)" />
        <path d="M740,300 L772,300" fill="none" stroke={A} strokeWidth="2" markerEnd="url(#ah)" />
        <path d="M740,450 L772,450" fill="none" stroke={A} strokeWidth="2" markerEnd="url(#ah)" />
        {/* loop: ShareCard reach -> back to entry (green dashed, along bottom) */}
        <path d="M860,340 C880,470 880,528 120,528 L120,346" fill="none" stroke="#6B7C3A" strokeWidth="2.2" strokeDasharray="7 5" markerEnd="url(#ahg)" />
        {/* return: follow notify -> back to report detail (dashed) */}
        <path d="M860,490 C700,545 360,548 360,408" fill="none" stroke={A} strokeWidth="2" strokeDasharray="6 5" markerEnd="url(#ah)" />
      </svg>

      <FlowNode x={52} y={258} w={160} h={88} icon="🔗" title="Κοινοποιημένος σύνδεσμος" sub="WhatsApp · Viber · FB" tone="entry" />
      <FlowNode x={268} y={250} w={202} h={108} icon="📄" title="Σελίδα Αναφοράς /r" sub="Φωτό · μετρητής ημερών · κατάσταση" tone="core" />

      <FlowNode x={548} y={112} w={192} h={76} icon="👍" title="Ψήφος / «Ακόμα εδώ»" sub="ανεβάζει προτεραιότητα" tone="action" />
      <FlowNode x={548} y={262} w={192} h={76} icon="📣" title="Κοινοποίηση" sub="δημιουργεί ShareCard" tone="action" />
      <FlowNode x={548} y={412} w={192} h={76} icon="🔔" title="Παρακολούθηση (email)" sub="προαιρετικό" tone="action" />

      <FlowNode x={772} y={112} w={156} h={76} icon="🔥" title="Άνοδος στα Επείγοντα" sub="πίεση στον δήμο" tone="pressure" />
      <FlowNode x={772} y={262} w={156} h={76} icon="🖼️" title="Φτάνει σε νέους" sub="OG εικόνα" tone="loop" />
      <FlowNode x={772} y={412} w={156} h={76} icon="↩️" title="Επιστροφή χρήστη" sub="σε αλλαγή κατάστασης" tone="action" />

      <div style={{ position: 'absolute', left: 250, top: 500, fontSize: 11.5, fontWeight: 700, color: '#6B7C3A' }}>↻ νέοι άνθρωποι μπαίνουν στον βρόχο</div>
    </div>
  );
}

Object.assign(window, { FlowDiagram });
