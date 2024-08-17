/* eslint-disable no-unused-vars */
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
import { AuthProvider } from "./components/Global/AuthContext";
import Profile from "./pages/Technicians/Profile";
import JobRequests from "./pages/Technicians/JobRequests";
import Job from "./pages/Technicians/Job";
import MarkComplete from "./pages/Clients/MarkComplete";
import JobEstablish from "./components/Technicians/JobEstablish";
import Settings from "./pages/Technicians/Settings";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import ClientRoute from "./components/ProtectedRoutes/ClientsRoute";
import TechnicianRoute from "./components/ProtectedRoutes/TechnicianRoute";
import CompletedJobs from "./pages/Clients/CompletedJobs";
import Chats from "./pages/Global/Chats";

function App() {
  const [loading, setLoading] = useState(true);
  const [inJob, setInJob] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <AuthProvider>
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
                  <ProtectedRoute>
                    <ClientRoute>
                      <ClientLanding />
                    </ClientRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/"}
                element={
                  <ProtectedRoute>
                    <ClientRoute>
                      <ClientLanding />
                    </ClientRoute>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/tech"
                element={
                  <ProtectedRoute>
                    <TechnicianRoute>
                      <JobEstablish>
                        <TechLanding />
                      </JobEstablish>
                    </TechnicianRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <TechnicianRoute>
                      <JobEstablish>
                        <TechLanding />
                      </JobEstablish>
                    </TechnicianRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <TechnicianRoute>
                      <JobEstablish>
                        <Profile />
                      </JobEstablish>
                    </TechnicianRoute>
                  </ProtectedRoute>
                }
              >
                <Route
                  path="about"
                  element={
                    <ProtectedRoute>
                      <TechnicianRoute>
                        <JobEstablish>
                          <TechnicianBio />
                        </JobEstablish>
                      </TechnicianRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="reviews"
                  element={
                    <ProtectedRoute>
                      <TechnicianRoute>
                        <JobEstablish>
                          <TechnicianReviews />
                        </JobEstablish>
                      </TechnicianRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="requests"
                  element={
                    <ProtectedRoute>
                      <TechnicianRoute>
                        <JobEstablish>
                          <JobRequests />
                        </JobEstablish>
                      </TechnicianRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <ProtectedRoute>
                      <TechnicianRoute>
                        <JobEstablish>
                          <Settings />
                        </JobEstablish>
                      </TechnicianRoute>
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route
                path="/job/:jobId"
                element={
                  <ProtectedRoute>
                    <TechnicianRoute>
                      <Job setInJob={setInJob} />
                    </TechnicianRoute>
                  </ProtectedRoute>
                }
              />

              <Route
                path="technicians/:service"
                element={
                  <ProtectedRoute>
                    <ClientRoute>
                      <Technicians />
                    </ClientRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="technicians/:service/:id"
                element={
                  <ProtectedRoute>
                    <ClientRoute>
                      <Technician />
                    </ClientRoute>
                  </ProtectedRoute>
                }
              >
                <Route
                  path="reviews"
                  element={
                    <ProtectedRoute>
                      <ClientRoute>
                        <TechnicianReviews />
                      </ClientRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="completed-jobs"
                  element={
                    <ProtectedRoute>
                      <ClientRoute>
                        <CompletedJobs />
                      </ClientRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="about"
                  element={
                    <ProtectedRoute>
                      <ClientRoute>
                        <TechnicianBio />
                      </ClientRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="completed-jobs"
                  element={
                    <ProtectedRoute>
                      <ClientRoute>
                        <p>Completed Jobs</p>
                      </ClientRoute>
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="job-completed/:jobToken"
                element={
                  <ProtectedRoute>
                    <ClientRoute>
                      <MarkComplete />
                    </ClientRoute>
                  </ProtectedRoute>
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
                path="/chats"
                element={
                  <JobEstablish>
                    <Chats />
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
      </AuthProvider>
    </>
  );
}
export default App;
