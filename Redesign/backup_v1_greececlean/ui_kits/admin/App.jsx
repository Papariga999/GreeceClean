/* GreeceClean Admin — login + dashboard shell */

function Login({ onLogin }) {
  const [pw, setPw] = React.useState('');
  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', border: '1px solid #F3F4F6', padding: 32, width: '100%', maxWidth: 380 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
          <window.Lockup mark={26} />
        </div>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#6B7280', margin: '0 0 24px' }}>Πίνακας Διαχείρισης</p>
        <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Κωδικός πρόσβασης</label>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••"
          onKeyDown={e => e.key === 'Enter' && onLogin()}
          style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #D1D5DB', borderRadius: 24, padding: '12px 16px', fontSize: 14, fontFamily: 'inherit', outline: 'none', marginBottom: 16 }}
          onFocus={e => e.target.style.boxShadow = '0 0 0 2px #0D6FDB'} onBlur={e => e.target.style.boxShadow = 'none'} />
        <button onClick={onLogin} style={{ width: '100%', background: '#0D6FDB', color: '#fff', border: 'none', borderRadius: 24, padding: '12px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Σύνδεση</button>
      </div>
    </div>
  );
}

function Section({ title, count, color, children }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1F2937', margin: 0 }}>{title}</h2>
        <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 9999, fontWeight: 500, background: color.bg, color: color.fg }}>{count}</span>
      </div>
      {children}
    </section>
  );
}

function MunicipalityList() {
  return (
    <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
          <tr>{['Δήμος', 'Επίσημο Email', 'Περιφέρεια'].map(c => <th key={c} style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, color: '#4B5563' }}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {window.MUNICIPALITIES.map(m => (
            <tr key={m.name} style={{ borderTop: '1px solid #F3F4F6' }}>
              <td style={{ padding: '12px 16px', color: '#1F2937', fontWeight: 500 }}>{m.name}</td>
              <td style={{ padding: '12px 16px', fontFamily: 'ui-monospace, monospace', fontSize: 12, color: '#0D6FDB' }}>{m.email}</td>
              <td style={{ padding: '12px 16px', color: '#6B7280' }}>{m.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [rows, setRows] = React.useState(window.SAMPLE);
  const onAction = (id, action) => {
    setRows(prev => {
      if (action === 'delete') return prev.filter(r => r.id !== id);
      return prev.map(r => r.id !== id ? r : (
        action === 'approve' ? { ...r, status: 'in_review', approved: true } :
        action === 'reject' ? { ...r, status: 'rejected' } :
        action === 'forward' ? { ...r, status: 'forwarded' } : r));
    });
  };
  const pending = rows.filter(r => !r.approved && r.status !== 'rejected' && r.status === 'pending');
  const approved = rows.filter(r => ['in_review', 'forwarded', 'resolved'].includes(r.status));
  const rejected = rows.filter(r => r.status === 'rejected');

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div style={{ marginBottom: 10 }}><window.Lockup mark={22} /></div>
            <h1 style={{ fontSize: 30, fontWeight: 700, color: '#0D6FDB', margin: 0 }}>Πίνακας Διαχείρισης</h1>
            <p style={{ fontSize: 14, color: '#6B7280', margin: '4px 0 0' }}>Διαχείριση αναφορών χρηστών</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#municipalities" style={{ fontSize: 14, color: '#6B7280', background: '#fff', padding: '4px 12px', borderRadius: 9999, border: '1px solid #E5E7EB', textDecoration: 'none' }}>↓ Δήμοι &amp; Email</a>
            <button onClick={onLogout} style={{ fontSize: 14, color: '#6B7280', background: '#fff', padding: '4px 12px', borderRadius: 9999, border: '1px solid #E5E7EB', cursor: 'pointer', fontFamily: 'inherit' }}>Αποσύνδεση</button>
          </div>
        </div>

        <Section title="Αναμένουν έγκριση" count={pending.length} color={{ bg: '#FEF9C3', fg: '#854D0E' }}>
          <window.AdminTable rows={pending} mode="pending" onAction={onAction} />
        </Section>
        <Section title="Εγκεκριμένες" count={approved.length} color={{ bg: '#DCFCE7', fg: '#166534' }}>
          <window.AdminTable rows={approved} mode="approved" onAction={onAction} />
        </Section>
        {rejected.length > 0 && (
          <Section title="Απορριφθείσες" count={rejected.length} color={{ bg: '#FEE2E2', fg: '#991B1B' }}>
            <window.AdminTable rows={rejected} mode="rejected" onAction={onAction} />
          </Section>
        )}
        <section id="municipalities">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1F2937', margin: 0 }}>Δήμοι &amp; Email</h2>
            <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 9999, fontWeight: 500, background: '#DBEAFE', color: '#1E40AF' }}>{window.MUNICIPALITIES.length}</span>
          </div>
          <MunicipalityList />
        </section>
      </div>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  return loggedIn ? <Dashboard onLogout={() => setLoggedIn(false)} /> : <Login onLogin={() => setLoggedIn(true)} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
