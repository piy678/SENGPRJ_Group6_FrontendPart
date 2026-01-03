import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/UI.jsx";
import ConductAssessments from "./tabs/ConductAssessments.jsx";

export default function CourseReviewsPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div>
      <Button className="ghost" onClick={() => navigate("/teacher")}>← Back</Button>
      <div className="spacer" />
      <ConductAssessments courseId={Number(courseId)} />
    </div>
  );
}
