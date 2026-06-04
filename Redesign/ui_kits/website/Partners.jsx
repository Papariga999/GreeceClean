/* Katharos — Partners / Sponsors page (subpage). All 9 sections, mobile-first
   + desktop, in the Aegean-Clean system. Trilingual via window.PARTNERS_I18N[lang].
   Imagery uses labelled placeholders (real assets dropped in later). */

/* Striped placeholder for imagery the team supplies later. */
function PHolder({ label, height, radius = 24, style }) {
  return (
    <div style={{ height, borderRadius: radius, position: 'relative', overflow: 'hidden',
      background: 'repeating-linear-gradient(135deg, #E7F0F9 0 13px, #F5F2ED 13px 26px)',
      border: '1px solid #E8E3DA', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11.5, color: '#8AA1BA',
        letterSpacing: '0.02em', textAlign: 'center', padding: '0 12px', lineHeight: 1.4 }}>{label}</span>
    </div>
  );
}

function SectionHead({ eyebrow, heading, sub, align = 'center', light, max = 680 }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? max : 'none', margin: align === 'center' ? '0 auto' : 0 }}>
      <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: light ? '#A4B16E' : '#6B7280' }}>{eyebrow}</p>
      <h2 style={{ margin: 0, fontSize: 'clamp(26px, 3.4vw, 38px)', fontWeight: 800, lineHeight: 1.15,
        letterSpacing: '-0.02em', color: light ? '#fff' : '#006994' }}>{heading}</h2>
      {sub && <p style={{ margin: '14px auto 0', maxWidth: 620, fontSize: 16, lineHeight: 1.6,
        color: light ? '#CFE4FB' : '#4B5563' }}>{sub}</p>}
    </div>
  );
}

function Partners({ lang, onNav }) {
  const t = window.PARTNERS_I18N[lang];
  const W = 1152, PROSE = 920;
  const contactRef = React.useRef(null);
  const solutionRef = React.useRef(null);
  const scrollTo = (ref) => { const el = ref.current; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 12, behavior: 'smooth' }); };

  const sectionPad = '72px 20px';
  const wrap = (w) => ({ maxWidth: w, margin: '0 auto' });

  const heroBtn = (primary, children, onClick) => (
    <button onClick={onClick} style={{
      background: primary ? '#6B7C3A' : 'rgba(255,255,255,0.10)', color: '#fff',
      border: primary ? 'none' : '1px solid rgba(255,255,255,0.45)', cursor: 'pointer',
      fontWeight: 600, fontSize: 16, padding: '14px 30px', borderRadius: 16, fontFamily: 'inherit',
      boxShadow: primary ? '0 10px 18px -4px rgba(0,0,0,0.28)' : 'none', transition: 'background .2s' }}
      onMouseEnter={e => e.currentTarget.style.background = primary ? '#5A6830' : 'rgba(255,255,255,0.2)'}
      onMouseLeave={e => e.currentTarget.style.background = primary ? '#6B7C3A' : 'rgba(255,255,255,0.10)'}>{children}</button>
  );

  return (
    <div style={{ background: '#fff' }}>

      {/* ============================================================ 1 · HERO */}
      <section style={{ position: 'relative', color: '#fff', overflow: 'hidden' }}>
        <PHolder label={t.hero.heroImg} height="100%" radius={0}
          style={{ position: 'absolute', inset: 0, border: 'none',
            background: 'repeating-linear-gradient(135deg, #0B5BB3 0 16px, #006994 16px 32px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg, rgba(11,53,99,0.78), rgba(11,87,173,0.90))' }} />
        <div style={{ ...wrap(880), position: 'relative', padding: '108px 20px 100px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 18px', fontSize: 13, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#A4B16E' }}>{t.hero.eyebrow}</p>
          <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(34px, 5.4vw, 58px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#fff' }}>
            {t.hero.pre}<span style={{ color: '#A4B16E' }}>{t.hero.hi}</span>{t.hero.post}
          </h1>
          <p style={{ margin: '0 auto 36px', maxWidth: 600, fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.6, color: '#D7E7FA' }}>{t.hero.sub}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {heroBtn(true, t.hero.ctaPrimary, () => scrollTo(contactRef))}
            {heroBtn(false, t.hero.ctaSecondary, () => scrollTo(solutionRef))}
          </div>
        </div>
      </section>

      {/* ========================================================= 2 · PROBLEM */}
      <section style={{ padding: sectionPad, background: '#F9FAFB' }}>
        <div style={wrap(W)}>
          <SectionHead eyebrow={t.problem.eyebrow} heading={t.problem.heading} sub={t.problem.lead} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, margin: '44px 0 28px' }}>
            {t.problem.stats.map((s, i) => (
              <window.Card key={i} style={{ padding: '28px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: '#006994', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</span>
                  {s.sub && <span style={{ fontSize: 15, fontWeight: 700, color: '#005A80' }}>{s.sub}</span>}
                </div>
                <p style={{ margin: '14px 0 0', fontSize: 14.5, color: '#4B5563', lineHeight: 1.55 }}>{s.desc}</p>
              </window.Card>
            ))}
          </div>
          <p style={{ textAlign: 'center', margin: '0 auto', maxWidth: 760, fontSize: 'clamp(19px, 2.4vw, 24px)',
            fontWeight: 700, color: '#1F2937', lineHeight: 1.4, letterSpacing: '-0.01em' }}>{t.problem.kicker}</p>
          <p style={{ textAlign: 'center', margin: '20px auto 0', maxWidth: 760, fontSize: 12, color: '#9CA3AF', lineHeight: 1.5 }}>{t.problem.sources}</p>
        </div>
      </section>

      {/* ======================================================== 3 · SOLUTION */}
      <section ref={solutionRef} style={{ padding: sectionPad, background: '#fff' }}>
        <div style={wrap(W)}>
          <SectionHead eyebrow={t.solution.eyebrow} heading={t.solution.heading} sub={t.solution.sub} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, margin: '44px 0 32px' }}>
            {t.solution.steps.map((s, i) => (
              <window.Card key={i} style={{ padding: '28px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <span style={{ width: 52, height: 52, borderRadius: 9999, background: '#F5F2ED', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{s.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#6B7C3A', fontFamily: 'ui-monospace, monospace' }}>0{i + 1}</span>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: 19, fontWeight: 700, color: '#006994' }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, color: '#4B5563', lineHeight: 1.6 }}>{s.desc}</p>
              </window.Card>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {t.solution.features.map(ft => (
              <span key={ft} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#F5F2ED',
                color: '#005A80', borderRadius: 9999, padding: '8px 16px', fontSize: 13.5, fontWeight: 600 }}>
                <span style={{ color: '#6B7C3A', fontWeight: 800 }}>✓</span>{ft}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================ 4 · MISSION & VISION */}
      <section style={{ padding: sectionPad, background: 'linear-gradient(155deg, #006994, #004A6A)', color: '#fff' }}>
        <div style={wrap(W)}>
          <p style={{ textAlign: 'center', margin: '0 0 4px', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A4B16E' }}>{t.mv.eyebrow}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginTop: 32 }}>
            {[[t.mv.missionLabel, t.mv.mission], [t.mv.visionLabel, t.mv.vision]].map(([label, body]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: 24, padding: '32px 30px' }}>
                <p style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A4B16E' }}>{label}</p>
                <p style={{ margin: 0, fontSize: 'clamp(18px, 2.1vw, 22px)', fontWeight: 600, lineHeight: 1.5, color: '#fff', letterSpacing: '-0.01em' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================== 5 · WHY WORTH SUPPORTING */}
      <section style={{ padding: sectionPad, background: '#F5F2ED' }}>
        <div style={wrap(W)}>
          <SectionHead eyebrow={t.claims.eyebrow} heading={t.claims.heading} sub={t.claims.sub} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22, marginTop: 44 }}>
            {t.claims.items.map((c, i) => (
              <window.Card key={i} style={{ padding: '28px 26px', display: 'flex', flexDirection: 'column', transition: 'box-shadow .2s, transform .2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 14px 28px -10px rgba(13,111,219,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <span style={{ width: 46, height: 46, borderRadius: 14, background: '#E6EFF3', color: '#006994', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontFamily: 'ui-monospace, monospace', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>0{i + 1}</span>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#006994', lineHeight: 1.25 }}>{c.title}</h3>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, color: '#4B5563', lineHeight: 1.6 }}>{c.desc}</p>
              </window.Card>
            ))}
          </div>

          {/* partner-logo area — prepared, intentionally empty (no fake logos) */}
          <div style={{ marginTop: 52 }}>
            <p style={{ textAlign: 'center', margin: '0 0 14px', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280' }}>{t.claims.partnersLabel}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14, marginBottom: 14 }}>
              {[0, 1, 2, 3].map(i => <PHolder key={i} label="logo" height={70} radius={16} />)}
            </div>
            <p style={{ textAlign: 'center', margin: 0, fontSize: 13, color: '#9CA3AF', fontStyle: 'italic' }}>{t.claims.partnersNote}</p>
          </div>
        </div>
      </section>

      {/* ==================================================== 6 · WHY PARTNER */}
      <section style={{ padding: sectionPad, background: '#fff' }}>
        <div style={wrap(W)}>
          <SectionHead eyebrow={t.why.eyebrow} heading={t.why.heading} sub={t.why.sub} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22, marginTop: 44 }}>
            {t.why.cards.map((c, i) => (
              <window.Card key={i} style={{ padding: '28px 26px', display: 'flex', flexDirection: 'column', transition: 'box-shadow .2s, transform .2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 14px 28px -10px rgba(13,111,219,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ width: 48, height: 48, borderRadius: 14, background: '#F5F2ED', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{c.icon}</span>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#006994', lineHeight: 1.2 }}>{c.title}</h3>
                </div>
                <ul style={{ margin: '0 0 20px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {c.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#4B5563', lineHeight: 1.55 }}>
                      <span style={{ color: '#6B7C3A', fontWeight: 800, flexShrink: 0 }}>✓</span><span>{b}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo(contactRef)} style={{ alignSelf: 'flex-start', background: 'none', border: 'none',
                  color: '#006994', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', padding: 0,
                  display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#005A80'}
                  onMouseLeave={e => e.currentTarget.style.color = '#006994'}>{t.why.cta} <span aria-hidden="true">→</span></button>
                {i === 2 && t.why.regionLink && (
                  <button onClick={() => onNav && onNav('region')} style={{ alignSelf: 'flex-start', marginTop: 10, background: 'none',
                    border: 'none', color: '#5A6830', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1F6B2A'}
                    onMouseLeave={e => e.currentTarget.style.color = '#5A6830'}>{t.why.regionLink}</button>
                )}
              </window.Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================== 7 · OFFER */}
      <section style={{ padding: sectionPad, background: '#F9FAFB' }}>
        <div style={wrap(W)}>
          <SectionHead eyebrow={t.offer.eyebrow} heading={t.offer.heading} sub={t.offer.sub} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, margin: '44px 0 36px' }}>
            {t.offer.items.map((o, i) => (
              <window.Card key={i} style={{ padding: '24px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 10 }}>
                  <span style={{ width: 40, height: 40, borderRadius: 11, background: '#F0F2E9', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 }}>{o.icon}</span>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1F2937', lineHeight: 1.2 }}>{o.title}</h3>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: '#4B5563', lineHeight: 1.55 }}>{o.desc}</p>
              </window.Card>
            ))}
          </div>

          {/* independence & transparency */}
          <div style={{ background: '#002636', borderRadius: 24, padding: '36px 32px', color: '#fff' }}>
            <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>🛡️</div>
              <h3 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#fff' }}>{t.offer.transHeading}</h3>
              <p style={{ margin: '0 0 24px', fontSize: 15, color: '#8BBDCD' }}>{t.offer.transSub}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, maxWidth: 880, margin: '0 auto' }}>
              {t.offer.transPoints.map((p, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 16, padding: '18px 18px', display: 'flex', gap: 12 }}>
                  <span style={{ color: '#889A4D', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#E8F0FA', lineHeight: 1.55 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== 8 · CONTACT */}
      <section ref={contactRef} style={{ padding: sectionPad, background: '#fff' }}>
        <div style={wrap(PROSE)}>
          <SectionHead eyebrow={t.contact.eyebrow} heading={t.contact.heading} sub={t.contact.sub} />
          <div style={{ marginTop: 40 }}>
            <window.PartnerForm lang={lang} onNav={onNav} />
          </div>
          <p style={{ textAlign: 'center', margin: '22px auto 0', maxWidth: 540, fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{t.contact.trust}</p>
          <p style={{ textAlign: 'center', margin: '14px auto 0', fontSize: 14, color: '#4B5563' }}>
            {t.contact.altIntro}{' '}
            <a href={'mailto:' + window.PARTNERS_EMAIL} style={{ color: '#006994', fontWeight: 600, textDecoration: 'none', fontFamily: 'ui-monospace, monospace' }}>{window.PARTNERS_EMAIL}</a>
            <span style={{ color: '#D1D5DB', margin: '0 10px' }}>·</span>
            <a href="#" onClick={e => e.preventDefault()} style={{ color: '#006994', fontWeight: 600, textDecoration: 'none' }}>{t.contact.altLinkedin}</a>
          </p>
        </div>
      </section>

    </div>
  );
}

Object.assign(window, { Partners, PHolder, SectionHead });
