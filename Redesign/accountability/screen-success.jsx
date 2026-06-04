/* Katharos · Screen 4 — Success after reporting (growth moment) */

function ScaledShareCard({ variant, targetW = 327 }) {
  const scale = targetW / 600;
  return (
    <div style={{ width: targetW, height: 340 * scale, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.16)' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 600, height: 340 }}>
        <window.ShareCard variant={variant} />
      </div>
    </div>
  );
}

function SuccessScreen() {
  const { T, Btn, EmailFollow, ShareSheet } = window;
  const [share, setShare] = React.useState(false);
  return (
    <window.PhoneFrame height={820} contentBg="#fff">
      <window.StatusBar />
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 18px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <style>{`@keyframes gc-pop{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}`}</style>
          <div style={{ fontSize: 60, animation: 'gc-pop .5s cubic-bezier(.3,1.5,.5,1)' }}>✅</div>
          <h1 style={{ margin: '6px 0 4px', fontSize: 23, fontWeight: 800, color: T.primary }}>Η αναφορά σου εστάλη!</h1>
          <p style={{ margin: 0, fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>Μόλις επαληθευτεί, θα εμφανιστεί στον χάρτη και θα ειδοποιηθεί ο δήμος.</p>
        </div>

        <div style={{ background: T.bg, borderRadius: 16, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: T.ink3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Σύνδεσμος παρακολούθησης</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ flex: 1, fontFamily: 'ui-monospace, monospace', fontSize: 13, color: T.primary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>katharos.gr/r/ab12cd34ef56</span>
            <span style={{ fontSize: 18 }}>📋</span>
          </div>
        </div>

        <div>
          <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: T.ink, textAlign: 'center' }}>Κοινοποίησε για να μην αγνοηθεί</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ScaledShareCard variant="new" targetW={300} />
          </div>
          <Btn kind="action" full onClick={() => setShare(true)} style={{ borderRadius: 18, marginTop: 12 }}>📣 Κοινοποίησε τώρα</Btn>
        </div>

        <EmailFollow />

        <button style={{ background: T.primary50, border: 'none', borderRadius: 16, padding: 14, cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
          <span style={{ fontSize: 22 }}>📍</span>
          <span style={{ flex: 1 }}>
            <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: T.primary }}>4 ακόμη ανοιχτές κοντά σου</span>
            <span style={{ display: 'block', fontSize: 12, color: T.ink2 }}>Δες τες στον χάρτη</span>
          </span>
          <span style={{ fontSize: 18, color: T.primary }}>›</span>
        </button>

        <p style={{ textAlign: 'center', fontSize: 12, color: T.ink3, margin: 0 }}>💡 Πρόσθεσε το Katharos στην αρχική οθόνη</p>
      </div>
      <ShareSheet open={share} onClose={() => setShare(false)} />
    </window.PhoneFrame>
  );
}

Object.assign(window, { SuccessScreen });
