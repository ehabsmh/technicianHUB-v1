/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import AuthContext from "../Global/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    if (!loggedUser) navigate("/login");
  }, []);

  if (loggedUser) {
    return props.children;
  }

  return null;
};

export default ProtectedRoute;
