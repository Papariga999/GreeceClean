/* GreeceClean Admin — report table with actions + inline edit */

function ActionLink({ color, children, onClick }) {
  return <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0,
    fontSize: 12, fontWeight: 600, color, fontFamily: 'inherit' }}
    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>{children}</button>;
}

function AdminTable({ rows, mode, onAction }) {
  const [editingId, setEditingId] = React.useState(null);
  const cols = ['Εικόνα', 'Token', 'Δήμος', 'Κατηγορία', 'Προτεραιότητα', 'Κατάσταση', 'Ημ/νία', 'Ενέργειες'];

  if (rows.length === 0) return (
    <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      textAlign: 'center', padding: '48px 0', color: '#9CA3AF' }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
      <p style={{ fontWeight: 500, margin: 0 }}>Δεν υπάρχουν αναφορές εδώ</p>
    </div>
  );

  return (
    <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
            <tr>{cols.map(c => <th key={c} style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, color: '#4B5563', whiteSpace: 'nowrap' }}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const urgent = window.priorityOf(r.cat) === 'urgent';
              return (
                <React.Fragment key={r.id}>
                  <tr style={{ borderTop: '1px solid #F3F4F6', background: urgent ? 'rgba(254,242,242,0.4)' : '#fff' }}>
                    <td style={{ padding: '12px 16px' }}><img src={r.img} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 10 }} /></td>
                    <td style={{ padding: '12px 16px', fontFamily: 'ui-monospace, monospace', fontSize: 12, color: '#6B7280' }}>{r.token}</td>
                    <td style={{ padding: '12px 16px', color: '#1F2937' }}>{r.muni}</td>
                    <td style={{ padding: '12px 16px' }}><window.CatCell cat={r.cat} desc={r.desc} /></td>
                    <td style={{ padding: '12px 16px' }}><window.PriorityBadge cat={r.cat} /></td>
                    <td style={{ padding: '12px 16px' }}><window.StatusPill status={r.status} /></td>
                    <td style={{ padding: '12px 16px', color: '#6B7280', fontSize: 12, whiteSpace: 'nowrap' }}>{r.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                        <ActionLink color="#0D6FDB" onClick={() => {}}>Προβολή</ActionLink>
                        <ActionLink color="#2563EB" onClick={() => setEditingId(editingId === r.id ? null : r.id)}>{editingId === r.id ? 'Ακύρωση' : 'Επεξεργασία'}</ActionLink>
                        {mode === 'pending' && <>
                          <ActionLink color="#39B24A" onClick={() => onAction(r.id, 'approve')}>✓ Επαλήθευση</ActionLink>
                          <ActionLink color="#F97316" onClick={() => onAction(r.id, 'reject')}>Απόρριψη</ActionLink>
                        </>}
                        {mode === 'approved' && r.status !== 'forwarded' && <ActionLink color="#9333EA" onClick={() => onAction(r.id, 'forward')}>📨 Προώθηση</ActionLink>}
                        <ActionLink color="#EF4444" onClick={() => onAction(r.id, 'delete')}>Διαγραφή</ActionLink>
                      </div>
                    </td>
                  </tr>
                  {editingId === r.id && (
                    <tr style={{ background: '#EFF6FF', borderTop: '1px solid #DBEAFE' }}>
                      <td colSpan={8} style={{ padding: 16 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12, maxWidth: 640 }}>
                          <Field label="Κατηγορία"><Select value={r.cat} options={Object.entries(window.CAT_GR).map(([v, o]) => [v, o.label])} /></Field>
                          <Field label="Κατάσταση"><Select value={r.status} options={Object.entries(window.STATUS_GR).map(([v, o]) => [v, o.label])} /></Field>
                          <div style={{ gridColumn: '1 / -1' }}><Field label="Δήμος"><Select value={r.muni} options={window.MUNICIPALITIES.map(m => [m.name, m.name])} /></Field></div>
                          <div style={{ gridColumn: '1 / -1' }}><Field label="Σχόλιο χρήστη">
                            <textarea defaultValue={r.desc} rows={2} style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #D1D5DB', borderRadius: 8, padding: '6px 8px', fontSize: 14, resize: 'none', fontFamily: 'inherit' }} />
                          </Field></div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => setEditingId(null)} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: '#0D6FDB', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Αποθήκευση</button>
                          <button onClick={() => setEditingId(null)} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #D1D5DB', background: '#fff', color: '#4B5563', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ακύρωση</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return <div><label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 4 }}>{label}</label>{children}</div>;
}
function Select({ value, options }) {
  return <select defaultValue={value} style={{ border: '1px solid #D1D5DB', borderRadius: 8, padding: '6px 8px', fontSize: 14, background: '#fff', fontFamily: 'inherit', width: '100%' }}>
    {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>;
}

Object.assign(window, { AdminTable });
