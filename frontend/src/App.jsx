/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ClientLanding from "./pages/Clients/ClientLanding";
import TechLanding from "./pages/Technicians/TechLanding";
import Spinner from "./components/Spinner";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Global/Register";
import ConfirmEmail from "./pages/Global/ConfirmEmail";
import Login from "./pages/Global/Login";
import { jwtDecode } from "jwt-decode";
import Technicians from "./pages/Clients/Technicians";
import Technician from "./pages/Clients/Technician";
import TechnicianBio from "./pages/Global/TechnicianBio";
import TechnicianReviews from "./pages/Global/TechnicianReviews";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const verifyToken = () => {
    if (localStorage.getItem("token")) {
      const userToken = localStorage.getItem("token");

      const { user } = jwtDecode(userToken);
      setUser(user);
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
      return props.children;
    }

    navigate("/login");
  };

  const ClientRoute = (props) => {
    if (user.role === "user") {
      return props.children;
    }
    return <Navigate to="/tech" />;
  };

  const TechnicianRoute = (props) => {
    if (user.role === "technician") {
      return props.children;
    }
    return <Navigate to="/client" />;
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

            {/* <Route
              path="/technicians"
              element={
                <ProtectedRoutes>
                  <ClientRoute>
                    <Technicians />
                  </ClientRoute>
                </ProtectedRoutes>
              }
            /> */}

            <Route
              path="technicians/:service"
              element={
                <ProtectedRoutes>
                  <ClientRoute>
                    <Technicians />
                  </ClientRoute>
                </ProtectedRoutes>
              }
            />
            <Route
              path="technicians/:service/:id"
              element={
                <ProtectedRoutes>
                  <ClientRoute>
                    <Technician />
                  </ClientRoute>
                </ProtectedRoutes>
              }
            >
              <Route
                path="reviews"
                element={
                  <ProtectedRoutes>
                    <ClientRoute>
                      <TechnicianReviews user={user} />
                    </ClientRoute>
                  </ProtectedRoutes>
                }
              />
              <Route
                path="about"
                element={
                  <ProtectedRoutes>
                    <ClientRoute>
                      <TechnicianBio />
                    </ClientRoute>
                  </ProtectedRoutes>
                }
              />
              <Route
                path="completed-jobs"
                element={
                  <ProtectedRoutes>
                    <ClientRoute>
                      <p>Completed Jobs</p>
                    </ClientRoute>
                  </ProtectedRoutes>
                }
              />
            </Route>
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
