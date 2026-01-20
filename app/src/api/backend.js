
const API_BASE_URL =
  window?.config?.apiBase ||
  import.meta.env.VITE_API ||
  "http://13.53.169.202:8080";

export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/api/users`);

  if (!response.ok) {
    throw new Error("Fehler beim Laden der Users");
  }

  return response.json();
}

export async function fetchCourses() {
  const response = await fetch(`${API_BASE_URL}/api/courses`);

  if (!response.ok) {
    throw new Error("Fehler beim Laden der Kurse");
  }

  return response.json();
}

export async function getCourses() {
  const res = await fetch(`${API_BASE_URL}/api/courses`);

  if (!res.ok) {
    throw new Error("Fehler beim Laden der Kurse");
  }
  return res.json();
}


export async function createCourse(course) {
  const res = await fetch(`${API_BASE_URL}/api/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });

  if (!res.ok) {
    throw new Error("Fehler beim Anlegen des Kurses");
  }
  return res.json();
}


export async function getStudentProgress(studentId) {
  const res = await fetch(`${API_BASE_URL}/api/students/${studentId}/progress`);

  if (!res.ok) {
    throw new Error("Fehler beim Laden des Fortschritts");
  }
  return res.json();
}

export async function getCoursesForTeacher(teacherId) {
  const res = await fetch(`${API_BASE_URL}/api/courses/teacher/${teacherId}`);
  if (!res.ok) {
    throw new Error("Fehler beim Laden der Kurse");
  }
  return res.json();
}

export async function createCourseForTeacher({ teacherId, name }) {
  const res = await fetch(`${API_BASE_URL}/api/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teacherId, name }),
  });
  if (!res.ok) {
    throw new Error("Fehler beim Anlegen des Kurses");
  }
  return res.json();
}


export async function deleteCourse(courseId) {
  const res = await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
    method: "DELETE",
  });
  if (!res.ok && res.status !== 204) {
    throw new Error("Fehler beim Löschen des Kurses");
  }
}
