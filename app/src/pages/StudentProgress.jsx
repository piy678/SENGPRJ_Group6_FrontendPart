import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button, Card } from "../components/UI.jsx";
import { requestJson } from "../api/http.js";
import { errorMessages, ErrorType } from "../api/errors.js";

export default function StudentProgress() {
  const nav = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();

  const base =
    window?.config?.apiBase ||
    import.meta.env.VITE_API ||
    "http://13.53.169.202:8080";

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const courseName = location.state?.courseName || "Course";

  const [summary, setSummary] = useState(null);
  const [rows, setRows] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [error, setError] = useState(null);

  const fmtDateTime = (iso) => (!iso ? "—" : new Date(iso).toLocaleString());

  useEffect(() => {
    setError(null);

    if (!currentUser) {
      setError("No logged-in student found.");
      return;
    }
    if (!courseId) {
      setError("No course selected.");
      return;
    }

    requestJson(`${base}/api/students/${currentUser.id}/progress?courseId=${courseId}`)
      .then((data) => {
        setSummary({
          totalLeos: data.totalLeos,
          achieved: data.achieved,
          partially: data.partially,
          notAchieved: data.notAchieved,
          unrated: data.unrated ?? data.unmarked ?? 0,
        });
        setBlocked(data.blocked || []);
        setRows(data.leoStatuses || []);
        setSuggestions(data.suggestions || []);
      })
      .catch((err) => {
        console.error(err);
        const type = err?.type ?? ErrorType.SERVER_ERROR;
        setError(errorMessages[type] ?? errorMessages[ErrorType.SERVER_ERROR]);
      });
  }, [base, currentUser?.id, courseId]);

  if (error) {
    return (
      <div>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: 700 }}>Progress</div>
          <Button className="back" onClick={() => nav(-1)}>Back</Button>
        </div>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!summary) return <div>Lade Fortschritt...</div>;

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: 700 }}>Progress - {courseName}</div>
        <Button className="back" onClick={() => nav(-1)}>Back</Button>
      </div>

      <Card>
        <div className="muted" style={{ marginBottom: 12 }}>Progress Overview</div>
        <div className="row" style={{ alignItems: "center", gap: 16 }}>
          <div className="muted">Total LEOs: {summary.totalLeos}</div>
          <div>Achieved: <b>{summary.achieved}</b></div>
          <div>Partially Achieved: <b>{summary.partially}</b></div>
          <div>Not achieved: <b>{summary.notAchieved}</b></div>
          <div>Unmarked: <b>{summary.unrated}</b></div>
        </div>
      </Card>

      <div className="spacer"></div>

      <Card>
        <table>
          <thead>
            <tr>
              <th>All LEOs</th>
              <th>Depends on</th>
              <th>Status</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.title}</td>
                <td>{r.dependsOn}</td>
                <td>{r.status}</td>
                <td>{fmtDateTime(r.lastUpdated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
