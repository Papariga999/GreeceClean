/* GreeceClean website kit — app shell + view router */

function App() {
  const VIEWS = ['home', 'report', 'map', 'tracking', 'partners', 'region'];
  const fromHash = () => { const h = (location.hash || '').replace('#', ''); return VIEWS.includes(h) ? h : 'home'; };
  const [view, setView] = React.useState(fromHash);
  const [lang, setLang] = React.useState('EN');   // EL | EN | DE — drives the trilingual Partners page
  const onNav = (v) => { setView(v); if (history.replaceState) history.replaceState(null, '', '#' + v); window.scrollTo({ top: 0 }); };

  React.useEffect(() => {
    const onHash = () => { const h = (location.hash || '').replace('#', ''); if (VIEWS.includes(h)) setView(h); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', flexDirection: 'column' }}>
      <window.Header onNav={onNav} active={view} lang={lang} setLang={setLang} />
      <main style={{ flex: 1 }}>
        {view === 'home' && <window.Landing onNav={onNav} lang={lang} />}
        {view === 'report' && (
          <div style={{ background: '#fff' }}>
            <window.ReportFlow onTracking={() => onNav('tracking')} onNav={onNav} lang={lang} />
          </div>
        )}
        {view === 'map' && <window.MapView />}
        {view === 'tracking' && <window.Tracking />}
        {view === 'partners' && <window.Partners lang={lang} onNav={onNav} />}
        {view === 'region' && <window.RegionLayer lang={lang} onNav={onNav} />}
      </main>
      {['map', 'tracking'].includes(view) && <window.SupportBanner lang={lang} onNav={onNav} />}
      <window.SiteFooter onNav={onNav} lang={lang} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
