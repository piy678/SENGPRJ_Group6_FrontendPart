import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/UI.jsx';

export default function StudentDashboard() {
  const navigate = useNavigate();
const base =
  window?.config?.apiBase ||
  import.meta.env.VITE_API ||
  "http://13.53.169.202:8080";



  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);
  const studentName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '';

  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser?.id) return;

    fetch(`${base}/api/students/${currentUser.id}/progress`)
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
        return data;
      })
      .then((data) => setProgress(data))
      .catch((e) => {
        console.error(e);
        setError('Progress failed to load.');
      });
  }, [base, currentUser?.id]);

  const handleLogout = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  const totalLeos = progress?.totalLeos ?? 0;
  const achieved = progress?.achieved ?? 0;
  const percent = totalLeos > 0 ? Math.round((achieved / totalLeos) * 100) : 0;

  return (
    <div>
      <div className="row" style={{ justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontWeight:700 }}>
          Student Dashboard{studentName ? ` — ${studentName}` : ''}
        </div>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </div>

      <Card>
        <div className="muted">
          Welcome!<br/>Here you can track your progress in all enrolled courses.
        </div>
      </Card>

      <div className="spacer"></div>

      <Card>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontWeight:600 }}>Software Engineering Projekt</div>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {!error && !progress && (
              <div className="muted">Loading progress…</div>
            )}

            {!error && progress && (
              <div className="muted">
                Progress: {achieved} of {totalLeos} LEOs achieved ({percent}%)
              </div>
            )}
          </div>

          <Button variant="primary" onClick={() => navigate('/student/progress')}>
            view details
          </Button>
        </div>
      </Card>
    </div>
  );
}
