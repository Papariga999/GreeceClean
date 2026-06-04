/* Katharos — shared UI primitives + chrome (Header, Footer)
   Exports to window for cross-file use. */

const CATEGORIES = [
  { id: 'illegal_dump',        label: 'Illegal Landfill',    icon: '🗑️', tile: '#FEF2F2', circ: '#FEE2E2' },
  { id: 'construction_debris', label: 'Construction Rubble', icon: '🏗️', tile: '#FAFAF9', circ: '#F5F5F4' },
  { id: 'roadside_litter',     label: 'Roadside Litter',     icon: '🚮', tile: '#EFF6FF', circ: '#DBEAFE' },
  { id: 'plastics',            label: 'Plastics',            icon: '🧴', tile: '#F0FDFA', circ: '#CCFBF1' },
  { id: 'tires',               label: 'Tyres',               icon: '🛞', tile: '#F8FAFC', circ: '#F1F5F9' },
  { id: 'appliances',          label: 'Appliances',          icon: '🔌', tile: '#FEFCE8', circ: '#FEF9C3' },
  { id: 'abandoned_vehicle',   label: 'Abandoned Vehicle',   icon: '🚗', tile: '#FAF5FF', circ: '#F3E8FF' },
  { id: 'green_waste',         label: 'Green Waste',         icon: '🌿', tile: '#FFF7ED', circ: '#FFEDD5' },
  { id: 'bulky_items',         label: 'Bulky Items',         icon: '🛋️', tile: '#FFFBEB', circ: '#FEF3C7' },
  { id: 'coastal_pollution',   label: 'Coastal Pollution',   icon: '🌊', tile: '#ECFEFF', circ: '#CFFAFE' },
  { id: 'sewage',              label: 'Sewage & Chemicals',  icon: '☣️', tile: '#FFF1F2', circ: '#FFE4E6' },
  { id: 'other',               label: 'Other',               icon: '❓', tile: '#F9FAFB', circ: '#F3F4F6' },
];
const CAT_BY_ID = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

function CategoryBadge({ id, label, size = 'md' }) {
  const c = CAT_BY_ID[id] || { icon: '📍', circ: '#F3F4F6' };
  const d = size === 'sm' ? 28 : 36;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: d, height: d, borderRadius: 9999, background: c.circ,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size === 'sm' ? 15 : 19, flexShrink: 0 }}>{c.icon}</span>
      {label && <span>{label}</span>}
    </span>
  );
}

function Header({ onNav, active, lang: langProp, setLang: setLangProp }) {
  const [open, setOpen] = React.useState(false);
  const [langLocal, setLangLocal] = React.useState('EN');
  const lang = langProp || langLocal;
  const setLang = setLangProp || setLangLocal;
  const nav = (window.PARTNERS_I18N && window.PARTNERS_I18N[lang] && window.PARTNERS_I18N[lang].nav)
    || { home: 'Home', map: 'Map', partners: 'Partners', report: 'Report' };
  const link = (key, label) => (
    <button onClick={() => onNav(key)} style={{
      background: 'none', border: 'none', cursor: 'pointer', color: '#fff',
      fontSize: 14, fontWeight: 500, fontFamily: 'inherit', padding: 0,
      opacity: active === key ? 1 : 0.85, transition: 'color .15s',
    }}
      onMouseEnter={e => e.currentTarget.style.color = '#A4B16E'}
      onMouseLeave={e => e.currentTarget.style.color = '#fff'}>{label}</button>
  );
  return (
    <header style={{ background: '#006994', color: '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <button onClick={() => onNav('home')} style={{ display: 'flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 0 }}>
          <window.Lockup on="blue" mark={24} />
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {link('home', nav.home)}
          {link('map', nav.map)}
          <button onClick={() => onNav('report')} style={{
            background: '#6B7C3A', color: '#fff', border: 'none', cursor: 'pointer',
            padding: '8px 16px', borderRadius: 16, fontSize: 14, fontWeight: 500,
            fontFamily: 'inherit', transition: 'background .15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#5A6830'}
            onMouseLeave={e => e.currentTarget.style.background = '#6B7C3A'}>{nav.report}</button>
          <div style={{ display: 'flex', gap: 4, fontSize: 13 }}>
            {['EL', 'EN', 'DE'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                background: lang === l ? 'rgba(255,255,255,0.2)' : 'none', border: 'none',
                color: '#fff', cursor: 'pointer', padding: '3px 7px', borderRadius: 8,
                fontWeight: lang === l ? 700 : 400, fontFamily: 'inherit', opacity: lang === l ? 1 : 0.7 }}>{l}</button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter({ onNav, lang }) {
  const L = (window.PARTNERS_I18N && window.PARTNERS_I18N[lang]) || null;
  const partnersLabel = (L && L.footerLink) || 'Partners & Sponsors';
  const links = [
    { label: partnersLabel, key: 'partners', strong: true },
    { label: 'Privacy Policy' }, { label: 'Impressum' }, { label: 'Terms of Service' },
  ];
  return (
    <footer style={{ borderTop: '1px solid #F3F4F6', background: '#fff', marginTop: 0 }}>
      <div style={{ maxWidth: 896, margin: '0 auto', padding: '32px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, fontSize: 14, color: '#9CA3AF', flexWrap: 'wrap' }}>
        <p style={{ margin: 0 }}>© 2026 Katharos — For a cleaner Greece</p>
        <nav style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {links.map(x => (
            <a key={x.label} href={x.key ? ('#' + x.key) : '#'}
              onClick={e => { e.preventDefault(); if (x.key && onNav) onNav(x.key); }}
              style={{ color: x.strong ? '#006994' : '#9CA3AF', textDecoration: 'none', fontWeight: x.strong ? 600 : 400 }}
              onMouseEnter={e => e.currentTarget.style.color = x.strong ? '#005A80' : '#4B5563'}
              onMouseLeave={e => e.currentTarget.style.color = x.strong ? '#006994' : '#9CA3AF'}>{x.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* Pre-footer “want to support?” band — routes to the Partners page. Shown on
   high-traffic public views (home / map / tracking), hidden on the report flow
   and the partners page itself. */
function SupportBanner({ lang, onNav }) {
  const L = (window.PARTNERS_I18N && window.PARTNERS_I18N[lang]) || null;
  const b = (L && L.banner) || { title: 'Want to support a cleaner Greece?', sub: 'Organisations, municipalities and companies can become partners.', cta: 'Become a partner' };
  return (
    <section style={{ background: '#F5F2ED', borderTop: '1px solid #E8E3DA' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto', padding: '28px 20px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 240, flex: 1 }}>
          <p style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: '#006994', letterSpacing: '-0.01em' }}>{b.title}</p>
          <p style={{ margin: 0, fontSize: 14, color: '#4B5563', lineHeight: 1.5 }}>{b.sub}</p>
        </div>
        <button onClick={() => onNav && onNav('partners')} style={{
          background: '#6B7C3A', color: '#fff', border: 'none', cursor: 'pointer', flexShrink: 0,
          padding: '12px 24px', borderRadius: 16, fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
          transition: 'background .2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#5A6830'}
          onMouseLeave={e => e.currentTarget.style.background = '#6B7C3A'}>{b.cta}</button>
      </div>
    </section>
  );
}

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    border: '1px solid #F3F4F6', padding: 24, ...style }}>{children}</div>;
}

Object.assign(window, { CATEGORIES, CAT_BY_ID, CategoryBadge, Header, SiteFooter, SupportBanner, Card });
