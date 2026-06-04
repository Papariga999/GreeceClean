/* GreeceClean · Screen 8 — ShareCard artefacts (OG share images)
   3 variants: new report · ignored (pressure) · resolved (celebration).
   Designed at 600×340 (≈1.91:1 OG ratio). */

function ShareBrand({ light }) {
  return <window.Lockup on={light ? 'blue' : 'light'} mark={20} />;
}

function MiniMap({ w = 150, h = 96 }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 12, overflow: 'hidden', position: 'relative', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
      <iframe title="m" style={{ width: '100%', height: '100%', border: 0, pointerEvents: 'none' }}
        src="https://www.openstreetmap.org/export/embed.html?bbox=22.86%2C40.60%2C22.98%2C40.68&layer=mapnik&marker=40.638%2C22.92" />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 2px rgba(0,91,174,0.25)' }} />
    </div>
  );
}

function MuniTag({ name, light }) {
  const { T } = window;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: light ? 'rgba(255,255,255,0.2)' : T.primary50,
      color: light ? '#fff' : T.primary, fontSize: 14, fontWeight: 700, padding: '6px 14px', borderRadius: 9999 }}>
      🏛️ {name}</span>
  );
}

// variant: 'new' | 'ignored' | 'resolved'
function ShareCard({ variant }) {
  const { T, sev, PixPhoto } = window;
  const W = 600, H = 340;

  if (variant === 'ignored') {
    const s = sev(47);
    return (
      <div style={{ width: W, height: H, background: '#1A0A0A', display: 'flex', position: 'relative', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ width: 250, position: 'relative' }}>
          <PixPhoto seed="gc10" height={H} radius={0} patches={[{ x: '55%', y: '55%', w: 80, h: 32 }]} tag={false} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, #1A0A0A)' }} />
        </div>
        <div style={{ flex: 1, padding: '26px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <ShareBrand light />
            <span style={{ background: s.bg, color: s.fg, fontSize: 12, fontWeight: 800, padding: '5px 11px', borderRadius: 9999, textTransform: 'uppercase', letterSpacing: '0.04em' }}>αγνοείται</span>
          </div>
          <div>
            <div style={{ fontSize: 84, fontWeight: 800, color: '#F87171', lineHeight: 0.95, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>47</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 2 }}>ημέρες χωρίς δράση</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>Παράνομη χωματερή · αναφέρθηκε από 14 πολίτες</div>
          </div>
          <MuniTag name="Δήμος Θεσσαλονίκης" light />
        </div>
      </div>
    );
  }

  if (variant === 'resolved') {
    return (
      <div style={{ width: W, height: H, background: 'linear-gradient(135deg, #39B24A, #2E7D34)', display: 'flex', flexDirection: 'column', padding: '24px 28px', position: 'relative', overflow: 'hidden', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <ShareBrand light />
          <span style={{ fontSize: 28 }}>🎉</span>
        </div>
        <div style={{ display: 'flex', gap: 12, flex: 1 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, marginBottom: 5 }}>ΠΡΙΝ</span>
            <PixPhoto seed="gc10" height={150} radius={12} tag={false} patches={[{ x: '55%', y: '52%', w: 50, h: 22 }]} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.95, marginBottom: 5 }}>ΜΕΤΑ ✅</span>
            <PixPhoto seed="gc-clean-meadow" height={150} radius={12} tag={false} patches={[]} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>Καθαρίστηκε σε 12 ημέρες</div>
          <MuniTag name="Δ. Θεσσαλονίκης" light />
        </div>
      </div>
    );
  }

  // new
  return (
    <div style={{ width: W, height: H, background: '#fff', display: 'flex', position: 'relative', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: 250 }}>
        <PixPhoto seed="gc70" height={H} radius={0} patches={[{ x: '20%', y: '60%', w: 70, h: 30 }]} tag={true} />
      </div>
      <div style={{ flex: 1, padding: '24px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <ShareBrand />
          <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: 12, fontWeight: 800, padding: '5px 11px', borderRadius: 9999, textTransform: 'uppercase', letterSpacing: '0.04em' }}>νέα αναφορά</span>
        </div>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ width: 34, height: 34, borderRadius: 9999, background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🗑️</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: T.ink }}>Παράνομη Χωματερή</span>
          </div>
          <div style={{ fontSize: 15, color: T.ink2, lineHeight: 1.45 }}>Αναφέρθηκε μόλις τώρα. Βοήθησε να μην αγνοηθεί — κοινοποίησέ το.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <MuniTag name="Δήμος Θεσσαλονίκης" />
          <MiniMap w={92} h={58} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ShareCard });
