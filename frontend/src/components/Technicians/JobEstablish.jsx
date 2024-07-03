/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function JobEstablish({ children }) {
  const inJob = localStorage.getItem("jobId");

  if (!inJob) return children;

  return <Navigate to={`/job/${inJob}`} />;
}
