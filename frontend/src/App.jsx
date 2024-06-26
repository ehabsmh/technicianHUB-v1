import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import Spinner from "./components/Spinner";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={loading ? <Spinner /> : <Landing />} />
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
  );
}
export default App;
