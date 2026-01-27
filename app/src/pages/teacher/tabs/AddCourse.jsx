import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../../components/UI.jsx';

export default function AddCourse() {
const [form, setForm] = useState({
  name: '',
  students: '',
  leos: '',
});


  const [students, setStudents] = useState([]);              
  const [selectedStudentIds, setSelectedStudentIds] = useState([]); 

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
 const base =
  window?.config?.apiBase ||
  import.meta.env.VITE_API ||
  "http://13.53.169.202:8080";


  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

useEffect(() => {
  fetch(`${base}/api/users?role=STUDENT`)
    .then(async (res) => {
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      return data;
    })
    .then((data) => {
      console.log("users response:", data);
      setStudents(Array.isArray(data) ? data : []);
    })
    .catch((e) => {
      console.error(e);
      setError('Failed to load students.');
      setStudents([]);
    });
}, [base]);

const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setError('No logged-in teacher found.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`${base}/api/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: currentUser.id,
          studentIds: selectedStudentIds,
          name: form.name,
          numberOfStudents: Number(form.students || 0),
          numberOfLeos: Number(form.leos || 0),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      
      navigate('/teacher');
    } catch (err) {
      console.error(err);
      setError('Could not save course. Check backend and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-course">
      <Card>
        <h2>Create new course</h2>

        <form onSubmit={onSave}>
        <div style={{ marginTop: 16 }}>
  <h4>Assign students</h4>
  {Array.isArray(students) && students.map((s) => (
    <label key={s.id} style={{ display: 'block', marginBottom: 4 }}>
      <input
        type="checkbox"
        checked={selectedStudentIds.includes(s.id)}
        onChange={(e) => {
          setSelectedStudentIds(prev =>
            e.target.checked
              ? [...prev, s.id]
              : prev.filter(id => id !== s.id)
          );
        }}
      />
      {' '}
      {s.firstName} {s.lastName} ({s.username})
    </label>
  ))}

  {!Array.isArray(students) && (
    <p style={{ color: 'red' }}>Students could not be loaded</p>
  )}
</div>


          <div className="form-group">
            <label>Course name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Number of students (optional)</label>
            <input
              type="number"
              name="students"
              value={form.students}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Number of LEOs (optional)</label>
            <input
              type="number"
              name="leos"
              value={form.leos}
              onChange={onChange}
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Button type="submit" disabled={saving}>
            {saving ? 'Speichern...' : 'Speichern'}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/teacher')}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </Button>
        </form>
      </Card>
    </div>
  );
}
