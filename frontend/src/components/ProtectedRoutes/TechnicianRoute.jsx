/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import AuthContext from "../Global/AuthContext";
import { useContext } from "react";

const TechnicianRoute = ({ children }) => {
  const { loggedUser } = useContext(AuthContext);
  if (loggedUser.role === "technician") {
    return children;
  }
  return <Navigate to="/client" />;
};

export default TechnicianRoute;
