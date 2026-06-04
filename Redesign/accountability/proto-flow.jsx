/* Katharos · Clickable prototype — report flow + success */

function ReportStepDots({ idx }) {
  const { T } = window;
  const steps = ['Κατηγορία', 'Φωτό', 'Τοποθεσία', 'Υποβολή'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ width: 30, height: 30, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: i <= idx ? '#fff' : T.ink3, background: i < idx ? T.action : i === idx ? T.primary : T.line2 }}>{i < idx ? '✓' : i + 1}</div>
          {i < steps.length - 1 && <div style={{ width: 26, height: 2, background: i < idx ? T.action : T.line2 }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function ReportFlowBody({ nav }) {
  const { T, CAT, Btn, PixPhoto } = window;
  const [step, setStep] = React.useState(0);
  const [cat, setCat] = React.useState(null);
  const [photos, setPhotos] = React.useState([]);
  const [desc, setDesc] = React.useState('');
  const ids = Object.keys(CAT);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <Status />
      <div style={{ display: 'flex', alignItems: 'center', padding: '6px 16px', flexShrink: 0 }}>
        <span onClick={nav.back} style={{ fontSize: 22, cursor: 'pointer', color: T.ink2, width: 28 }}>✕</span>
        <span style={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 700, color: T.ink, marginRight: 28 }}>Νέα αναφορά · &lt; 1 λεπτό</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
        <ReportStepDots idx={step} />
        {step === 0 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: T.primary, margin: '0 0 4px' }}>Κατηγορία</h2>
            <p style={{ color: T.ink2, fontSize: 14, margin: '0 0 20px' }}>Τι είδους πρόβλημα είναι;</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {ids.map(id => { const c = CAT[id]; return (
                <button key={id} onClick={() => { setCat(id); setStep(1); }} style={{ borderRadius: 16, padding: 12, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8, border: '2px solid transparent', background: c.circ ? '#F9FAFB' : '#F9FAFB', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9999, background: c.circ, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>{c.icon}</div>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: T.ink, lineHeight: 1.25 }}>{c.el}</span>
                </button>
              ); })}
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: T.primary, margin: '0 0 4px' }}>Φωτογραφία</h2>
            <p style={{ color: T.ink2, fontSize: 14, margin: '0 0 20px' }}>Έως 3 φωτογραφίες · η πρώτη είναι η κύρια</p>
            {photos.length > 0 && (
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                {photos.map((p, i) => <div key={i} style={{ position: 'relative' }}><PixPhoto seed={p} height={photos.length === 1 ? 150 : 96} radius={12} tag={false} patches={[]} /></div>)}
              </div>
            )}
            {photos.length < 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                {[['📷', 'Κάμερα', '#66A5E1', T.primary], ['🖼️', 'Συλλογή', '#D1D5DB', T.ink2]].map(([ic, l, bd, fg]) => (
                  <button key={l} onClick={() => setPhotos(ps => [...ps, 'gcph' + (ps.length + Date.now() % 100)])} style={{ border: `2px dashed ${bd}`, borderRadius: 16, height: photos.length === 0 ? 140 : 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', cursor: 'pointer', color: fg, fontFamily: 'inherit' }}>
                    <span style={{ fontSize: photos.length === 0 ? 34 : 24 }}>{ic}</span><span style={{ fontSize: photos.length === 0 ? 14 : 12, fontWeight: 600 }}>{photos.length === 0 ? l : '+ ' + ic}</span>
                  </button>
                ))}
              </div>
            )}
            {photos.length > 0 && <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: T.action, fontWeight: 500, margin: '0 0 16px' }}>📍 Εντοπίστηκε τοποθεσία από τη φωτογραφία</p>}
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn kind="ghost" onClick={() => setStep(0)} style={{ flex: 1, borderRadius: 18 }}>← Πίσω</Btn>
              <Btn kind="primary" onClick={() => photos.length && setStep(2)} style={{ flex: 1, borderRadius: 18, opacity: photos.length ? 1 : 0.4 }}>Επόμενο →</Btn>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: T.primary, margin: '0 0 4px' }}>Τοποθεσία</h2>
            <p style={{ color: T.ink2, fontSize: 14, margin: '0 0 16px' }}>Εντοπίστηκε τοποθεσία</p>
            <div style={{ borderRadius: 18, overflow: 'hidden', border: `1px solid ${T.line2}`, marginBottom: 12 }}>
              <iframe title="m" style={{ width: '100%', height: 240, border: 0, display: 'block' }} src="https://www.openstreetmap.org/export/embed.html?bbox=22.89%2C40.62%2C22.92%2C40.65&layer=mapnik&marker=40.638%2C22.905" />
            </div>
            <p style={{ fontSize: 12, color: T.ink3, textAlign: 'center', marginBottom: 16 }}>Πάτησε στον χάρτη για να μετακινήσεις την πινέζα</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn kind="ghost" onClick={() => setStep(1)} style={{ flex: 1, borderRadius: 18 }}>← Πίσω</Btn>
              <Btn kind="primary" onClick={() => setStep(3)} style={{ flex: 1, borderRadius: 18 }}>Επιβεβαίωση ✓</Btn>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: T.primary, margin: '0 0 18px' }}>Σχεδόν έτοιμο!</h2>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: T.ink2, marginBottom: 6 }}>Περιγραφή <span style={{ color: T.ink3 }}>(προαιρετικό)</span></label>
            <textarea value={desc} onChange={e => setDesc(e.target.value.slice(0, 500))} rows={4} placeholder="Περίγραψε το πρόβλημα σε λίγες λέξεις…" style={{ width: '100%', boxSizing: 'border-box', border: `1px solid ${T.line2}`, borderRadius: 18, padding: '12px 16px', fontSize: 14, resize: 'none', fontFamily: 'inherit', outline: 'none' }} />
            <p style={{ textAlign: 'right', fontSize: 12, color: T.ink3, margin: '4px 0 22px' }}>{desc.length}/500</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn kind="ghost" onClick={() => setStep(2)} style={{ flex: 1, borderRadius: 18 }}>← Πίσω</Btn>
              <Btn kind="action" onClick={() => nav.replace({ name: 'success' })} style={{ flex: 1, borderRadius: 18 }}>Υποβολή ✓</Btn>
            </div>
            <button onClick={() => nav.replace({ name: 'success' })} style={{ width: '100%', background: 'none', border: 'none', color: T.ink3, fontSize: 12, padding: '10px', cursor: 'pointer', marginTop: 8, fontFamily: 'inherit' }}>Παράλειψη περιγραφής & υποβολή →</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────── SUCCESS ───────── */
function SuccessBody({ nav }) {
  const { T, Btn, EmailFollow, ShareSheet } = window;
  const [share, setShare] = React.useState(false);
  const scale = 300 / 600;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <Status />
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 18px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <style>{`@keyframes gc-pop{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}`}</style>
          <div style={{ fontSize: 60, animation: 'gc-pop .5s cubic-bezier(.3,1.5,.5,1)' }}>✅</div>
          <h1 style={{ margin: '6px 0 4px', fontSize: 23, fontWeight: 800, color: T.primary }}>Η αναφορά σου εστάλη!</h1>
          <p style={{ margin: 0, fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>Μόλις επαληθευτεί, θα εμφανιστεί στον χάρτη και θα ειδοποιηθεί ο δήμος.</p>
        </div>
        <div style={{ background: T.bg, borderRadius: 16, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: T.ink3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Σύνδεσμος παρακολούθησης</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 1, fontFamily: 'ui-monospace, monospace', fontSize: 13, color: T.primary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>katharos.gr/r/ab12cd34ef56</span><span style={{ fontSize: 18 }}>📋</span></div>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: T.ink, textAlign: 'center' }}>Κοινοποίησε για να μην αγνοηθεί</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 300, height: 340 * scale, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.16)' }}>
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 600, height: 340 }}><window.ShareCard variant="new" /></div>
            </div>
          </div>
          <Btn kind="action" full onClick={() => setShare(true)} style={{ borderRadius: 18, marginTop: 12 }}>📣 Κοινοποίησε τώρα</Btn>
        </div>
        <EmailFollow />
        <button onClick={() => nav.replace({ name: 'tracking', days: 0 })} style={{ background: T.primary50, border: 'none', borderRadius: 16, padding: 14, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
          <span style={{ fontSize: 22 }}>📄</span><span style={{ flex: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: T.primary }}>Δες τη σελίδα παρακολούθησης</span><span style={{ display: 'block', fontSize: 12, color: T.ink2 }}>Παρακολούθησε την πορεία</span></span><span style={{ fontSize: 18, color: T.primary }}>›</span>
        </button>
        <button onClick={() => nav.enter('map')} style={{ background: '#fff', border: `1px solid ${T.line2}`, borderRadius: 16, padding: 14, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
          <span style={{ fontSize: 22 }}>📍</span><span style={{ flex: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: T.ink }}>4 ακόμη ανοιχτές κοντά σου</span><span style={{ display: 'block', fontSize: 12, color: T.ink2 }}>Δες τες στον χάρτη</span></span><span style={{ fontSize: 18, color: T.ink3 }}>›</span>
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingTop: 2 }}>
          <window.Lockup mark={18} />
          <p style={{ textAlign: 'center', fontSize: 12, color: T.ink3, margin: 0 }}>💡 Πρόσθεσε το Katharos στην αρχική οθόνη</p>
        </div>
      </div>
      <ShareSheet open={share} onClose={() => setShare(false)} />
    </div>
  );
}

Object.assign(window, { ReportFlowBody, SuccessBody });
