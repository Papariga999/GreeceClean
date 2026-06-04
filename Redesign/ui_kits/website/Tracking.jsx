/* Katharos — Report tracking page + public map view */

function Tracking() {
  const steps = ['Submitted', 'Verified', 'Municipality Notified', 'Cleaned Up'];
  const currentStep = 2; // 0-indexed: done up to "Municipality Notified"
  const [copied, setCopied] = React.useState(false);
  const trackingUrl = 'katharos.gr/r/ab12cd34ef56';

  const nearby = (dir, dist, label, id, muni) => (
    <a href="#" onClick={e => e.preventDefault()} style={{ flex: 1, background: '#fff', borderRadius: 24,
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', border: '1px solid #F3F4F6', display: 'flex',
      alignItems: 'center', gap: 12, padding: '12px 16px', textDecoration: 'none',
      flexDirection: dir === 'left' ? 'row' : 'row-reverse' }}>
      <span style={{ color: '#9CA3AF', fontSize: 18 }}>{dir === 'left' ? '←' : '→'}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flexDirection: dir === 'left' ? 'row' : 'row-reverse' }}>
        <window.CategoryBadge id={id} label="" size="sm" />
        <div style={{ minWidth: 0, textAlign: dir === 'left' ? 'left' : 'right' }}>
          <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 2px' }}>{dist}</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#006994', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</p>
          <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{muni}</p>
        </div>
      </div>
    </a>
  );

  return (
    <div style={{ background: '#F9FAFB', padding: '40px 16px', minHeight: 600 }}>
      <div style={{ maxWidth: 512, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#006994', margin: 0 }}>Report Status</h1>

        <div style={{ display: 'flex', gap: 8 }}>
          {nearby('left', '450 m', 'Illegal Landfill', 'illegal_dump', 'Δήμος Θεσσαλονίκης')}
          {nearby('right', '1.2 km', 'Roadside Litter', 'roadside_litter', 'Δήμος Καλαμαριάς')}
        </div>

        <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
          <img src="https://picsum.photos/seed/10/800/600" alt="report" style={{ width: '100%', maxHeight: 288, objectFit: 'cover', display: 'block' }} />
        </div>

        <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid #F3F4F6', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', height: 208 }}>
          <iframe title="map" style={{ width: '100%', height: '100%', border: 0 }} loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=22.89%2C40.62%2C22.92%2C40.65&layer=mapnik&marker=40.638%2C22.905" />
        </div>

        <window.Card>
          <dl style={{ fontSize: 14, color: '#4B5563', margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', gap: 8 }}><dt style={{ fontWeight: 500 }}>Category:</dt>
              <dd style={{ margin: 0 }}><window.CategoryBadge id="illegal_dump" label="Illegal Landfill" size="sm" /></dd></div>
            <div style={{ display: 'flex', gap: 8 }}><dt style={{ fontWeight: 500 }}>Municipality:</dt><dd style={{ margin: 0 }}>Δήμος Θεσσαλονίκης</dd></div>
            <div style={{ display: 'flex', gap: 8 }}><dt style={{ fontWeight: 500 }}>Submitted:</dt><dd style={{ margin: 0 }}>14 August 2023</dd></div>
            <div style={{ paddingTop: 8, borderTop: '1px solid #F3F4F6', marginTop: 2 }}>
              <dt style={{ fontWeight: 500, color: '#374151', marginBottom: 4 }}>Description:</dt>
              <dd style={{ margin: 0, color: '#4B5563', lineHeight: 1.5 }}>Large pile of construction debris and household waste dumped on the roadside near the ring road.</dd></div>
          </dl>
        </window.Card>

        <window.Card>
          <h2 style={{ fontWeight: 600, color: '#006994', margin: '0 0 24px', fontSize: 16 }}>Progress</h2>
          <ol style={{ position: 'relative', margin: 0, padding: 0, listStyle: 'none', marginLeft: 12 }}>
            {steps.map((label, i) => {
              const done = i <= currentStep;
              const isLast = i === steps.length - 1;
              return (
                <li key={label} style={{ position: 'relative', display: 'flex', gap: 16, paddingBottom: isLast ? 0 : 28 }}>
                  {!isLast && <span style={{ position: 'absolute', left: 14, top: 28, bottom: 0, width: 2,
                    transform: 'translateX(-50%)', background: done ? '#6B7C3A' : '#E5E7EB' }} />}
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 9999, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, border: '2px solid',
                    background: done ? '#6B7C3A' : '#fff', borderColor: done ? '#6B7C3A' : '#D1D5DB',
                    color: done ? '#fff' : '#9CA3AF' }}>{done ? '✓' : i + 1}</span>
                  <span style={{ paddingTop: 2, fontSize: 14, fontWeight: 500, color: done ? '#1F2937' : '#9CA3AF' }}>{label}</span>
                </li>
              );
            })}
          </ol>
        </window.Card>

        <window.Card>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#4B5563', margin: '0 0 12px' }}>Share</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="#" onClick={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, width: '100%', padding: '12px', borderRadius: 24, fontSize: 14, fontWeight: 600, color: '#fff',
              textDecoration: 'none', background: '#25D366' }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              style={{ width: '100%', padding: '12px', borderRadius: 24, border: 'none', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', color: '#fff', background: copied ? '#6B7C3A' : '#006994' }}>
              {copied ? '✓ Copied!' : '📋 Copy Link'}</button>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', wordBreak: 'break-all', margin: 0 }}>{trackingUrl}</p>
          </div>
        </window.Card>
      </div>
    </div>
  );
}

function MapView() {
  return (
    <div style={{ position: 'relative', height: 640 }}>
      <iframe title="Greece map" style={{ width: '100%', height: '100%', border: 0 }}
        src="https://www.openstreetmap.org/export/embed.html?bbox=20.5%2C35.0%2C28.3%2C41.5&layer=mapnik" />
      <div style={{ position: 'absolute', top: 16, left: 16, background: '#fff', borderRadius: 16,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px 16px', maxWidth: 280 }}>
        <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#006994', fontSize: 14 }}>Public Report Map</p>
        <p style={{ margin: 0, fontSize: 12, color: '#6B7280' }}>Approved reports across Greece. Tap a pin to view status and share.</p>
      </div>
    </div>
  );
}

Object.assign(window, { Tracking, MapView });
