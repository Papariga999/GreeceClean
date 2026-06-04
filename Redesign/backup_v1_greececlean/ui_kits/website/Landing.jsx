/* GreeceClean — Landing page (public website hero + sections) */

function Landing({ onNav, lang }) {
  const reportTypes = window.CATEGORIES.slice(0, 11);
  const howSteps = [
    { step: '01', title: 'Photograph', desc: 'Take a photo of the problem using the app.' },
    { step: '02', title: 'Submit Report', desc: 'Location is recorded automatically and the report is sent.' },
    { step: '03', title: 'Track Progress', desc: 'You receive a tracking link to follow the progress.' },
  ];
  const champions = [
    { name: 'Δήμος Μήλου', pct: 92, resolved: 11, total: 12 },
    { name: 'Δήμος Κερκυραίων', pct: 80, resolved: 8, total: 10 },
    { name: 'Δήμος Χαλανδρίου', pct: 75, resolved: 6, total: 8 },
    { name: 'Δήμος Πειραιά', pct: 67, resolved: 4, total: 6 },
  ];
  const needsWork = [
    { name: 'Δήμος Θεσσαλονίκης', unresolved: 23 },
    { name: 'Δήμος Ηρακλείου', unresolved: 14 },
    { name: 'Δήμος Ρόδου', unresolved: 9 },
    { name: 'Δήμος Βόλου', unresolved: 6 },
  ];

  const heroBtn = (bg, hover, children, onClick, ghost) => (
    <button onClick={onClick} style={{
      background: ghost ? 'rgba(255,255,255,0.1)' : bg, color: '#fff',
      border: ghost ? '1px solid rgba(255,255,255,0.3)' : 'none', cursor: 'pointer',
      fontWeight: 600, fontSize: 16, padding: '14px 32px', borderRadius: 24,
      fontFamily: 'inherit', boxShadow: ghost ? 'none' : '0 10px 15px -3px rgb(0 0 0 / 0.2)',
      transition: 'background .2s' }}
      onMouseEnter={e => e.currentTarget.style.background = ghost ? 'rgba(255,255,255,0.2)' : hover}
      onMouseLeave={e => e.currentTarget.style.background = ghost ? 'rgba(255,255,255,0.1)' : bg}>{children}</button>
  );

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(to bottom right, #0D6FDB, #0B57AD)', color: '#fff', padding: '80px 16px' }}>
        <div style={{ maxWidth: 896, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 60, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff' }}>
            Keep Greece <span style={{ color: '#BFE0C6' }}>Clean</span>
          </h1>
          <p style={{ fontSize: 20, color: '#CFE4FB', margin: '0 auto 40px', maxWidth: 640, lineHeight: 1.5 }}>
            Photograph illegal dumps and litter. We automatically report them to the responsible municipality.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {heroBtn('#39B24A', '#2E8C3B', '📷 Make a Report', () => onNav('report'))}
            {heroBtn(null, null, '🗺️ View the Map', () => onNav('map'), true)}
          </div>
        </div>
      </section>

      {/* What can be reported */}
      <section style={{ padding: '40px 16px', background: '#fff', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 768, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 500, color: '#6B7280',
            textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 20px' }}>What can be reported</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            {reportTypes.map(c => (
              <button key={c.id} onClick={() => onNav('report')} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: 12, borderRadius: 16, background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', transition: 'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                <span style={{ fontSize: 30, lineHeight: 1 }}>{c.icon}</span>
                <span style={{ fontSize: 12, color: '#4B5563', fontWeight: 500, textAlign: 'center', lineHeight: 1.2 }}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '64px 16px', background: '#fff' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: 'center', color: '#0D6FDB', margin: '0 0 48px' }}>How it works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {howSteps.map(s => (
              <window.Card key={s.step} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#39B24A', marginBottom: 12 }}>{s.step}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#0D6FDB', margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ color: '#4B5563', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </window.Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live stats */}
      <section style={{ padding: '48px 16px', background: '#F9FAFB' }}>
        <div style={{ maxWidth: 896, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[['1,284', 'Reports'], ['612', 'Cleaned Up'], ['47', 'Municipalities']].map(([v, l]) => (
            <window.Card key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#0D6FDB' }}>{v}</div>
              <div style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>{l}</div>
            </window.Card>
          ))}
        </div>
      </section>

      {/* Leaderboards */}
      <section style={{ padding: '64px 16px', background: '#fff' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, color: '#0D6FDB', margin: '0 0 8px' }}>Impact Dashboard</h2>
            <p style={{ color: '#6B7280', fontSize: 14, margin: 0 }}>Which municipalities act — and which ones don't yet</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <window.Card>
              <h3 style={{ fontWeight: 700, color: '#0D6FDB', margin: '0 0 4px', fontSize: 16 }}>🏆 Cleanliness Champions</h3>
              <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 20px' }}>Highest rate of resolved reports</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {champions.map(s => (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 500, color: '#1F2937', margin: '0 0 4px',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</p>
                      <div style={{ height: 6, background: '#F3F4F6', borderRadius: 9999, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${s.pct}%`, background: '#39B24A', borderRadius: 9999 }} />
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#39B24A' }}>{s.pct}%</span>
                      <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>{s.resolved}/{s.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </window.Card>
            <window.Card>
              <h3 style={{ fontWeight: 700, color: '#0D6FDB', margin: '0 0 4px', fontSize: 16 }}>⚠️ Room for Improvement</h3>
              <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 20px' }}>Most unresolved reports</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {needsWork.map(s => (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 500, color: '#1F2937', margin: '0 0 4px',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</p>
                      <div style={{ height: 6, background: '#F3F4F6', borderRadius: 9999, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.min(100, s.unresolved * 10)}%`, background: '#FB923C', borderRadius: 9999 }} />
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#F97316' }}>{s.unresolved}</span>
                      <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>pending</p>
                    </div>
                  </div>
                ))}
              </div>
            </window.Card>
          </div>
        </div>
      </section>

      {/* Impact → partner CTA (contextual, sits right under the dashboard) */}
      {(() => {
        const c = ((window.PARTNERS_I18N && window.PARTNERS_I18N[lang]) || {}).impactCta
          || { title: 'This dashboard is made possible by our partners.', sub: 'Want your region covered too? Let’s make it happen together.', cta: 'Become a partner →' };
        return (
          <section style={{ padding: '0 16px 64px', background: '#fff' }}>
            <div style={{ maxWidth: 1024, margin: '0 auto', background: '#F2F7FB', border: '1px solid #E0EAF4',
              borderRadius: 24, padding: '28px 32px', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ minWidth: 240, flex: 1 }}>
                <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: '#0D6FDB', letterSpacing: '-0.01em' }}>{c.title}</p>
                <p style={{ margin: 0, fontSize: 14, color: '#4B5563', lineHeight: 1.5 }}>{c.sub}</p>
              </div>
              <button onClick={() => onNav('partners')} style={{ flexShrink: 0, background: 'none', border: '1px solid #0D6FDB',
                color: '#0D6FDB', cursor: 'pointer', padding: '11px 22px', borderRadius: 16, fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                transition: 'background .2s, color .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0D6FDB'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#0D6FDB'; }}>{c.cta}</button>
            </div>
          </section>
        );
      })()}

      {/* Closing footer band */}
      <section style={{ padding: '32px 16px', background: '#0D6FDB', color: '#fff', textAlign: 'center' }}>
        <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>GreeceClean 2026</p>
        <p style={{ fontSize: 12, color: '#BBD9F7', margin: '4px 0 0' }}>For a clean Greece 🌿</p>
      </section>
    </div>
  );
}

Object.assign(window, { Landing });
