import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/UI.jsx';
import ManageCourses from './tabs/ManageCourses.jsx';
import CreateGraph from './tabs/CreateGraph.jsx';
import ConductAssessments from './tabs/ConductAssessments.jsx';
import MonitorProgress from './tabs/MonitorProgress.jsx';

const TABS = ['Manage courses','Create a LEO graph','Conduct assessments','Monitor progress'];

export default function TeacherDashboard() {
  const [active, setActive] = useState(TABS[0]);
  const [hello, setHello] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // -------------------------------
  // 1) AUTH CHECK
  // -------------------------------
  useEffect(() => {
    const stored = localStorage.getItem('currentUser');

    if (!stored) {
      navigate('/login');
      return;
    }

    const parsed = JSON.parse(stored);

    if (parsed.role !== 'TEACHER') {
      navigate('/student');
      return;
    }

    setUser(parsed);
  }, [navigate]);

  // -------------------------------
  // 2) HELLO API (optional)
  // -------------------------------
  useEffect(() => {
    const base = window.config?.apiBase || 'http://localhost:8080';
    fetch(base + '/hello')
      .then(r => r.text())
      .then(setHello)
      .catch(() => setHello(null));
  }, []);

  // -------------------------------
  // 3) LOGOUT
  // -------------------------------
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  // Wenn user noch null ist → NICHT rendern, sonst blinkt es kurz
  if (!user) return null;

  return (
    <div>

      <div className="row" style={{ justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontWeight:700 }}>
          Teacher Dashboard 
          {hello ? <span className="muted"> — {hello}</span> : null}
          <br />
          <span className="muted">Logged in as: {user.username}</span>
        </div>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </div>

      <div className="tabs">
        {TABS.map(t => (
          <div
            key={t}
            className={'tab ' + (active === t ? 'active' : '')}
            onClick={() => setActive(t)}
          >
            {t}
          </div>
        ))}
      </div>

      {active === TABS[0] && <ManageCourses />}
      {active === TABS[1] && <CreateGraph />}
      {active === TABS[2] && <ConductAssessments />}
      {active === TABS[3] && <MonitorProgress />}
    </div>
  );
}
