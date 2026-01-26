import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';          
import { Button, Card } from '../../../components/UI.jsx';



export default function ManageCourses({ onOpenLeoGraph, onOpenReviews, onSelectCourse, selectedCourseId }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const base =
  window?.config?.apiBase ||
  import.meta.env.VITE_API ||
  "http://13.53.169.202:8080";

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const teacherId = currentUser?.id;

  useEffect(() => {
    if (!teacherId) return;

    setLoading(true);
    fetch(`${base}/api/courses/teacher/${teacherId}`)
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(data => setCourses(data))
      .catch(err => {
        console.error(err);
        setError('Failed to load courses.');
      })
      .finally(() => setLoading(false));
  }, [teacherId, base]);


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${base}/api/courses/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok && res.status !== 204) {
        throw new Error('HTTP ' + res.status);
      }
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      console.error(e);
      alert('Failed to load course.');
    }
  };

  if (loading) return <div>Lade Kurse...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;                         

  return (
    <div>
      {courses.map(course => (
        <Card key={course.id} style={{ marginBottom: 12 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontWeight:600 }}>{course.name}</div>
              <div className="muted">Lehrer: {course.teacherName}</div>
            </div>
            <div className="row">
              <Button className="ghost" onClick={() => onOpenLeoGraph(course.id)}>
  Manage LEO Graph
</Button>

<Button className="ghost" onClick={() => onOpenReviews(course.id)}>
  Reviews
</Button>
              <Button className="ghost" onClick={() => handleDelete(course.id)}>
                Löschen
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <div className="spacer"></div>

      <Button variant="primary" onClick={() => navigate('/teacher/courses/new')}>
        Create new courses
      </Button>
     

    </div>
  );
}
