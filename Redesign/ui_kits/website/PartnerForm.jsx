/* Katharos — Partner contact form (B2B). Normal / loading / success / error
   states, inline validation, GDPR consent, hidden honeypot. Trilingual via
   window.PARTNERS_I18N[lang].contact. Cosmetic — no real network call. */

function PartnerForm({ lang, onNav }) {
  const t = window.PARTNERS_I18N[lang].contact;
  const f = t.f;
  const EMAIL = window.PARTNERS_EMAIL;

  const [status, setStatus] = React.useState('idle'); // idle | submitting | success | error
  const [vals, setVals] = React.useState({ name: '', org: '', role: '', email: '', interest: '', region: '', message: '', consent: false, company: '' /* honeypot */ });
  const [errs, setErrs] = React.useState({});
  const [touched, setTouched] = React.useState(false);

  const set = (k, v) => setVals(s => ({ ...s, [k]: v }));

  const validate = () => {
    const e = {};
    if (!vals.name.trim()) e.name = f.errRequired;
    if (!vals.org.trim()) e.org = f.errRequired;
    if (!vals.email.trim()) e.email = f.errRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email.trim())) e.email = f.errEmail;
    if (!vals.interest) e.interest = f.errRequired;
    if (!vals.message.trim()) e.message = f.errRequired;
    if (!vals.consent) e.consent = f.errConsent;
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    setTouched(true);
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length) return;
    if (vals.company) { setStatus('success'); return; } // honeypot tripped → silently "succeed"
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  const reset = () => { setStatus('idle'); setTouched(false); };

  // ── shared input styling ────────────────────────────────────────────────
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };
  const baseInput = (bad) => ({
    width: '100%', boxSizing: 'border-box', fontFamily: 'inherit', fontSize: 14,
    border: `1px solid ${bad ? '#DC2626' : '#D1D5DB'}`, borderRadius: 16, padding: '11px 14px',
    background: status === 'submitting' ? '#F9FAFB' : '#fff', color: '#1F2937', outline: 'none',
    transition: 'box-shadow .2s, border-color .2s',
  });
  const focusOn = (e, bad) => { if (!bad) e.target.style.boxShadow = '0 0 0 2px #006994'; };
  const focusOff = (e) => { e.target.style.boxShadow = 'none'; };
  const errText = (msg) => msg ? <p style={{ margin: '5px 2px 0', fontSize: 12, color: '#DC2626', fontWeight: 500 }}>{msg}</p> : null;

  const Field = ({ id, label, opt, children }) => (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}{opt && <span style={{ color: '#9CA3AF', fontWeight: 400 }}> · {opt}</span>}</label>
      {children}
    </div>
  );

  const text = (id, key, opt) => (
    <Field id={id} label={f[key]} opt={opt}>
      <input id={id} type={key === 'email' ? 'email' : 'text'} value={vals[key]}
        placeholder={f[key + 'Ph']} disabled={status === 'submitting'}
        onChange={e => set(key, e.target.value)} style={baseInput(touched && errs[key])}
        onFocus={e => focusOn(e, touched && errs[key])} onBlur={focusOff} />
      {touched && errText(errs[key])}
    </Field>
  );

  // ── SUCCESS ──────────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <window.Card style={{ padding: '44px 28px', textAlign: 'center', maxWidth: 560, margin: '0 auto', position: 'relative' }}>
        <DemoSwitch lang={lang} status={status} setStatus={setStatus} reset={reset} />
        <div style={{ width: 64, height: 64, borderRadius: 9999, background: '#DCFCE7', display: 'flex',
          alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 30 }}>✓</div>
        <h3 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: '#006994' }}>{t.success.title}</h3>
        <p style={{ margin: '0 auto 28px', maxWidth: 380, color: '#4B5563', fontSize: 15, lineHeight: 1.6 }}>{t.success.body}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => onNav && onNav('map')} style={{ background: '#006994', color: '#fff', border: 'none',
            borderRadius: 16, padding: '11px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{t.success.backMap}</button>
          <button onClick={() => onNav && onNav('home')} style={{ background: '#fff', color: '#005A80', border: '1px solid #C0DAE3',
            borderRadius: 16, padding: '11px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{t.success.explore}</button>
        </div>
      </window.Card>
    );
  }

  // ── ERROR ──────────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <window.Card style={{ padding: '44px 28px', textAlign: 'center', maxWidth: 560, margin: '0 auto', position: 'relative' }}>
        <DemoSwitch lang={lang} status={status} setStatus={setStatus} reset={reset} />
        <div style={{ width: 64, height: 64, borderRadius: 9999, background: '#FEE2E2', display: 'flex',
          alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 30 }}>!</div>
        <h3 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: '#006994' }}>{t.error.title}</h3>
        <p style={{ margin: '0 auto 12px', maxWidth: 400, color: '#4B5563', fontSize: 15, lineHeight: 1.6 }}>{t.error.body}</p>
        <a href={'mailto:' + EMAIL} style={{ display: 'inline-block', marginBottom: 24, color: '#006994', fontWeight: 600,
          fontSize: 14, fontFamily: 'ui-monospace, monospace', textDecoration: 'none' }}>{EMAIL}</a>
        <div>
          <button onClick={reset} style={{ background: '#006994', color: '#fff', border: 'none',
            borderRadius: 16, padding: '11px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{t.error.retry}</button>
        </div>
      </window.Card>
    );
  }

  // ── FORM (idle / submitting) ───────────────────────────────────────────
  const loading = status === 'submitting';
  return (
    <window.Card style={{ padding: '28px 26px', maxWidth: 560, margin: '0 auto', position: 'relative' }}>
      <DemoSwitch lang={lang} status={status} setStatus={setStatus} reset={reset} />
      <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {text('pf-name', 'name')}
          {text('pf-org', 'org')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {text('pf-role', 'role', f.optional)}
          {text('pf-email', 'email')}
        </div>

        <Field id="pf-interest" label={f.interest}>
          <div style={{ position: 'relative' }}>
            <select id="pf-interest" value={vals.interest} disabled={loading}
              onChange={e => set('interest', e.target.value)}
              style={{ ...baseInput(touched && errs.interest), appearance: 'none', WebkitAppearance: 'none',
                paddingRight: 38, color: vals.interest ? '#1F2937' : '#9CA3AF', cursor: loading ? 'default' : 'pointer' }}
              onFocus={e => focusOn(e, touched && errs.interest)} onBlur={focusOff}>
              <option value="">{f.interestPh}</option>
              {f.interestOptions.map(o => <option key={o} value={o} style={{ color: '#1F2937' }}>{o}</option>)}
            </select>
            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: '#6B7280', fontSize: 12 }}>▼</span>
          </div>
          {touched && errText(errs.interest)}
        </Field>

        {text('pf-region', 'region', f.optional)}

        <Field id="pf-message" label={f.message}>
          <textarea id="pf-message" rows={4} value={vals.message} placeholder={f.messagePh} disabled={loading}
            onChange={e => set('message', e.target.value.slice(0, 1000))}
            style={{ ...baseInput(touched && errs.message), resize: 'vertical', minHeight: 96 }}
            onFocus={e => focusOn(e, touched && errs.message)} onBlur={focusOff} />
          {touched && errText(errs.message)}
        </Field>

        {/* honeypot — visually hidden, off-screen, not announced */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="pf-company">Company</label>
          <input id="pf-company" type="text" tabIndex={-1} autoComplete="off" value={vals.company}
            onChange={e => set('company', e.target.value)} />
        </div>

        {/* consent */}
        <div>
          <label htmlFor="pf-consent" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', fontSize: 13, color: '#4B5563', lineHeight: 1.5 }}>
            <input id="pf-consent" type="checkbox" checked={vals.consent} disabled={loading}
              onChange={e => set('consent', e.target.checked)}
              style={{ width: 18, height: 18, marginTop: 1, accentColor: '#006994', flexShrink: 0, cursor: 'pointer' }} />
            <span>{f.consent}{' '}
              <a href="#" onClick={e => e.preventDefault()} style={{ color: '#006994', fontWeight: 600, textDecoration: 'underline' }}>{f.consentLink}</a>
            </span>
          </label>
          {touched && errText(errs.consent)}
        </div>

        <button type="submit" disabled={loading} style={{
          marginTop: 4, background: loading ? '#5A6830' : '#6B7C3A', color: '#fff', border: 'none',
          borderRadius: 16, padding: '14px', fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
          cursor: loading ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          transition: 'background .2s' }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#5A6830'; }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#6B7C3A'; }}>
          {loading && <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)',
            borderTopColor: '#fff', borderRadius: 9999, display: 'inline-block', animation: 'pf-spin 0.7s linear infinite' }} />}
          {loading ? f.submitting : f.submit}
        </button>
      </form>
    </window.Card>
  );
}

/* Tiny prototype-only control to preview the form's states for review. */
function DemoSwitch({ lang, status, setStatus, reset }) {
  const d = window.PARTNERS_I18N[lang].demo;
  const cur = status === 'submitting' ? 'idle' : status;
  const opts = [['idle', d.normal], ['success', d.success], ['error', d.error]];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', marginBottom: 14 }}>
      <span style={{ fontSize: 10.5, color: '#B6BCC6', fontFamily: 'ui-monospace, monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.label}</span>
      <div style={{ display: 'flex', gap: 2, background: '#F3F4F6', borderRadius: 9999, padding: 2 }}>
        {opts.map(([k, label]) => (
          <button key={k} type="button" onClick={() => (k === 'idle' ? reset() : setStatus(k))} style={{
            border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 11, fontWeight: 600,
            padding: '4px 9px', borderRadius: 9999, transition: 'background .15s, color .15s',
            background: cur === k ? '#fff' : 'transparent', color: cur === k ? '#006994' : '#9CA3AF',
            boxShadow: cur === k ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}>{label}</button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { PartnerForm });
