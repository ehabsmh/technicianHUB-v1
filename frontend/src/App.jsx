/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Landing from "./pages/Clients/Landing";
import Spinner from "./components/Spinner";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Global/Register";
import ConfirmEmail from "./pages/Global/ConfirmEmail";
import Login from "./pages/Global/Login";
import { jwtDecode } from "jwt-decode";
function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const verifyToken = () => {
    if (localStorage.getItem("token")) {
      const userToken = localStorage.getItem("token");
      // setUserToken();
      const { user } = jwtDecode(userToken);
      setUser(user);
    }
  };

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
    verifyToken();
  }, []);

  const ProtectedRoutes = (props) => {
    if (user) {
      console.log(user);
      return props.children;
    }

    navigate("/login");
  };

  return (
    <>
      {loading ? (
        <Spinner
          spinnerColor="#123abc"
          spinnerSize="80px"
          spinnerClassName="page-spinner"
        />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Landing />
                </ProtectedRoutes>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element=<p>404 not found</p> />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
          </Routes>
        </>
      )}
    </>
  );
}
export default App;
