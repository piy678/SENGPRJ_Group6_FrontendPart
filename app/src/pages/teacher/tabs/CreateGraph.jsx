import React, { useEffect, useState } from 'react';
import { Button, Card, Field } from '../../../components/UI.jsx';

export default function CreateGraph({ courseId }) {
  const [title, setTitle] = useState('Understand requirements analysis');
  const [desc, setDesc] = useState('Basic concepts of requirements analysis');
  const [dep, setDep] = useState('');
  const [leos, setLeos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [leoReached, setLeoReached] = useState({});
const [course, setCourse] = useState(null);
const [edges, setEdges] = useState([]);
const [leoSearch, setLeoSearch] = useState('');
const [selectedLeo, setSelectedLeo] = useState(null);
const [requires, setRequires] = useState([]);
const [deleteDialog, setDeleteDialog] = useState(null);


const base = window.config?.apiBase || 'http://localhost:8080';
 
  

if (!courseId) {
  return <div>Bitte zuerst einen Kurs unter “Manage courses” auswählen.</div>;
}

const openLeo = async (leo) => {
  setSelectedLeo(leo);
  const res = await fetch(`${base}/api/leos/${leo.id}/prerequisites`);
  const data = await res.json();
  setRequires(data);
};
const requestDelete = async (leo) => {
  setError(null);

  try {
    const r = await fetch(`${base}/api/leos/${leo.id}/dependents`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const dependents = await r.json();

    if (dependents.length > 0) {
      
      setDeleteDialog({ leo, dependents });
      return;
    }

    
    await doDelete(leo.id, false);
  } catch (e) {
    console.error(e);
    setError('Delete check fehlgeschlagen.');
  }
};

const doDelete = async (leoId, force) => {
  try {
    const r = await fetch(`${base}/api/leos/${leoId}?force=${force}`, {
      method: 'DELETE',
    });

    if (r.status === 409) {
      const data = await r.json();
      setDeleteDialog({
        leo: leos.find(x => x.id === leoId),
        dependents: data.dependents || [],
      });
      return;
    }

    if (!r.ok && r.status !== 204) throw new Error(`HTTP ${r.status}`);

    setLeos(prev => prev.filter(x => x.id !== leoId));
    setEdges(prev =>
      prev.filter(
        e =>
          (e.sourceId ?? e.source) !== leoId &&
          (e.targetId ?? e.target) !== leoId
      )
    );
    setDeleteDialog(null);
  } catch (e) {
    console.error(e);
    setError('Löschen fehlgeschlagen.');
  }
};


  useEffect(() => {
  setLoading(true);

 Promise.all([
  fetch(`${base}/api/leos/course/${courseId}`).then(r => r.json()),
  fetch(`${base}/api/courses/course/${courseId}/stats`).then(r => r.json()),
  fetch(`${base}/api/courses/${courseId}`).then(r => r.json()),
   fetch(`${base}/api/leos/course/${courseId}/dependencies`).then(r => r.json()),
])
.then(([leoList, stats, courseData, deps]) => {
  setLeos(leoList);
  setLeoReached(stats || {});
  setCourse(courseData);
  const depsArr = Array.isArray(deps) ? deps : (deps?.edges && Array.isArray(deps.edges) ? deps.edges : []);
  console.log("deps raw:", deps);      
  console.log("depsArr:", depsArr);
  setEdges(depsArr);
})
.catch(err => {
  console.error(err);
  setError('LEOs konnten nicht geladen werden.');
})
.finally(() => setLoading(false));

}, [base, courseId]);

const q = leoSearch.trim().toLowerCase();

const filteredLeos = leos.filter(l => {
  

  if (!q) return true;

  const name = (l.name || '').toLowerCase();
  const desc = (l.description || '').toLowerCase();
  const topic = (l.topic || '').toLowerCase();
  const reached = String(leoReached[l.id] ?? 0);
  const textMatch =
  name.includes(q) || desc.includes(q) || topic.includes(q);
  const reachedMatch = reached.includes(q);
  return textMatch || reachedMatch;
});

 const onSave = async () => {
  setError(null);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    setError('Kein eingeloggter Benutzer');
    return;
  }

  try {
    const res = await fetch(`${base}/api/leos/course/${courseId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description: desc,
        prerequisiteLeoId: dep || null,
        createdById: currentUser.id, 
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
    {/* ✅ Dependency Graph in eigene Card, damit das Grid nicht kaputt geht */}
    <Card>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Dependency Graph</div>

     {!Array.isArray(edges) || edges.length === 0 ? (
        <div style={{ opacity: 0.7, fontSize: 13 }}>No dependencies</div>
      ) : (
        <div style={{ fontSize: 13, lineHeight: 1.6 }}>
          {edges.map((e, idx) => {
           
            const sourceId = e.source ?? e.sourceId;
            const targetId = e.target ?? e.targetId;

            const src = leos.find(l => l.id === sourceId)?.name || sourceId;
            const tgt = leos.find(l => l.id === targetId)?.name || targetId;

            return (
              <div key={idx}>
                {src} → {tgt}
              </div>
            );
          })}
        </div>
      )}
    </Card>

    <Card>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Existing LEOs</div>

      {selectedLeo && (
        <div style={{ fontSize: 13, marginBottom: 10 }}>
          <strong>Requires:</strong>{' '}
          {requires.length > 0 ? requires.map(x => x.name).join(', ') : '—'}
        </div>
      )}

      <input
        className="input"
        placeholder="LEO suchen…"
        value={leoSearch}
        onChange={e => setLeoSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      {loading ? (
        <div>Lade...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>
            {filteredLeos.length} von {leos.length} LEOs
          </div>

          <div style={{ marginTop: 8 }}>
            {filteredLeos.map(l => (
              <div

                key={l.id}
                style={{
                  padding: '10px 0',
                  borderBottom: '1px solid #eee',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 12,
                  alignItems: 'start',
                }}
              >
              
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      flexWrap: 'wrap',
                    }}
                  >
                    {/* ✅ klickbar für Details + Requires */}
                    <span
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => openLeo(l)}
                      title="LEO Details öffnen"
                    >
                      {l.name}
                    </span>

                    {/* Active Badge */}
                    <span
                      style={{
                        fontSize: 12,
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: l.isActive ? '#dcfce7' : '#fee2e2',
                        color: l.isActive ? '#166534' : '#991b1b',
                        fontWeight: 600,
                      }}
                    >
                      {l.isActive ? 'Active' : 'Inactive'}
                    </span>

                    {l.topic ? (
                      <span style={{ fontSize: 12, opacity: 0.7 }}>
                        Topic: {l.topic}
                      </span>
                    ) : null}

                    {(l.prerequisiteCount ?? 0) > 0 && (
                      <span style={{ fontSize: 12, opacity: 0.75 }}>
                        {l.prerequisiteCount} prerequisite
                      </span>
                    )}
                    <button
  className="btn"
  style={{ marginLeft: 'auto' }}
  onClick={() => requestDelete(l)}
>
  Delete
</button>
                  </div>

                  {l.description ? (
                    <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>
                      {l.description}
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, opacity: 0.5, marginTop: 4 }}>
                      (keine Beschreibung)
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right', fontSize: 12 }}>
                  <div style={{ fontWeight: 600 }}>
                    Reached: {leoReached[l.id] ?? 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="spacer"></div>
    </Card>

    <Card>
  <div style={{ fontWeight: 600, marginBottom: 8 }}>LEO Editor</div>

  <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 6 }}>
    Course:{' '}
    <strong>
      {course?.name ?? '— (Course wird nicht geladen)'}
    </strong>
  </div>

  <Field label="LEO Title">
    <input
      className="input"
      value={title}
      onChange={e => setTitle(e.target.value)}
    />
  </Field>

  <Field label="Description">
    <input
      className="input"
      value={desc}
      onChange={e => setDesc(e.target.value)}
    />
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

  <Button variant="primary" onClick={onSave}>
    Save LEO
  </Button>
</Card>
{deleteDialog && (
  <div style={{
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.35)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 20,
    zIndex: 9999
  }}>
    <div style={{
      width: 520, background: 'white',
      borderRadius: 12, padding: 16
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>
        Cannot delete - dependencies exist
      </div>

      <div style={{ fontSize: 13, marginBottom: 10 }}>
        {deleteDialog.dependents.length} LEOs depend on '{deleteDialog.leo?.name}'
      </div>

      <div style={{ fontSize: 13, marginBottom: 12 }}>
        <strong>Details:</strong>{' '}
        {deleteDialog.dependents.map(d => d.name).join(', ')}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button onClick={() => setDeleteDialog(null)}>Cancel</button>

        <button onClick={() => setDeleteDialog(null)}>
          Remove all prerequisites first
        </button>

        <button onClick={() => doDelete(deleteDialog.leo.id, true)}>
          Force delete and update dependents
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    
    
  );
}