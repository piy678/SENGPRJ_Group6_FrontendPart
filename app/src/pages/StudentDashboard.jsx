import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../components/UI.jsx";
import { requestJson } from "../api/http.js";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const base =
    window?.config?.apiBase ||
    import.meta.env.VITE_API ||
    "http://13.53.169.202:8080";

  const currentUser = useMemo(
    () => JSON.parse(localStorage.getItem("currentUser")),
    []
  );

  const studentName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : "";

  
  const [error, setError] = useState(null);

  const [courses, setCourses] = useState([]);
const [progressByCourseId, setProgressByCourseId] = useState({}); // { [courseId]: {totalLeos, achieved, ...} }

useEffect(() => {
  if (!currentUser?.id) return;

  requestJson(`${base}/api/students/${currentUser.id}/courses`)
    .then(async (list) => {
      setCourses(list || []);

      // progress pro kurs laden
      const entries = await Promise.all(
        (list || []).map(async (c) => {
          try {
            const p = await requestJson(
              `${base}/api/students/${currentUser.id}/progress?courseId=${c.id}`
            );
            return [c.id, p];
          } catch (e) {
            console.error("progress failed for course", c.id, e);
            return [c.id, null];
          }
        })
      );

      setProgressByCourseId(Object.fromEntries(entries));
    })
    .catch((e) => {
      console.error(e);
      setError("Courses failed to load.");
    });
}, [base, currentUser?.id]);


  useEffect(() => {
    if (!currentUser?.id) return;

    setError(null);

    requestJson(`${base}/api/students/${currentUser.id}/courses`)
      .then((data) => setCourses(data || []))
      .catch((e) => {
        console.error(e);
        setError("Courses failed to load.");
      });
  }, [base, currentUser?.id]);

  const handleLogout = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  


  return (
    <div>
      <div
        className="row"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ fontWeight: 700 }}>
          Student Dashboard{studentName ? ` — ${studentName}` : ""}
        </div>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Card>
        <div className="muted">
          Welcome!<br />
          Here you can track your progress in all enrolled courses.
        </div>
      </Card>

      <div className="spacer"></div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {courses.length === 0 && !error && (
        <Card>
          <div className="muted">No enrolled courses found.</div>
        </Card>
      )}

     {courses.map((c) => {
  const p = progressByCourseId[c.id];
  const total = p?.totalLeos ?? 0;
  const achieved = p?.achieved ?? 0;
  const percent = total > 0 ? Math.round((achieved / total) * 100) : 0;

  return (
    <Card key={c.id}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontWeight:600}}>{c.name}</div>
          {!p && <div className="muted">Loading progress…</div>}
          {p && (
            <div className="muted">
              Progress: {achieved} of {total} LEOs achieved ({percent}%)
            </div>
          )}
        </div>

        <Button onClick={() => navigate(`/student/progress/${c.id}`)}>
          view details
        </Button>
      </div>
    </Card>
    );
    })}
  </div>
);
}
