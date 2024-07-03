/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import ClientLanding from "./pages/Clients/ClientLanding";
import TechLanding from "./pages/Technicians/TechLanding";
import Spinner from "./components/Spinner";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Global/Register";
import ConfirmEmail from "./pages/Global/ConfirmEmail";
import Login from "./pages/Global/Login";
// import { jwtDecode } from "jwt-decode";
import Technicians from "./pages/Clients/Technicians";
import Technician from "./pages/Clients/Technician";
import TechnicianBio from "./pages/Global/TechnicianBio";
import TechnicianReviews from "./pages/Global/TechnicianReviews";
import AuthContext from "./components/Global/AuthContext";
import Profile from "./pages/Technicians/Profile";
import JobRequests from "./pages/Technicians/JobRequests";
import Job from "./pages/Technicians/Job";
import MarkComplete from "./pages/Clients/MarkComplete";
import JobEstablish from "./components/Technicians/JobEstablish";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);

  const ProtectedRoutes = (props) => {
    console.log(loggedUser);
    if (loggedUser) {
      return props.children;
    }

    navigate("/login");
  };

  const ClientRoute = (props) => {
    if (loggedUser.role === "user") {
      return props.children;
    }
    return <Navigate to="/tech" />;
  };

  const TechnicianRoute = (props) => {
    if (loggedUser.role === "technician") {
      return props.children;
    }
    return <Navigate to="/client" />;
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
          <JobEstablish>
            <Navbar />
          </JobEstablish>
          <Routes>
            <Route
              path={"/client"}
              element={
                <ProtectedRoutes>
                  <ClientRoute>
                    <ClientLanding />
                  </ClientRoute>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/tech"
              element={
                <ProtectedRoutes>
                  <TechnicianRoute>
                    <JobEstablish>
                      <TechLanding />
                    </JobEstablish>
                  </TechnicianRoute>
                </ProtectedRoutes>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoutes>
                  <TechnicianRoute>
                    <JobEstablish>
                      <Profile />
                    </JobEstablish>
                  </TechnicianRoute>
                </ProtectedRoutes>
              }
            >
              <Route
                path="about"
                element={
                  <ProtectedRoutes>
                    <TechnicianRoute>
                      <JobEstablish>
                        <TechnicianBio />
                      </JobEstablish>
                    </TechnicianRoute>
                  </ProtectedRoutes>
                }
              />
              <Route
                path="reviews"
                element={
                  <ProtectedRoutes>
                    <TechnicianRoute>
                      <JobEstablish>
                        <TechnicianReviews />
                      </JobEstablish>
                    </TechnicianRoute>
                  </ProtectedRoutes>
                }
              />
              <Route
                path="requests"
                element={
                  <ProtectedRoutes>
                    <TechnicianRoute>
                      <JobEstablish>
                        <JobRequests />
                      </JobEstablish>
                    </TechnicianRoute>
                  </ProtectedRoutes>
                }
              />
            </Route>

            <Route
              path="/job/:jobId"
              element={
                <ProtectedRoutes>
                  <TechnicianRoute>
                    <Job />
                  </TechnicianRoute>
                </ProtectedRoutes>
              }
            />

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
                      <TechnicianReviews />
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
              path="job-completed/:jobToken"
              element={
                <ProtectedRoutes>
                  <ClientRoute>
                    <MarkComplete />
                  </ClientRoute>
                </ProtectedRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <JobEstablish>
                  <Login />
                </JobEstablish>
              }
            />
            <Route
              path="/register"
              element={
                <JobEstablish>
                  <Register />
                </JobEstablish>
              }
            />
            {/* <Route path="*" element=<p>404 not found</p> /> */}
            <Route
              path="/confirm-email"
              element={
                <JobEstablish>
                  <ConfirmEmail />
                </JobEstablish>
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}
export default App;
