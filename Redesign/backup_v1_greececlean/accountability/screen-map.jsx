/* GreeceClean · Screen 2 — Map (severity pins, filters, pin preview) + empty state */

function MapPin({ x, y, big, cluster, days }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -100%)', zIndex: big ? 5 : 2 }}>
      <window.MapMarker size={big ? 44 : 30} active={big} cluster={cluster} days={days} />
    </div>
  );
}

function FilterChips() {
  const { T } = window;
  const chips = ['Κοντά μου', 'Ανοιχτές', 'Κατηγορία', 'Δήμος'];
  return (
    <div style={{ display: 'flex', gap: 8, overflow: 'hidden' }}>
      {chips.map((c, i) => (
        <span key={c} style={{ flexShrink: 0, background: i === 1 ? T.primary : '#fff', color: i === 1 ? '#fff' : T.ink2,
          border: `1px solid ${i === 1 ? T.primary : T.line2}`, borderRadius: 9999, padding: '7px 13px', fontSize: 12.5,
          fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          {c}{i > 1 && <span style={{ fontSize: 9 }}>▾</span>}</span>
      ))}
    </div>
  );
}

function MapShell({ children, heat }) {
  const { T } = window;
  return (
    <window.PhoneFrame height={812} contentBg="#E8EEF0">
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        <iframe title="map" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, filter: heat ? 'saturate(0.6)' : 'none' }}
          src="https://www.openstreetmap.org/export/embed.html?bbox=22.80%2C40.55%2C23.05%2C40.70&layer=mapnik" />
        {/* top overlay: status + search + filters */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '0 0 10px', background: 'linear-gradient(#E8EEF0, rgba(232,238,240,0.0))' }}>
          <window.StatusBar />
          <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ flex: 1, background: '#fff', borderRadius: 14, padding: '11px 14px', fontSize: 13, color: T.ink3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>🔍 Αναζήτηση δήμου ή περιοχής</div>
              <div style={{ width: 42, height: 42, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}><window.BrandMark size={22} /></div>
            </div>
            <FilterChips />
          </div>
        </div>
        {children}
      </div>
      <window.BottomTab active="map" />
    </window.PhoneFrame>
  );
}

function MapNormal() {
  const { T, sev, CAT } = window;
  return (
    <MapShell>
      <MapPin x="46%" y="44%" big days={47} />
      <MapPin x="66%" y="38%" days={4} />
      <MapPin x="32%" y="56%" cluster={5} days={72} />
      <MapPin x="58%" y="62%" days={21} />
      <MapPin x="74%" y="56%" cluster={2} days={34} />
      <MapPin x="40%" y="70%" cluster={4} days={9} />
      {/* legend — severity by days open */}
      <div style={{ position: 'absolute', left: 14, top: 168, background: 'rgba(255,255,255,0.95)', borderRadius: 12,
        padding: '9px 11px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {[['Φρέσκο', 4], ['Πρόσφατο', 21], ['Παλαιό', 45], ['Αγνοείται', 80]].map(([l, d]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <window.MapMarker size={15} days={d} />
            <span style={{ fontSize: 10, color: T.ink2, fontWeight: 600 }}>{l}</span>
          </div>
        ))}
      </div>
      {/* pin preview card */}
      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
        <div style={{ background: '#fff', borderRadius: 18, padding: 12, boxShadow: '0 6px 20px rgba(0,0,0,0.18)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 64, flexShrink: 0 }}><window.PixPhoto seed="gc30" height={64} radius={12} tag={false} patches={[]} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <window.SeverityCounter days={47} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Παράνομη Χωματερή</div>
            <div style={{ fontSize: 11, color: T.ink3 }}>👍 13 · 🔴 5 · Δ. Θεσσαλονίκης</div>
          </div>
          <span style={{ fontSize: 20, color: T.ink3 }}>›</span>
        </div>
      </div>
    </MapShell>
  );
}

function MapEmpty() {
  const { T, Btn } = window;
  return (
    <MapShell>
      <div style={{ position: 'absolute', left: 20, right: 20, top: '46%', transform: 'translateY(-50%)' }}>
        <div style={{ background: '#fff', borderRadius: 22, padding: '28px 22px', textAlign: 'center', boxShadow: '0 8px 28px rgba(0,0,0,0.16)' }}>
          <div style={{ fontSize: 46, marginBottom: 10 }}>🗺️</div>
          <h3 style={{ margin: '0 0 6px', fontSize: 19, fontWeight: 800, color: T.primary }}>Καμία αναφορά στη Νάξο ακόμη</h3>
          <p style={{ margin: '0 0 18px', fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>Είδες σκουπίδια εδώ; Γίνε ο πρώτος που το αναφέρει — μία φωτογραφία αρκεί.</p>
          <Btn kind="action" full style={{ borderRadius: 18 }}>📷 Κάνε την πρώτη αναφορά</Btn>
        </div>
      </div>
    </MapShell>
  );
}

Object.assign(window, { MapNormal, MapEmpty });
