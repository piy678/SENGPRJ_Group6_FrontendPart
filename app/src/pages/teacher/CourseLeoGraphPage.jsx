import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/UI.jsx";
import CreateGraph from "./tabs/CreateGraph.jsx";

export default function CourseLeoGraphPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div>
      <Button className="ghost" onClick={() => navigate("/teacher")}>← Back</Button>
      <div className="spacer" />
      <CreateGraph courseId={Number(courseId)} />
    </div>
  );
}
