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

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

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

      {courses.map((c) => (
        <div key={c.id} style={{ marginBottom: 12 }}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{c.name}</div>
                <div className="muted">Open course progress</div>
              </div>

              <Button
                variant="primary"
                onClick={() => navigate(`/student/progress/${c.id}`, { state: { courseName: c.name } })}
              >
                view details
              </Button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
