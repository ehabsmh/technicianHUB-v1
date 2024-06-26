import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import Spinner from "./components/Spinner";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={loading ? <Spinner /> : <Landing />} />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <div>login</div>
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <div>Register</div>
            </>
          }
        />
      </Routes>
    </>
  );
}
export default App;
