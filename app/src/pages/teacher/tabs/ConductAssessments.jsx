import React, { useEffect, useState } from 'react';
import { Button, Card } from '../../../components/UI.jsx';

const base =
  window?.config?.apiBase ||
  import.meta.env.VITE_API ||
  "http://13.53.169.202:8080";


export default function ConductAssessments({ courseId }) {
  if (!courseId) return <div>Please select a course first.</div>;
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Teacher

  const [students, setStudents] = useState([]);
  const [leos, setLeos] = useState([]);
  const [assessedDate, setAssessedDate] = useState(() => {
  const d = new Date();
  return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
});

  const [currentStudentId, setCurrentStudentId] = useState(null);

  const STATUS_OPTIONS = [
  { value: 'UNMARKED', label: 'Unmarked' },
  { value: 'NOT_REACHED', label: 'Not Reached' },
  { value: 'PARTIALLY_REACHED', label: 'Partially Reached' },
  { value: 'REACHED', label: 'Reached' },
];


  // ratings pro student
  const [ratingsByStudent, setRatingsByStudent] = useState({});
  const ratings = ratingsByStudent[currentStudentId] || {};

  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${base}/api/assessments/course/${courseId}/students`).then(r => r.json()),
fetch(`${base}/api/assessments/course/${courseId}/leos`).then(r => r.json()),

    ])
      .then(([studentsData, leosData]) => {
        setStudents(studentsData);
        setLeos(leosData);
        if (studentsData.length > 0) setCurrentStudentId(studentsData[0].id);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load data.');
      });
  }, [courseId]);

  const setRating = (leoId, status) => {
    setRatingsByStudent(prev => ({
      ...prev,
      [currentStudentId]: {
        ...(prev[currentStudentId] || {}),
        [leoId]: status,
      },
    }));
  };

  const clearRating = (leoId) => {
    setRatingsByStudent(prev => {
      const copy = { ...(prev[currentStudentId] || {}) };
      delete copy[leoId];
      return { ...prev, [currentStudentId]: copy };
    });
  };

  const onSave = async () => {
    if (!currentStudentId || !currentUser) return;

    const entries = leos
      .filter(l => ratings[l.id] && ratings[l.id] !== 'NOT_ASSESSED')
      .map(l => ({
        leoId: Number(l.id),
        status: ratings[l.id], 
       assessedAt: `${assessedDate}T00:00:00`,
      }));

    const payload = {
      teacherId: Number(currentUser.id),
      entries,
    };

    console.log('POST payload', payload);

    try {
      const res = await fetch(`${base}/api/assessments/student/${currentStudentId}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});


      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} ${txt}`);
      }
      alert('Assessments saved');
    } catch (e) {
      console.error(e);
      setError('Failed to save assessments.');
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
              {i + 1}. {l.title /* oder l.name - je nach Backend */}
            </div>

<div className="row" style={{ gap: 12, alignItems: 'center' }}>
  {STATUS_OPTIONS.map(opt => (
    <label key={opt.value} style={{ marginRight: 12 }}>
      <input
        type="radio"
        name={`rating-${l.id}`}
        checked={(ratings[l.id] ?? 'UNMARKED') === opt.value}
        onChange={() => setRating(l.id, opt.value)}
      />
      {opt.label}
    </label>
  ))}

              {/* optional: Auswahl löschen */}
              <Button onClick={() => setRating(l.id, 'UNMARKED')}>Clear</Button>
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
