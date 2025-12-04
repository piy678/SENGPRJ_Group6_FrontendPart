import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/UI.jsx';

export default function StudentProgress() {
  const nav = useNavigate();
  const base = window.config?.apiBase || 'http://localhost:8080';

  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Student
  const [summary, setSummary] = useState(null);
  const [rows, setRows] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setError('Kein eingeloggter Student gefunden.');
      return;
    }

    fetch(`${base}/api/students/${currentUser.id}/progress`)
      .then(res => {
        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }
        return res.json();
      })
      .then(data => {
        setSummary({
          totalLeos: data.totalLeos,
          achieved: data.achieved,
          partially: data.partially,
          notAchieved: data.notAchieved,
          unrated: data.unrated,
        });
        setRows(data.leoStatuses || []);
        setSuggestions(data.suggestions || []);
      })
      .catch(err => {
        console.error(err);
        setError('Fortschritt konnte nicht geladen werden.');
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
          <div>Partially: <b>{summary.partially}</b></div>
          <div>Not achieved: <b>{summary.notAchieved}</b></div>
          <div>Unrated: <b>{summary.unrated}</b></div>
        </div>
      </Card>

      <div className="spacer"></div>

      <Card>
        <div style={{ fontWeight:600, marginBottom:8 }}>Recommended Next Steps</div>
        {suggestions.length === 0 ? (
          <div className="muted">No suggestions at the moment.</div>
        ) : (
          <ul>
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )}
      </Card>

      <div className="spacer"></div>

      <Card>
        <table>
          <thead>
            <tr>
              <th>All LEOs</th>
              <th>Depends on</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.title}</td>
                <td>{r.dependsOn}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
