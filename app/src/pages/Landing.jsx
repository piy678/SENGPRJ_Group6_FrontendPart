import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI.jsx';

export default function Landing() {
  const nav = useNavigate();

  return (
    <div style={{ display:'grid', placeItems:'center', height:'70vh', gap:24 }}>
      <h1 style={{ fontSize: 48, margin:0 }}>LEO Assessment Tool</h1>

      <div className="row">
        <Button onClick={() => nav('/login?role=TEACHER')} variant="ghost">
          Teacher Login
        </Button>
        
        <Button onClick={() => nav('/login?role=STUDENT')} variant="ghost">
          Student Login
        </Button>
      </div>
    </div>
  );
}
