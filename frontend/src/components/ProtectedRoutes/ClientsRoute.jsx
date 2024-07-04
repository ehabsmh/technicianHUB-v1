/* eslint-disable react/prop-types */
import { useContext } from "react";
import AuthContext from "../Global/AuthContext";
import { Navigate } from "react-router-dom";

const ClientRoute = ({ children }) => {
  const { loggedUser } = useContext(AuthContext);
  if (loggedUser.role === "user") {
    return children;
  }
  return <Navigate to="/tech" />;
};

export default ClientRoute;
