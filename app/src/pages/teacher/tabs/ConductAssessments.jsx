import React, { useEffect, useState } from 'react';
import { Button, Card } from '../../../components/UI.jsx';

export default function ConductAssessments() {
  const base = window.config?.apiBase || 'http://localhost:8080';
  const courseId = 1; 
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Teacher

  const [students, setStudents] = useState([]);
  const [leos, setLeos] = useState([]);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [ratings, setRatings] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    
    Promise.all([
      fetch(`${base}/api/assessments/course/${courseId}/students`).then(r => r.json()),
      fetch(`${base}/api/assessments/course/${courseId}/leos`).then(r => r.json()),
    ])
      .then(([studentsData, leosData]) => {
        setStudents(studentsData);
        setLeos(leosData);
        if (studentsData.length > 0) {
          setCurrentStudentId(studentsData[0].id);
        }
      })
      .catch(err => {
        console.error(err);
        setError('Daten konnten nicht geladen werden.');
      });
  }, [base, courseId]);

  const setRating = (leoId, status) => {
    setRatings(prev => ({
      ...prev,
      [leoId]: status,
    }));
  };

  const onSave = async () => {
    if (!currentStudentId || !currentUser) return;

    const entries = leos.map(l => ({
      leoId: l.id,
      status: ratings[l.id] || 'NOT_ASSESSED',
    }));

    try {
      const res = await fetch(`${base}/api/assessments/student/${currentStudentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: currentUser.id,
          entries,
        }),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      alert('Assessments gespeichert');
    } catch (e) {
      console.error(e);
      setError('Assessments konnten nicht gespeichert werden.');
    }
  };

  const currentStudent = students.find(s => s.id === currentStudentId);

  return (
    <div>
      <div className="row" style={{ gap: 8 }}>
        {students.map(s => (
          <Button
            key={s.id}
            className={currentStudentId === s.id ? 'primary' : ''}
            onClick={() => setCurrentStudentId(s.id)}
          >
            {s.name}
          </Button>
        ))}
      </div>
      <div className="spacer"></div>
      <Card>
        <div className="muted" style={{ marginBottom: 8 }}>
          {currentStudent ? `${currentStudent.name} — LEO Ratings` : 'Keine Studenten'}
        </div>
        {leos.map((l, i) => (
          <div key={l.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 600 }}>
              {i + 1}. {l.title}
            </div>
            <div className="row">
              {['NOT_REACHED', 'PARTIALLY_REACHED', 'REACHED', 'NOT_ASSESSED'].map(r => (
                <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="radio"
                    name={`leo-${l.id}`}
                    checked={ratings[l.id] === r}
                    onChange={() => setRating(l.id, r)}
                  />{' '}
                  {r}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="spacer"></div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button variant="primary" onClick={onSave}>
          Save Review
        </Button>
      </Card>
    </div>
  );
}
