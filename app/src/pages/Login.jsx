import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/UI.jsx';



export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError(null);

const base =
  window?.config?.apiBase ||
  import.meta.env.VITE_API ||
  "http://13.53.169.202:8080";


    try {
      const res = await fetch(`${base}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        setError("Falscher Benutzername oder Passwort");
        return;
      }

      const user = await res.json();

     
      localStorage.setItem('currentUser', JSON.stringify(user));

      
      user.role === 'TEACHER'
        ? navigate('/teacher')
        : navigate('/student');

    } catch (err) {
      console.error(err);
      setError("Backend nicht erreichbar");
    }
  };

  return (
    <div className="login-container">
      <Card>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <label>Username</label>
          <input name="username" value={form.username} onChange={onChange} />

          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={onChange} />

          {error && <div style={{ color: 'red' }}>{error}</div>}

          <Button type="submit">Login</Button>

<Button
  type="button"
  variant="secondary"
  onClick={() => navigate('/')}
  style={{ marginTop: 10 }}
>
  Zurück zur Startseite
</Button>

        </form>
      </Card>
    </div>
  );
}
