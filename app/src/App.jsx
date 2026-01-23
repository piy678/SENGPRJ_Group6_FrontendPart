import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import TeacherDashboard from './pages/teacher/TeacherDashboard.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx'; // Pfad ggf. anpassen
import CourseLeoGraphPage from './pages/teacher/CourseLeoGraphPage.jsx';
import CourseReviewsPage from './pages/teacher/CourseReviewsPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/teacher/*" element={<TeacherDashboard />} />
       <Route path="/student/progress/:courseId" element={<StudentProgress />} />
      <Route path="/student" element={<StudentDashboard />} />
<Route path="/student/*" element={<StudentDashboard />} />

      {/* Default: alles andere geht auf Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
