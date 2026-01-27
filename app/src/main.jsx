import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Landing from './pages/Landing.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import StudentProgress from './pages/StudentProgress.jsx';
import TeacherDashboard from './pages/teacher/TeacherDashboard.jsx';
import AddCourse from './pages/teacher/tabs/AddCourse.jsx';
import Login from './pages/Login.jsx';
import { Navigate } from 'react-router-dom';


const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },

  { path: '/student/*', element: <StudentDashboard /> },
  { path: '/student/progress/:courseId', element: <StudentProgress /> },

  { path: '/teacher/*', element: <TeacherDashboard /> },

  { path: '/teacher/courses/new', element: <AddCourse /> },
  { path: '*', element: <Navigate to="/login" replace /> },
]);



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
