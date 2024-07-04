import { useContext } from "react";
import AuthContext from "../Global/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();

  const { loggedUser } = useContext(AuthContext);
  if (loggedUser) {
    return props.children;
  }

  navigate("/login");
};

export default ProtectedRoute;
