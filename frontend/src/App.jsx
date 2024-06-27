import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import Spinner from "./components/Spinner";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Global/Register";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner
          spinnerColor="#123abc"
          spinnerSize="80"
          spinnerClassName="page-spinner"
        />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                loading ? (
                  <Spinner
                    spinnerColor="#123abc"
                    spinnerSize="80px"
                    spinnerClassName="page-spinner"
                  />
                ) : (
                  <Landing />
                )
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <div>login</div>
                </>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="*" element=<p>404 not found</p> />
          </Routes>
        </>
      )}
    </>
  );
}
export default App;
