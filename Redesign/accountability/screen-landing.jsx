/* Katharos · Screen 5 — Landing (ShockStat hero + before/after + leaderboards) */

function BeforeAfter({ seedB, seedA, label }) {
  const { T, PixPhoto } = window;
  return (
    <div style={{ flexShrink: 0, width: 200 }}>
      <div style={{ display: 'flex', gap: 4, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ flex: 1 }}><PixPhoto seed={seedB} height={92} radius={0} tag={false} patches={[]} /></div>
        <div style={{ flex: 1 }}><PixPhoto seed={seedA} height={92} radius={0} tag={false} patches={[]} /></div>
      </div>
      <div style={{ fontSize: 12, color: T.ink2, marginTop: 6, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function LandingScreen() {
  const { T, sev, CAT, Btn } = window;
  const champs = [['Δ. Μήλου', 92], ['Δ. Κερκυραίων', 80], ['Δ. Χαλανδρίου', 75]];
  const laggards = [['Δ. Θεσσαλονίκης', 23], ['Δ. Ηρακλείου', 14], ['Δ. Ρόδου', 9]];
  const topVoted = [
    { id: 'sewage', days: 84, votes: 41, muni: 'Δήμος Ηρακλείου' },
    { id: 'illegal_dump', days: 72, votes: 38, muni: 'Δήμος Θεσσαλονίκης' },
    { id: 'coastal_pollution', days: 61, votes: 29, muni: 'Δήμος Ρόδου' },
    { id: 'illegal_dump', days: 47, votes: 24, muni: 'Δήμος Βόλου' },
    { id: 'construction_debris', days: 38, votes: 19, muni: 'Δήμος Καλαμαριάς' },
  ];
  return (
    <window.PhoneFrame height={1320} contentBg="#fff">
      <window.StatusBar />
      {/* header */}
      <div style={{ background: T.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', flexShrink: 0 }}>
        <window.Lockup on="blue" mark={24} />
        <span style={{ display: 'flex', gap: 5, fontSize: 12 }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '3px 7px', borderRadius: 8, fontWeight: 700 }}>EL</span>
          <span style={{ opacity: 0.7, padding: '3px 7px' }}>EN</span><span style={{ opacity: 0.7, padding: '3px 7px' }}>DE</span></span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {/* hero */}
        <div style={{ background: 'linear-gradient(160deg, #006994, #005A80)', color: '#fff', padding: '34px 22px 38px', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 12px', fontSize: 34, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', color: '#fff' }}>Κράτα την Ελλάδα <span style={{ color: '#A4B16E' }}>καθαρή</span></h1>
          <p style={{ margin: '0 auto 26px', fontSize: 15, color: '#CFE4FB', lineHeight: 1.5, maxWidth: 290 }}>Φωτογράφισε σκουπίδια και παράνομες χωματερές. Τα αναφέρουμε αυτόματα στον αρμόδιο δήμο.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn kind="action" full style={{ borderRadius: 24, boxShadow: '0 8px 18px rgba(0,0,0,0.22)' }}>📷 Κάνε αναφορά</Btn>
            <button style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 24, padding: '13px', fontSize: 15, fontWeight: 600, fontFamily: 'inherit' }}>🗺️ Δες τον χάρτη</button>
          </div>
        </div>

        {/* Top 10 most upvoted */}
        <div style={{ padding: '26px 22px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: T.primary }}>🔥 Οι πιο ψηφισμένες</h2>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.action }}>Top 10 →</span>
          </div>
          <p style={{ margin: '0 0 14px', fontSize: 13, color: T.ink2 }}>Οι αναφορές που οι πολίτες θέλουν πιο πολύ να λυθούν</p>
          {topVoted.map((r, i) => {
            const s = sev(r.days), c = CAT[r.id];
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0', borderBottom: i < topVoted.length - 1 ? `1px solid ${T.line}` : 'none' }}>
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

        {/* before/after */}
        <div style={{ padding: '28px 0 24px' }}>
          <div style={{ padding: '0 22px', marginBottom: 14 }}>
            <h2 style={{ margin: '0 0 3px', fontSize: 21, fontWeight: 800, color: T.primary }}>Αυτό πετύχαμε μαζί</h2>
            <p style={{ margin: 0, fontSize: 13, color: T.ink2 }}>612 σημεία καθαρίστηκαν μετά από αναφορές πολιτών</p>
          </div>
          <div style={{ display: 'flex', gap: 12, overflow: 'hidden', padding: '0 22px' }}>
            <BeforeAfter seedB="gc10" seedA="gc-clean1" label="Δ. Θεσσαλονίκης · 12 ημ." />
            <BeforeAfter seedB="gc30" seedA="gc-clean2" label="Δ. Μήλου · 8 ημ." />
          </div>
        </div>

        {/* leaderboards */}
        <div style={{ padding: '4px 22px 24px' }}>
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
            {laggards.map(([n, u]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: T.ink }}>{n}</span>
                <div style={{ width: 90, height: 6, background: T.line, borderRadius: 9999, overflow: 'hidden' }}><div style={{ height: '100%', width: Math.min(100, u * 4) + '%', background: '#EA580C' }} /></div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#EA580C', width: 34, textAlign: 'right' }}>{u}</span>
              </div>
            ))}
          </window.Card>
        </div>

        {/* footer band */}
        <div style={{ background: T.primary, color: '#fff', textAlign: 'center', padding: '26px 16px' }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Katharos 2026</p>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#8BBDCD' }}>Για μια καθαρή Ελλάδα 🌿</p>
        </div>
      </div>
    </window.PhoneFrame>
  );
}

Object.assign(window, { LandingScreen });
