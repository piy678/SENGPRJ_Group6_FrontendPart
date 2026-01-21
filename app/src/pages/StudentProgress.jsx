import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/UI.jsx';
import { requestJson } from "../api/http.js";
import { errorMessages, ErrorType } from "../api/errors.js";


export default function StudentProgress() {
  const nav = useNavigate();
const base =
  window?.config?.apiBase ||
  import.meta.env.VITE_API ||
  "http://13.53.169.202:8080";



  const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
  const [summary, setSummary] = useState(null);
  const [rows, setRows] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
const [blocked, setBlocked] = useState([]);


  const fmtDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString();
};

const fmtDateTime = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString();
};
const suggestionStyle = (s) => {
  if (!s.hasDependencies) {
    return { border: '1px solid #ddd', background: '#f3f3f3' }; // grau
  }
  if (!s.ready) {
    return { border: '1px solid #f3b0b0', background: '#fdeaea' }; // rot
  }
  return { border: '1px solid #cfe9d6', background: '#e9f7ee' }; // grün
};


useEffect(() => {
   setError(null);
  if (!currentUser) {
    setError("No logged-in student found.");
    return;
  }

  requestJson(`${base}/api/students/${currentUser.id}/progress`)
    .then(data => {
      setSummary({
        totalLeos: data.totalLeos,
        achieved: data.achieved,
        partially: data.partially,
        notAchieved: data.notAchieved,
        unrated: data.unrated ?? data.unmarked ?? 0,
      });
      setBlocked(data.blocked || []);
      setRows(data.leoStatuses || []);
      setSuggestions(data.suggestions || []);
    })
    .catch(err => {
      console.error(err);
      const type = err?.type ?? ErrorType.SERVER_ERROR;
      setError(errorMessages[type] ?? errorMessages[ErrorType.SERVER_ERROR]);
    });
}, [base, currentUser?.id]);


  if (error) {
    return (
      <div>
        <div className="row" style={{ justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div style={{ fontWeight:700 }}>Progress</div>
          <Button className="back" onClick={() => nav(-1)}>Back</Button>
        </div>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  if (!summary) {
    return <div>Lade Fortschritt...</div>;
  }

  return (
    <div>
      <div className="row" style={{ justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontWeight:700 }}>Progress - Software Engineering Projekt</div>
        <Button className="back" onClick={()=>nav(-1)}>Back</Button>
      </div>

      <Card>
        <div className="muted" style={{ marginBottom:12 }}>Progress Overview</div>
        <div className="row" style={{ alignItems:'center', gap:16 }}>
          <div className="muted">Total LEOs: {summary.totalLeos}</div>
          <div>Achieved: <b>{summary.achieved}</b></div>
          <div>Partially Achieved: <b>{summary.partially}</b></div>
          <div>Not achieved: <b>{summary.notAchieved}</b></div>
          <div>Unmarked: <b>{summary.unrated}</b></div>
        </div>
      </Card>

      <div className="spacer"></div>
<Card>
  <div style={{ fontWeight:600, marginBottom:8 }}>
    Suggested Next LEOs
  </div>

  {suggestions.length === 0 && (
    <div className="muted">No suggestions at the moment.</div>
  )}

  {suggestions.map((s, i) => (
    <div
      key={i}
      style={{
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
  ...suggestionStyle(s)
}}

    >
      <div style={{ fontWeight:700 }}>
        {s.leoTitle}
      </div>

      <div className="muted">
        <b>Rationale:</b> {s.rationale}
      </div>

      <div style={{ fontWeight:700, marginTop:4 }}>
        {s.ready ? '✓ Ready to start' : '✗ Not ready'}
      </div>
    </div>
  ))}
</Card>
{blocked.length > 0 && (
  <Card>
    <div style={{ fontWeight:600, marginBottom:8, color:'#b00020' }}>
      Blocked LEOs
    </div>

    {blocked.map((b, i) => (
      <div key={i} style={{
        padding:12,
        borderRadius:10,
        marginBottom:10,
        border:'1px solid #f3b0b0',
        background:'#fdeaea'
      }}>
        <div style={{ fontWeight:700 }}>{b.leoTitle}</div>
        <div className="muted">{b.text}</div>
        <div className="muted"><b>Tip:</b> {b.tip}</div>
      </div>
    ))}
  </Card>
)}

      <div className="spacer"></div>

      <Card>
        <table>
          <thead>
  <tr>
    <th>All LEOs</th>
    <th>Depends on</th>
    <th>Status</th>
    <th>Last updated</th> {/* */}
  </tr>
</thead>

  <tbody>
  {rows.map((r, i) => (
    <tr key={i}>
      <td>{r.title}</td>
      <td>{r.dependsOn}</td>
      <td>{r.status}</td>
      <td>{fmtDateTime(r.lastUpdated)}</td> {/* NEU */}
    </tr>
  ))}
</tbody>


        </table>
      </Card>
    </div>
  );
}
