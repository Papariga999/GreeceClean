/* Katharos · Clickable prototype — device shell + router */

const VIEW_META = {
  landing:  { scroll: 'auto',   tab: null },
  map:      { scroll: 'hidden', tab: 'map' },
  top:      { scroll: 'auto',   tab: 'top' },
  impact:   { scroll: 'auto',   tab: 'impact' },
  report:   { scroll: 'hidden', tab: null },
  success:  { scroll: 'hidden', tab: null },
  tracking: { scroll: 'hidden', tab: null },
  resolved: { scroll: 'hidden', tab: null },
  scorecard:{ scroll: 'hidden', tab: null },
};

function renderBody(view, nav) {
  switch (view.name) {
    case 'landing':  return <window.LandingBody nav={nav} />;
    case 'map':      return <window.MapBody nav={nav} />;
    case 'top':      return <window.TopBody nav={nav} />;
    case 'impact':   return <window.ImpactBody nav={nav} />;
    case 'report':   return <window.ReportFlowBody nav={nav} />;
    case 'success':  return <window.SuccessBody nav={nav} />;
    case 'tracking': return <window.TrackingBody nav={nav} days={view.days ?? 47} />;
    case 'resolved': return <window.ResolvedBody nav={nav} />;
    case 'scorecard':return <window.ScorecardBody nav={nav} />;
    default:         return null;
  }
}

function Proto() {
  const { BottomTab } = window;
  const [root, setRoot] = React.useState({ kind: 'landing' }); // {kind:'landing'} | {kind:'tab', tab}
  const [stack, setStack] = React.useState([]);
  const [anim, setAnim] = React.useState(0);
  const scrollRef = React.useRef(null);

  const nav = React.useMemo(() => ({
    enter: (t) => { setRoot({ kind: 'tab', tab: t }); setStack([]); setAnim(a => a + 1); },
    home: () => { setRoot({ kind: 'landing' }); setStack([]); setAnim(a => a + 1); },
    startReport: () => { setStack([{ name: 'report' }]); setAnim(a => a + 1); },
    onTab: (k) => { if (k === 'report') { setStack([{ name: 'report' }]); } else { setRoot({ kind: 'tab', tab: k }); setStack([]); } setAnim(a => a + 1); },
    push: (v) => { setStack(s => [...s, v]); setAnim(a => a + 1); },
    back: () => { setStack(s => s.slice(0, -1)); setAnim(a => a + 1); },
    replace: (v) => { setStack(s => [...s.slice(0, -1), v]); setAnim(a => a + 1); },
  }), []);

  const rootView = root.kind === 'landing' ? { name: 'landing' } : { name: root.tab };
  const view = stack.length ? stack[stack.length - 1] : rootView;
  const meta = VIEW_META[view.name] || { scroll: 'auto', tab: null };
  const showTab = stack.length === 0 && root.kind === 'tab';

  // brand splash on first load
  const [splash, setSplash] = React.useState(true);
  React.useEffect(() => { const t = setTimeout(() => setSplash(false), 1400); return () => clearTimeout(t); }, []);

  // reset scroll to top on view change
  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [anim]);

  // responsive scale to fit viewport
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 36) / 844, (window.innerWidth - 24) / 390));
    fit(); window.addEventListener('resize', fit); return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at 50% 0%, #1f2a35, #0d1318)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
        {/* device */}
        <div style={{ width: 390, height: 844, background: '#000', borderRadius: 52, padding: 12, boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 2px #2a3340' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden', background: '#fff', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {/* dynamic island */}
            <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 110, height: 30, background: '#000', borderRadius: 16, zIndex: 50 }} />
            {/* body */}
            <div key={anim} ref={scrollRef} style={{ flex: 1, overflowY: meta.scroll === 'auto' ? 'auto' : 'hidden', overflowX: 'hidden', position: 'relative', animation: 'gc-slide .26s cubic-bezier(.2,.7,.3,1)' }}>
              <style>{`@keyframes gc-slide{from{opacity:.4;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}} @keyframes gc-splash{0%,68%{opacity:1}100%{opacity:0;visibility:hidden}} @keyframes gc-splashpop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}} .proto-scroll::-webkit-scrollbar{display:none}`}</style>
              {renderBody(view, nav)}
            </div>
            {showTab && <BottomTab active={root.tab} onNav={nav.onTab} />}
            {splash && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: `linear-gradient(160deg, ${window.BRAND.blue}, ${window.BRAND.blueDark})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, animation: 'gc-splash 1.4s ease forwards' }}>
                <div style={{ animation: 'gc-splashpop .6s cubic-bezier(.3,1.5,.5,1)' }}><window.AppIcon size={104} /></div>
                <window.Lockup on="blue" mark={26} tagline />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* hint */}
      <div style={{ position: 'fixed', bottom: 14, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, textAlign: 'center', pointerEvents: 'none' }}>
        Διαδραστικό πρωτότυπο · πάτησε πινέζες, κουμπιά ψήφου, κοινοποίηση & τις καρτέλες
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Proto />);
