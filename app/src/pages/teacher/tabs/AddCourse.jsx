import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../../components/UI.jsx';

export default function AddCourse() {
  const [form, setForm] = useState({
    name: '',
    students: '',
    leos: '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const base = window.config?.apiBase || 'http://localhost:8080';
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setError('Kein eingeloggter Lehrer gefunden.');
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
        <h2>Neuen Kurs anlegen</h2>

        <form onSubmit={onSave}>
          <div className="form-group">
            <label>Kursname</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Anzahl Studenten (optional)</label>
            <input
              type="number"
              name="students"
              value={form.students}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Anzahl LEOs (optional)</label>
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
            Abbrechen
          </Button>
        </form>
      </Card>
    </div>
  );
}
