/* GreeceClean — Regional / tourism layer (the "destination QR" landing point).
   A sponsor-co-branded view a hotel or tourism body can point a QR code at, so
   guests land here and can report in one tap. Trilingual via PARTNERS_I18N[lang].
   Imagery + sponsor logo are labelled placeholders (no fake logos). */

function RegionLayer({ lang, onNav }) {
  const t = ((window.PARTNERS_I18N && window.PARTNERS_I18N[lang]) || window.PARTNERS_I18N.EN).region;
  const PH = window.PHolder;

  // simple, deterministic QR-ish glyph (decorative placeholder, not a real code)
  const cells = 11;
  const seed = (i) => { const x = Math.sin(i * 12.9898) * 43758.5453; return (x - Math.floor(x)) > 0.45; };

  return (
    <div style={{ background: '#fff' }}>
      {/* hero */}
      <section style={{ position: 'relative', color: '#fff', overflow: 'hidden' }}>
        <PH label="destination / coast image" height="100%" radius={0}
          style={{ position: 'absolute', inset: 0, border: 'none',
            background: 'repeating-linear-gradient(135deg, #0B5BB3 0 16px, #0D6FDB 16px 32px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg, rgba(11,53,99,0.80), rgba(11,87,173,0.92))' }} />
        <div style={{ maxWidth: 1040, margin: '0 auto', position: 'relative', padding: '56px 20px 64px' }}>
          {/* demo ribbon */}
          <p style={{ margin: '0 0 22px', fontSize: 11.5, fontFamily: 'ui-monospace, monospace', color: '#9FE3AC',
            letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.demoNote}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 36, alignItems: 'center' }}>
            {/* left: message */}
            <div>
              <p style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9FE3AC' }}>{t.eyebrow}</p>
              <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(30px, 4.4vw, 46px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#fff' }}>{t.title}</h1>
              <p style={{ margin: '0 0 28px', maxWidth: 460, fontSize: 17, lineHeight: 1.6, color: '#D7E7FA' }}>{t.sub}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => onNav && onNav('report')} style={{ background: '#39B24A', color: '#fff', border: 'none',
                  cursor: 'pointer', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 16, fontFamily: 'inherit',
                  boxShadow: '0 10px 18px -4px rgba(0,0,0,0.28)', transition: 'background .2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#2E8C3B'}
                  onMouseLeave={e => e.currentTarget.style.background = '#39B24A'}>📷 {t.reportCta}</button>
                <button onClick={() => onNav && onNav('map')} style={{ background: 'rgba(255,255,255,0.10)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.45)', cursor: 'pointer', fontWeight: 600, fontSize: 16,
                  padding: '14px 28px', borderRadius: 16, fontFamily: 'inherit', transition: 'background .2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.10)'}>{t.mapCta}</button>
              </div>
            </div>

            {/* right: QR card */}
            <div style={{ justifySelf: 'center' }}>
              <div style={{ background: '#fff', borderRadius: 24, padding: 22, width: 230, textAlign: 'center', boxShadow: '0 20px 40px -12px rgba(0,0,0,0.4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cells}, 1fr)`, gap: 2, width: 168, height: 168, margin: '0 auto' }}>
                  {Array.from({ length: cells * cells }).map((_, i) => {
                    const r = Math.floor(i / cells), c = i % cells;
                    const finder = (rr, cc) => rr < 3 && cc < 3 || rr < 3 && cc > cells - 4 || rr > cells - 4 && cc < 3;
                    const on = finder(r, c) ? !((r === 1 || r === cells - 2) && (c === 1 || c === cells - 2)) && !((r === 0 || r === cells - 1) && false) : seed(i);
                    return <div key={i} style={{ background: on ? '#0B3F7E' : 'transparent', borderRadius: 1 }} />;
                  })}
                </div>
                <p style={{ margin: '14px 0 2px', fontSize: 14, fontWeight: 700, color: '#0D6FDB' }}>{t.qrLabel}</p>
                <p style={{ margin: 0, fontSize: 11, color: '#9CA3AF', fontFamily: 'ui-monospace, monospace' }}>{t.qrSub}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* regional stats + sponsor co-brand */}
      <section style={{ padding: '48px 20px', background: '#F2F7FB' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
            {t.stats.map((s, i) => (
              <window.Card key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ fontSize: 38, fontWeight: 800, color: '#C2D4E6', lineHeight: 1 }}>—</div>
                <p style={{ margin: '10px 0 0', fontSize: 13.5, fontWeight: 600, color: '#1F2937' }}>{s.label}</p>
              </window.Card>
            ))}
          </div>

          {/* sponsor co-brand strip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280' }}>{t.sponsorLabel}</span>
            <window.PHolder label={t.sponsorPlaceholder} height={54} radius={14} style={{ width: 170 }} />
          </div>

          {/* partner nudge */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 10px', fontSize: 14, color: '#4B5563' }}>{t.partnerNote}</p>
            <button onClick={() => onNav && onNav('partners')} style={{ background: 'none', border: 'none', cursor: 'pointer',
              color: '#0D6FDB', fontWeight: 700, fontSize: 15, fontFamily: 'inherit', padding: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = '#0B57AD'}
              onMouseLeave={e => e.currentTarget.style.color = '#0D6FDB'}>{t.partnerCta}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { RegionLayer });
