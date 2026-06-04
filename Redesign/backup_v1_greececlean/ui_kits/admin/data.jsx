/* GreeceClean Admin — data + shared badges (Greek) */

const CAT_GR = {
  illegal_dump:        { label: 'Παράνομη Χωματερή',       icon: '🗑️', circ: '#FEE2E2' },
  construction_debris: { label: 'Μπάζα & Οικοδομικά',      icon: '🏗️', circ: '#F5F5F4' },
  roadside_litter:     { label: 'Σκουπίδια',               icon: '🚮', circ: '#DBEAFE' },
  plastics:            { label: 'Πλαστικά',                icon: '🧴', circ: '#CCFBF1' },
  tires:               { label: 'Ελαστικά',                icon: '🛞', circ: '#F1F5F9' },
  appliances:          { label: 'Λευκές Συσκευές',         icon: '🔌', circ: '#FEF9C3' },
  abandoned_vehicle:   { label: 'Εγκαταλελειμμένο Όχημα',  icon: '🚗', circ: '#F3E8FF' },
  green_waste:         { label: 'Κλαδιά & Βλάστηση',       icon: '🌿', circ: '#FFEDD5' },
  bulky_items:         { label: 'Ογκώδη Αντικείμενα',      icon: '🛋️', circ: '#FEF3C7' },
  coastal_pollution:   { label: 'Ρύπανση Ακτής',           icon: '🌊', circ: '#CFFAFE' },
  sewage:              { label: 'Λύματα & Χημικά',         icon: '☣️', circ: '#FFE4E6' },
  other:               { label: 'Άλλο',                    icon: '❓', circ: '#F3F4F6' },
};

const STATUS_GR = {
  pending:   { label: 'Σε αναμονή',  bg: '#FEF9C3', fg: '#854D0E' },
  in_review: { label: 'Υπό εξέταση', bg: '#DBEAFE', fg: '#1E40AF' },
  forwarded: { label: 'Προωθήθηκε',  bg: '#F3E8FF', fg: '#6B21A8' },
  resolved:  { label: 'Επιλύθηκε',   bg: '#DCFCE7', fg: '#166534' },
  rejected:  { label: 'Απορρίφθηκε', bg: '#FEE2E2', fg: '#991B1B' },
};

// priority: urgent for sewage/illegal_dump; medium for construction/vehicle/coastal; else normal
function priorityOf(cat) {
  if (cat === 'sewage' || cat === 'illegal_dump') return 'urgent';
  if (['construction_debris', 'abandoned_vehicle', 'coastal_pollution'].includes(cat)) return 'medium';
  return 'normal';
}

const SAMPLE = [
  { id: '1', token: 'ab12cd34ef56', img: 'https://picsum.photos/seed/10/120/120', muni: 'Δήμος Θεσσαλονίκης', cat: 'illegal_dump', status: 'pending', date: '14/08/23', desc: 'Μεγάλος σωρός μπάζων δίπλα στον περιφερειακό.' },
  { id: '2', token: '12ab34cd56ef', img: 'https://picsum.photos/seed/20/120/120', muni: 'Δήμος Καλαμαριάς', cat: 'sewage', status: 'pending', date: '22/11/23', desc: 'Διαρροή λυμάτων στην παραλιακή.' },
  { id: '3', token: 'deadbeef1234', img: 'https://picsum.photos/seed/30/120/120', muni: 'Δήμος Θέρμης', cat: 'roadside_litter', status: 'pending', date: '09/01/24', desc: '' },
  { id: '4', token: 'cafe1234abcd', img: 'https://picsum.photos/seed/40/120/120', muni: 'Δήμος Μάνδρας-Ειδυλλίας', cat: 'construction_debris', status: 'in_review', date: '30/06/22', desc: 'Οικοδομικά υλικά σε ρέμα.' },
  { id: '5', token: '543210fedcba', img: 'https://picsum.photos/seed/80/120/120', muni: 'Δήμος Μήλου', cat: 'coastal_pollution', status: 'resolved', date: '12/07/23', desc: '' },
  { id: '6', token: 'a0b1c2d3e4f5', img: 'https://picsum.photos/seed/130/120/120', muni: 'Δήμος Χαλανδρίου', cat: 'abandoned_vehicle', status: 'forwarded', date: '14/02/24', desc: 'Εγκαταλελειμμένο όχημα επί μήνες.' },
];

const MUNICIPALITIES = [
  { name: 'Δήμος Θεσσαλονίκης', email: 'katharioti@thessaloniki.gr', region: 'Κεντρική Μακεδονία' },
  { name: 'Δήμος Ηρακλείου', email: 'periballon@heraklion.gr', region: 'Κρήτη' },
  { name: 'Δήμος Ρόδου', email: 'service@rhodes.gr', region: 'Νότιο Αιγαίο' },
  { name: 'Δήμος Πειραιά', email: 'kathar;iotita@piraeus.gov.gr', region: 'Αττική' },
  { name: 'Δήμος Βόλου', email: 'cleaning@volos.gr', region: 'Θεσσαλία' },
  { name: 'Δήμος Κερκυραίων', email: 'environment@corfu.gov.gr', region: 'Ιόνια Νησιά' },
];

function StatusPill({ status }) {
  const s = STATUS_GR[status] || { label: status, bg: '#F3F4F6', fg: '#6B7280' };
  return <span style={{ padding: '2px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 500, background: s.bg, color: s.fg, whiteSpace: 'nowrap' }}>{s.label}</span>;
}

function PriorityBadge({ cat }) {
  const p = priorityOf(cat);
  if (p === 'urgent') return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '3px 11px', borderRadius: 9999, fontSize: 12, fontWeight: 600, background: '#FEE2E2', color: '#B91C1C' }}>
      <span style={{ position: 'relative', width: 8, height: 8 }}>
        <span className="gc-ping" style={{ position: 'absolute', inset: 0, borderRadius: 9999, background: '#f87171', opacity: 0.75 }} />
        <span style={{ position: 'absolute', inset: 0, borderRadius: 9999, background: '#ef4444' }} />
      </span>Επείγον</span>
  );
  if (p === 'medium') return <span style={{ padding: '3px 11px', borderRadius: 9999, fontSize: 12, fontWeight: 600, background: '#FEF9C3', color: '#A16207' }}>Μέτρια</span>;
  return <span style={{ padding: '3px 11px', borderRadius: 9999, fontSize: 12, fontWeight: 500, background: '#F3F4F6', color: '#6B7280' }}>Κανονική</span>;
}

function CatCell({ cat, desc }) {
  const c = CAT_GR[cat] || { icon: '📍', label: cat, circ: '#F3F4F6' };
  return (
    <div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 28, height: 28, borderRadius: 9999, background: c.circ, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{c.icon}</span>
        <span style={{ fontSize: 14, color: '#4B5563' }}>{c.label}</span>
      </span>
      {desc && <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{desc}</div>}
    </div>
  );
}

Object.assign(window, { CAT_GR, STATUS_GR, priorityOf, SAMPLE, MUNICIPALITIES, StatusPill, PriorityBadge, CatCell });
