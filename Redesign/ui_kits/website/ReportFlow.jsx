/* Katharos — Report Flow (4-step wizard: Category → Photos → Location → Submit) */

function StepDots({ idx }) {
  const steps = ['Category', 'Photo', 'Location', 'Submit'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div title={s} style={{ width: 32, height: 32, borderRadius: 9999, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700,
            color: i <= idx ? '#fff' : '#9CA3AF',
            background: i < idx ? '#6B7C3A' : i === idx ? '#006994' : '#E5E7EB',
            transition: 'background .2s' }}>{i < idx ? '✓' : i + 1}</div>
          {i < steps.length - 1 && (
            <div style={{ width: 32, height: 2, background: i < idx ? '#6B7C3A' : '#E5E7EB' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ReportFlow({ onTracking, onNav, lang }) {
  const [step, setStep] = React.useState(0); // 0 cat,1 photo,2 loc,3 submit,4 success
  const [category, setCategory] = React.useState(null);
  const [photos, setPhotos] = React.useState([]);
  const [desc, setDesc] = React.useState('');
  const cat = window.CAT_BY_ID[category];

  const navRow = (back, next, nextLabel, nextDisabled, nextAction, actionBtn) => (
    <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
      <button onClick={back} style={{ flex: 1, border: '1px solid #E5E7EB', borderRadius: 24,
        padding: '12px', color: '#4B5563', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15 }}>← Back</button>
      <button onClick={nextAction} disabled={nextDisabled} style={{ flex: 1, border: 'none', borderRadius: 24,
        padding: '12px', color: '#fff', background: actionBtn ? '#6B7C3A' : '#006994', cursor: nextDisabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit', fontSize: 15, fontWeight: 600, opacity: nextDisabled ? 0.4 : 1 }}>{nextLabel}</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 512, margin: '0 auto', padding: '32px 16px', minHeight: 480 }}>
      {step < 4 && <StepDots idx={step} />}

      {step === 0 && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#006994', margin: '0 0 4px' }}>Category</h2>
          <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 24px' }}>What type of problem is this?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {window.CATEGORIES.map(c => (
              <button key={c.id} onClick={() => { setCategory(c.id); setStep(1); }} style={{
                borderRadius: 16, padding: 12, textAlign: 'left', display: 'flex', flexDirection: 'column',
                gap: 8, border: '2px solid transparent', background: c.tile, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'transform .15s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{ width: 40, height: 40, borderRadius: 9999, background: c.circ,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1F2937', lineHeight: 1.3 }}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#006994', margin: '0 0 4px' }}>Photo</h2>
          <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 20px' }}>Add up to 3 photos · first photo is the main image</p>
          {photos.length > 0 && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, overflowX: 'auto' }}>
              {photos.map((p, i) => (
                <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={p} alt="" style={{ width: photos.length === 1 ? 160 : 112,
                    height: photos.length === 1 ? 160 : 112, borderRadius: 12, objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 4, left: 4, background: 'rgba(0,0,0,0.6)', color: '#fff',
                    fontSize: 12, fontWeight: 700, borderRadius: 9999, width: 20, height: 20, display: 'flex',
                    alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                  <button onClick={() => setPhotos(photos.filter((_, j) => j !== i))} style={{ position: 'absolute',
                    top: 4, right: 4, background: 'rgba(255,255,255,0.9)', borderRadius: 9999, width: 24, height: 24,
                    border: 'none', cursor: 'pointer', fontSize: 12, color: '#374151' }}>✕</button>
                </div>
              ))}
            </div>
          )}
          {photos.length < 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              {[['📷', 'Camera', '#2285A4', '#E6EFF3', '#006994'], ['🖼️', 'Photo Library', '#D1D5DB', '#F9FAFB', '#4B5563']].map(([icon, label, bc, hb, fg], k) => (
                <button key={label} onClick={() => setPhotos(p => [...p, `https://picsum.photos/seed/gc${Date.now() + k}/400/400`])}
                  style={{ border: `2px dashed ${bc}`, borderRadius: 16, height: photos.length === 0 ? 144 : 80,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: '#fff', cursor: 'pointer', color: fg, fontFamily: 'inherit',
                    transition: 'background .2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = hb}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                  <span style={{ fontSize: photos.length === 0 ? 36 : 24, lineHeight: 1 }}>{icon}</span>
                  <span style={{ fontSize: photos.length === 0 ? 14 : 12, fontWeight: 600 }}>{photos.length === 0 ? label : '+ ' + icon}</span>
                </button>
              ))}
            </div>
          )}
          {photos.length === 0 && <p style={{ fontSize: 12, textAlign: 'center', color: '#9CA3AF', marginBottom: 8 }}>JPG · PNG · HEIC · max 10 MB</p>}
          {photos.length > 0 && (
            <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7C3A', fontWeight: 500, margin: '0 0 16px' }}>📍 Location found</p>
          )}
          {navRow(() => setStep(0), null, 'Next →', photos.length === 0, () => setStep(2))}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#006994', margin: '0 0 4px' }}>Location</h2>
          <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 16px' }}>Location found</p>
          <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid #E5E7EB', marginBottom: 12, position: 'relative' }}>
            <iframe title="map" style={{ width: '100%', height: 240, border: 0, display: 'block' }} loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=22.89%2C40.62%2C22.92%2C40.65&layer=mapnik&marker=40.638%2C22.905" />
          </div>
          <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginBottom: 16 }}>Tap the map to move the pin</p>
          {navRow(() => setStep(1), null, 'Confirm Location ✓', false, () => setStep(3))}
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#006994', margin: '0 0 20px' }}>Almost done!</h2>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
            Description <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span></label>
          <textarea value={desc} onChange={e => setDesc(e.target.value.slice(0, 500))} rows={4}
            placeholder="Describe the problem in a few words…" style={{ width: '100%', boxSizing: 'border-box',
              border: '1px solid #D1D5DB', borderRadius: 24, padding: '12px 16px', fontSize: 14, resize: 'none',
              fontFamily: 'inherit', outline: 'none' }}
            onFocus={e => e.target.style.boxShadow = '0 0 0 2px #006994'}
            onBlur={e => e.target.style.boxShadow = 'none'} />
          <p style={{ textAlign: 'right', fontSize: 12, color: '#9CA3AF', margin: '4px 0 24px' }}>{desc.length}/500</p>
          {navRow(() => setStep(2), null, 'Submit ✓', false, () => setStep(4), true)}
          <button onClick={() => setStep(4)} style={{ width: '100%', background: 'none', border: 'none',
            color: '#9CA3AF', fontSize: 12, padding: '6px', cursor: 'pointer', marginTop: 12, fontFamily: 'inherit' }}>Skip description &amp; submit →</button>
        </div>
      )}

      {step === 4 && (
        <div style={{ textAlign: 'center', paddingTop: 16 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#006994', margin: '0 0 12px' }}>Thank you for making Greece cleaner! 🌿</h2>
          <p style={{ color: '#6B7280', fontSize: 14, margin: '0 auto 32px', maxWidth: 360, lineHeight: 1.6 }}>
            Once our team has verified your report, it will appear on the map and the responsible municipality will be notified.</p>
          <window.Card style={{ background: '#F9FAFB', marginBottom: 24, textAlign: 'left' }}>
            <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 4px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tracking link</p>
            <p style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', color: '#006994', wordBreak: 'break-all', margin: '0 0 16px' }}>katharos.gr/r/ab12cd34ef56</p>
            <button onClick={onTracking} style={{ width: '100%', padding: '10px', borderRadius: 24, border: 'none',
              background: '#006994', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>View tracking page →</button>
          </window.Card>
          <button onClick={() => { setStep(0); setCategory(null); setPhotos([]); setDesc(''); }}
            style={{ width: '100%', padding: '12px', borderRadius: 24, border: 'none', background: '#006994',
              color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Submit another report →</button>
          {onNav && (
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #F3F4F6' }}>
              <button onClick={() => onNav('partners')} style={{ background: 'none', border: 'none', cursor: 'pointer',
                color: '#6B7280', fontSize: 13, fontFamily: 'inherit', padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = '#006994'}
                onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}>
                {((window.PARTNERS_I18N && window.PARTNERS_I18N[lang]) || {}).reportCta || 'Are you an organisation or municipality? Partner with us →'}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { ReportFlow });
