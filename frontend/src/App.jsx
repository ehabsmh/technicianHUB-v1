/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ClientLanding from "./pages/Clients/ClientLanding";
import TechLanding from "./pages/Technicians/TechLanding";
import Spinner from "./components/Spinner";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Global/Register";
import ConfirmEmail from "./pages/Global/ConfirmEmail";
import Login from "./pages/Global/Login";
import { jwtDecode } from "jwt-decode";
import Technicians from "./pages/Clients/Technicians";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const verifyToken = () => {
    if (localStorage.getItem("token")) {
      const userToken = localStorage.getItem("token");

      const { user } = jwtDecode(userToken);
      setUser(user);
      console.log(user);
      return user;
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

  const ClientRoute = (props) => {
    if (user.role === "user") {
      return props.children;
    }
    return <p>404 not found</p>;
  };

  const TechnicianRoute = (props) => {
    if (user.role === "technician") {
      return props.children;
    }
    return <p>404 not found</p>;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
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
          <Navbar user={user} logout={logout} />
          <Routes>
            <Route
              path={"/client/"}
              element={
                <ProtectedRoutes>
                  <ClientRoute>
                    <ClientLanding />
                  </ClientRoute>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/tech/"
              element={
                <ProtectedRoutes>
                  <TechnicianRoute>
                    <TechLanding />
                  </TechnicianRoute>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/technicians"
              element={
                <ProtectedRoutes>
                  <ClientRoute>
                    <Technicians />
                  </ClientRoute>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/login"
              element={<Login verifyToken={verifyToken} />}
            />
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
