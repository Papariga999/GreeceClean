/* Katharos · Clickable prototype — screen bodies (wired to `nav`) */

function Status({ dark }) { return <window.StatusBar dark={dark} />; }

function BackBar({ title, onBack, share }) {
  const { T } = window;
  return (
    <div style={{ background: T.primary, color: '#fff', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', flexShrink: 0 }}>
      <span onClick={onBack} style={{ fontSize: 24, lineHeight: 1, cursor: 'pointer', width: 24 }}>‹</span>
      <span style={{ fontSize: 17, fontWeight: 700, flex: 1 }}>{title}</span>
      {share && <span style={{ fontSize: 18, cursor: 'pointer' }}>⤴</span>}
    </div>
  );
}

/* ───────── LANDING ───────── */
function LandingBody({ nav }) {
  const { T, ShockStat, Btn } = window;
  const champs = [['Δ. Μήλου', 92], ['Δ. Κερκυραίων', 80], ['Δ. Χαλανδρίου', 75]];
  const lag = [['Δ. Θεσσαλονίκης', 23], ['Δ. Ηρακλείου', 14], ['Δ. Ρόδου', 9]];
  const topVoted = [
    { id: 'sewage', days: 84, votes: 41, muni: 'Δήμος Ηρακλείου' },
    { id: 'illegal_dump', days: 72, votes: 38, muni: 'Δήμος Θεσσαλονίκης' },
    { id: 'coastal_pollution', days: 61, votes: 29, muni: 'Δήμος Ρόδου' },
    { id: 'illegal_dump', days: 47, votes: 24, muni: 'Δήμος Βόλου' },
    { id: 'construction_debris', days: 38, votes: 19, muni: 'Δήμος Καλαμαριάς' },
  ];
  return (
    <div>
      <div style={{ background: T.primary, color: '#fff' }}>
        <Status dark />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 12px' }}>
          <window.Lockup on="blue" mark={24} />
          <span style={{ display: 'flex', gap: 5, fontSize: 12 }}><span style={{ background: 'rgba(255,255,255,0.2)', padding: '3px 7px', borderRadius: 8, fontWeight: 700 }}>EL</span><span style={{ opacity: 0.7, padding: '3px 7px' }}>EN</span><span style={{ opacity: 0.7, padding: '3px 7px' }}>DE</span></span>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(160deg, #006994, #005A80)', color: '#fff', padding: '34px 22px 36px', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 34, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', color: '#fff' }}>Κράτα την Ελλάδα <span style={{ color: '#A4B16E' }}>καθαρή</span></h1>
        <p style={{ margin: '0 auto 26px', fontSize: 15, color: '#CFE4FB', lineHeight: 1.5, maxWidth: 290 }}>Φωτογράφισε σκουπίδια και παράνομες χωματερές. Τα αναφέρουμε αυτόματα στον αρμόδιο δήμο.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn kind="action" full onClick={() => nav.startReport()} style={{ borderRadius: 24, boxShadow: '0 8px 18px rgba(0,0,0,0.22)' }}>📷 Κάνε αναφορά</Btn>
          <button onClick={() => nav.enter('map')} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 24, padding: '13px', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>🗺️ Δες τον χάρτη</button>
        </div>
      </div>

      {/* Top 10 most upvoted */}
      <div style={{ padding: '26px 22px 6px', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: T.primary }}>🔥 Οι πιο ψηφισμένες</h2>
          <span onClick={() => nav.enter('top')} style={{ fontSize: 13, fontWeight: 700, color: T.action, cursor: 'pointer' }}>Top 10 →</span>
        </div>
        <p style={{ margin: '0 0 14px', fontSize: 13, color: T.ink2 }}>Οι αναφορές που οι πολίτες θέλουν πιο πολύ να λυθούν</p>
        {topVoted.map((r, i) => {
          const s = sev(r.days), c = CAT[r.id];
          return (
            <div key={i} onClick={() => nav.push({ name: 'tracking', days: r.days })} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0', borderBottom: i < topVoted.length - 1 ? `1px solid ${T.line}` : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: i < 3 ? T.primary : T.ink3, width: 18, textAlign: 'center' }}>{i + 1}</span>
              <div style={{ position: 'relative', flexShrink: 0, width: 48 }}>
                <window.PixPhoto seed={'gc' + (10 * (i + 1))} height={48} radius={11} tag={false} patches={[]} />
                <span style={{ position: 'absolute', top: -4, right: -4, width: 11, height: 11, borderRadius: 9999, background: s.fg, border: '2px solid #fff' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, display: 'flex', alignItems: 'center', gap: 5 }}><span>{c.icon}</span><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.el}</span></div>
                <div style={{ fontSize: 11.5, color: T.ink3, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.muni} · ⏱️ {r.days}η</div>
              </div>
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', background: T.primary50, borderRadius: 12, padding: '6px 11px' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: T.primary, lineHeight: 1 }}>{r.votes}</span>
                <span style={{ fontSize: 10, marginTop: 1 }}>👍</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: '26px 0 22px', background: '#fff' }}>
        <div style={{ padding: '0 22px', marginBottom: 14 }}>
          <h2 style={{ margin: '0 0 3px', fontSize: 21, fontWeight: 800, color: T.primary }}>Αυτό πετύχαμε μαζί</h2>
          <p style={{ margin: 0, fontSize: 13, color: T.ink2 }}>612 σημεία καθαρίστηκαν μετά από αναφορές πολιτών</p>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 22px' }}>
          {[['gc10', 'gc-c1', 'Δ. Θεσσαλονίκης · 12 ημ.'], ['gc30', 'gc-c2', 'Δ. Μήλου · 8 ημ.'], ['gc70', 'gc-c3', 'Δ. Ρόδου · 19 ημ.']].map(([b, a, l]) => (
            <div key={l} style={{ flexShrink: 0, width: 200 }}>
              <div style={{ display: 'flex', gap: 4, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ flex: 1 }}><window.PixPhoto seed={b} height={92} radius={0} tag={false} patches={[]} /></div>
                <div style={{ flex: 1 }}><window.PixPhoto seed={a} height={92} radius={0} tag={false} patches={[]} /></div>
              </div>
              <div style={{ fontSize: 12, color: T.ink2, marginTop: 6, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '4px 22px 24px', background: '#fff' }}>
        <h2 style={{ margin: '0 0 3px', fontSize: 21, fontWeight: 800, color: T.primary }}>Πίνακας Αντίκτυπου</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: T.ink2 }}>Ποιοι δήμοι δρουν — και ποιοι όχι</p>
        <window.Card style={{ marginBottom: 12, padding: 16 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 700, color: T.primary, fontSize: 14 }}>🏆 Πρωταθλητές καθαριότητας</p>
          {champs.map(([n, p]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: T.ink }}>{n}</span>
              <div style={{ width: 90, height: 6, background: T.line, borderRadius: 9999, overflow: 'hidden' }}><div style={{ height: '100%', width: p + '%', background: T.action }} /></div>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.action, width: 34, textAlign: 'right' }}>{p}%</span>
            </div>
          ))}
        </window.Card>
        <window.Card style={{ padding: 16 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 700, color: T.primary, fontSize: 14 }}>⚠️ Περιθώρια βελτίωσης</p>
          {lag.map(([n, u]) => (
            <div key={n} onClick={() => nav.push({ name: 'scorecard' })} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer' }}>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: T.ink }}>{n}</span>
              <div style={{ width: 90, height: 6, background: T.line, borderRadius: 9999, overflow: 'hidden' }}><div style={{ height: '100%', width: Math.min(100, u * 4) + '%', background: '#EA580C' }} /></div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#EA580C', width: 34, textAlign: 'right' }}>{u}</span>
            </div>
          ))}
        </window.Card>
      </div>
      <div style={{ background: T.primary, color: '#fff', textAlign: 'center', padding: '24px 16px' }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Katharos 2026</p>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#8BBDCD' }}>Για μια καθαρή Ελλάδα 🌿</p>
      </div>
    </div>
  );
}

/* ───────── MAP ───────── */
function Pin({ x, y, big, cluster, days, onClick }) {
  return (
    <div onClick={onClick} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -100%)', zIndex: big ? 5 : 2, cursor: 'pointer' }}>
      <window.MapMarker size={big ? 44 : 30} active={big} cluster={cluster} days={days} />
    </div>
  );
}
function MapBody({ nav }) {
  const { T, SEV_STOPS, SeverityCounter } = window;
  const [area, setArea] = React.useState('thess'); // thess | naxos (empty)
  const [heat, setHeat] = React.useState(false);
  const empty = area === 'naxos';
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', background: '#E8EEF0' }}>
      <iframe title="map" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, filter: heat ? 'saturate(0.6)' : 'none' }}
        src={empty ? "https://www.openstreetmap.org/export/embed.html?bbox=25.30%2C36.95%2C25.60%2C37.18&layer=mapnik" : "https://www.openstreetmap.org/export/embed.html?bbox=22.80%2C40.55%2C23.05%2C40.70&layer=mapnik"} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'linear-gradient(#E8EEF0, rgba(232,238,240,0))', paddingBottom: 10 }}>
        <Status />
        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div onClick={() => nav.home()} title="Αρχική" style={{ width: 42, height: 42, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', flexShrink: 0 }}><window.BrandMark size={22} /></div>
            <div style={{ flex: 1, background: '#fff', borderRadius: 14, padding: '11px 14px', fontSize: 13, color: T.ink3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>🔍 Αναζήτηση δήμου ή περιοχής</div>
            <div onClick={() => setHeat(h => !h)} style={{ width: 42, height: 42, borderRadius: 14, background: heat ? T.primary : '#fff', color: heat ? '#fff' : T.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: 18, cursor: 'pointer' }}>🔥</div>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            {[['thess', 'Θεσσαλονίκη'], ['naxos', 'Νάξος']].map(([k, l]) => (
              <span key={k} onClick={() => setArea(k)} style={{ flexShrink: 0, background: area === k ? T.primary : '#fff', color: area === k ? '#fff' : T.ink2, border: `1px solid ${area === k ? T.primary : T.line2}`, borderRadius: 9999, padding: '7px 13px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>📍 {l}</span>
            ))}
            {['Ανοιχτές', 'Κατηγορία'].map(c => <span key={c} style={{ flexShrink: 0, background: '#fff', color: T.ink2, border: `1px solid ${T.line2}`, borderRadius: 9999, padding: '7px 13px', fontSize: 12.5, fontWeight: 600, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>{c} ▾</span>)}
          </div>
        </div>
      </div>
      {!empty && <>
        <Pin x="46%" y="46%" big days={47} onClick={() => nav.push({ name: 'tracking', days: 47 })} />
        <Pin x="66%" y="40%" days={8} onClick={() => nav.push({ name: 'tracking', days: 8 })} />
        <Pin x="32%" y="58%" cluster={5} days={72} onClick={() => nav.push({ name: 'tracking', days: 72 })} />
        <Pin x="58%" y="64%" days={3} onClick={() => nav.push({ name: 'tracking', days: 3 })} />
        <Pin x="74%" y="56%" cluster={2} days={24} onClick={() => nav.push({ name: 'tracking', days: 24 })} />
        <div onClick={() => nav.push({ name: 'tracking', days: 47 })} style={{ position: 'absolute', left: 14, right: 14, bottom: 14, cursor: 'pointer' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 12, boxShadow: '0 6px 20px rgba(0,0,0,0.18)', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 64, flexShrink: 0 }}><window.PixPhoto seed="gc30" height={64} radius={12} tag={false} patches={[]} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <SeverityCounter days={47} />
              <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, marginTop: 4 }}>Παράνομη Χωματερή</div>
              <div style={{ fontSize: 11, color: T.ink3 }}>👍 13 · 🔴 5 · Δ. Θεσσαλονίκης</div>
            </div>
            <span style={{ fontSize: 20, color: T.ink3 }}>›</span>
          </div>
        </div>
      </>}
      {empty && (
        <div style={{ position: 'absolute', left: 20, right: 20, top: '46%', transform: 'translateY(-50%)' }}>
          <div style={{ background: '#fff', borderRadius: 22, padding: '28px 22px', textAlign: 'center', boxShadow: '0 8px 28px rgba(0,0,0,0.16)' }}>
            <div style={{ fontSize: 46, marginBottom: 10 }}>🗺️</div>
            <h3 style={{ margin: '0 0 6px', fontSize: 19, fontWeight: 800, color: T.primary }}>Καμία αναφορά στη Νάξο ακόμη</h3>
            <p style={{ margin: '0 0 18px', fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>Είδες σκουπίδια εδώ; Γίνε ο πρώτος που το αναφέρει — μία φωτογραφία αρκεί.</p>
            <window.Btn kind="action" full onClick={() => nav.startReport()} style={{ borderRadius: 18 }}>📷 Κάνε την πρώτη αναφορά</window.Btn>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────── TOP-10 ───────── */
function TopBody({ nav }) {
  const { T, sev, CAT } = window;
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => { const t = setTimeout(() => setLoading(false), 1100); return () => clearTimeout(t); }, []);
  const rows = [
    { id: 'sewage', days: 84, votes: 41, muni: 'Δήμος Ηρακλείου' },
    { id: 'illegal_dump', days: 72, votes: 38, muni: 'Δήμος Θεσσαλονίκης' },
    { id: 'coastal_pollution', days: 61, votes: 29, muni: 'Δήμος Ρόδου' },
    { id: 'illegal_dump', days: 47, votes: 24, muni: 'Δήμος Βόλου' },
    { id: 'construction_debris', days: 38, votes: 19, muni: 'Δήμος Καλαμαριάς' },
    { id: 'abandoned_vehicle', days: 26, votes: 14, muni: 'Δήμος Χαλανδρίου' },
    { id: 'roadside_litter', days: 12, votes: 9, muni: 'Δήμος Θέρμης' },
  ];
  const Sk = ({ w, h, r = 6 }) => <div style={{ width: w, height: h, borderRadius: r, background: T.line2 }} />;
  return (
    <div>
      <Status />
      <div style={{ padding: '6px 16px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h1 style={{ margin: '0 0 2px', fontSize: 24, fontWeight: 800, color: T.primary }}>🔥 Τα πιο επείγοντα</h1>
          <p style={{ margin: 0, fontSize: 13, color: T.ink2 }}>Ψηφισμένα από πολίτες · ανοιχτά εδώ και καιρό</p>
        </div>
        <div onClick={() => nav.home()} title="Αρχική" style={{ width: 38, height: 38, borderRadius: 12, background: T.primary50, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, marginTop: 2 }}><window.BrandMark size={20} /></div>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '0 16px 12px' }}>
        {['Κοντά μου', 'Ο δήμος μου', 'Πανελλαδικά'].map((t, i) => <span key={t} style={{ flex: 1, textAlign: 'center', fontSize: 12.5, fontWeight: 700, padding: '8px 4px', borderRadius: 9999, background: i === 0 ? T.primary : '#fff', color: i === 0 ? '#fff' : T.ink2, border: `1px solid ${i === 0 ? T.primary : T.line2}` }}>{t}</span>)}
      </div>
      <div style={{ padding: '0 16px 16px', animation: loading ? 'gc-pulse 1.4s ease-in-out infinite' : 'none' }}>
        <style>{`@keyframes gc-pulse{0%,100%{opacity:.5}50%{opacity:1}}`}</style>
        {loading ? Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderBottom: `1px solid ${T.line}` }}>
            <Sk w={16} h={18} /><Sk w={52} h={52} r={11} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}><Sk w="70%" h={12} /><Sk w="45%" h={10} /><Sk w="35%" h={10} /></div>
          </div>
        )) : rows.map((r, i) => {
          const s = sev(r.days), c = CAT[r.id];
          return (
            <div key={i} onClick={() => nav.push({ name: 'tracking', days: r.days })} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0', borderBottom: `1px solid ${T.line}`, cursor: 'pointer' }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: i < 3 ? T.primary : T.ink3, width: 22, textAlign: 'center' }}>{i + 1}</span>
              <div style={{ position: 'relative', flexShrink: 0, width: 52 }}>
                <window.PixPhoto seed={'gc' + (10 * (i + 1))} height={52} radius={11} tag={false} patches={[]} />
                <span style={{ position: 'absolute', top: -5, right: -5, width: 11, height: 11, borderRadius: 9999, background: s.fg, border: '2px solid #fff' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, display: 'flex', alignItems: 'center', gap: 5 }}><span>{c.icon}</span><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.el}</span></div>
                <div style={{ fontSize: 11.5, color: T.ink3, marginTop: 2 }}>{r.muni}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.primary }}>👍 {r.votes}</span>
                  <span style={{ background: s.bg, color: s.fg, fontSize: 10, fontWeight: 800, padding: '1px 7px', borderRadius: 9999 }}>⏱️ {r.days}η</span>
                </div>
              </div>
              <span style={{ fontSize: 17, color: T.ink3 }}>⤴</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { BackBar, LandingBody, MapBody, TopBody });
