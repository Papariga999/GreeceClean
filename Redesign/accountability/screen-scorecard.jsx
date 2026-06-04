/* Katharos · Screen 6 — Municipality Scorecard (shareable accountability page) */

function StatBox({ value, label, color }) {
  const { T } = window;
  return (
    <div style={{ flex: 1, background: '#fff', border: `1px solid ${T.line}`, borderRadius: 14, padding: '12px 8px', textAlign: 'center' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: color || T.ink, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10.5, color: T.ink3, marginTop: 5, lineHeight: 1.2 }}>{label}</div>
    </div>
  );
}

function ScorecardScreen() {
  const { T, Btn } = window;
  const bars = [40, 55, 48, 62, 58, 71, 64, 78];
  return (
    <window.PhoneFrame height={690} contentBg={T.bg}>
      <window.StatusBar />
      <div style={{ background: T.primary, color: '#fff', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', flexShrink: 0 }}>
        <span style={{ fontSize: 22 }}>‹</span><span style={{ fontSize: 17, fontWeight: 700, flex: 1 }}>Καρτέλα Δήμου</span><span style={{ fontSize: 18 }}>⤴</span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* hero */}
        <div style={{ background: 'linear-gradient(140deg, #006994, #005A80)', borderRadius: 20, padding: 18, color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>🏛️ Δήμος</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>Θεσσαλονίκης</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>Κεντρική Μακεδονία</div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(234,88,12,0.25)', borderRadius: 16, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: '#FED7AA', fontWeight: 600 }}>Κατάταξη</div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>#38</div>
              <div style={{ fontSize: 10, color: '#FED7AA' }}>από 47</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <StatBox value="54%" label="Λύθηκαν" color={T.action} />
          <StatBox value="31η" label="⌀ χρόνος αντίδρ." color="#EA580C" />
          <StatBox value="23" label="Ανοιχτές" color="#DC2626" />
          <StatBox value="27" label="Καθαρίστηκαν" color={T.action} />
        </div>

        {/* trend */}
        <window.Card style={{ padding: 16 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 700, color: T.ink, fontSize: 14 }}>Ποσοστό λύσης ανά μήνα</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 90 }}>
            {bars.map((b, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: b + '%', background: i === bars.length - 1 ? T.action : T.primary200 || '#8BBDCD', borderRadius: '4px 4px 0 0', opacity: i === bars.length - 1 ? 1 : 0.5 }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 9, color: T.ink3 }}>
            <span>Οκτ</span><span>Νοε</span><span>Δεκ</span><span>Ιαν</span><span>Φεβ</span><span>Μαρ</span><span>Απρ</span><span>Μάι</span>
          </div>
        </window.Card>

        <window.Card style={{ padding: 14, background: '#FFF7ED', border: 'none' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#9A3412', lineHeight: 1.5 }}>
            <b>23 αναφορές</b> περιμένουν δράση — οι 6 είναι ανοιχτές πάνω από 60 ημέρες.</p>
        </window.Card>

        <Btn kind="primary" full style={{ borderRadius: 18 }}>⤴ Κοινοποίησε την καρτέλα</Btn>
      </div>
    </window.PhoneFrame>
  );
}

Object.assign(window, { ScorecardScreen });
