import React, { useEffect, useState } from 'react';
import { Button, Card, Field } from '../../../components/UI.jsx';

export default function CreateGraph() {
  const [title, setTitle] = useState('Understand requirements analysis');
  const [desc, setDesc] = useState('Basic concepts of requirements analysis');
  const [dep, setDep] = useState('');
  const [leos, setLeos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const base = window.config?.apiBase || 'http://localhost:8080';
  const courseId = 1; 

  useEffect(() => {
    setLoading(true);
    fetch(`${base}/api/leos/course/${courseId}`)
      .then(res => res.json())
      .then(data => setLeos(data))
      .catch(err => {
        console.error(err);
        setError('LEOs konnten nicht geladen werden.');
      })
      .finally(() => setLoading(false));
  }, [base, courseId]);

  const onSave = async () => {
    setError(null);
    try {
      const res = await fetch(`${base}/api/leos/course/${courseId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: desc,
          prerequisiteLeoId: dep || null,
        }),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const newLeo = await res.json();
      setLeos(prev => [...prev, newLeo]);
    } catch (e) {
      console.error(e);
      setError('LEO konnte nicht gespeichert werden.');
    }
  };

  const dependencyOptions = [
    { id: '', name: 'No dependencies' },
    ...leos.map(l => ({ id: l.id, name: l.name })),
  ];

  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <Card>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Existing LEOs</div>
        {loading ? (
          <div>Lade...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <ol style={{ lineHeight: 1.9, marginTop: 8 }}>
            {leos.map(l => (
              <li key={l.id}>{l.name}</li>
            ))}
          </ol>
        )}
        <div className="spacer"></div>
      </Card>
      <Card>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>LEO Editor</div>
        <Field label="LEO Title">
          <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
        </Field>
        <Field label="Description">
          <input className="input" value={desc} onChange={e => setDesc(e.target.value)} />
        </Field>
        <Field label="Dependencies (assumes)">
          <select className="select" value={dep} onChange={e => setDep(e.target.value)}>
            {dependencyOptions.map(o => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="">
          <textarea className="textarea" placeholder="Notes…" rows="4"></textarea>
        </Field>
        <Button variant="primary" onClick={onSave}>
          Save LEO
        </Button>
      </Card>
    </div>
  );
}
