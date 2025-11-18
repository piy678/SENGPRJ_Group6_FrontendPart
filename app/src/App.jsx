import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import TeacherDashboard from './pages/teacher/TeacherDashboard.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx'; // Pfad ggf. anpassen

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />

      {/* Default: alles andere geht auf Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}


/*
export default function App() {
  return (
    <div>
      <div className="topbar"><div className="title">LEO Assessment Tool</div></div>
      <div className="shell"><Outlet /></div>
    </div>
  );
}

*/
/*
export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1> Electron + Vite + React läuft</h1>
      <p>Wenn du das siehst, sind Pfade & Dev-Server korrekt.</p>
    </div>
  );
}
*/