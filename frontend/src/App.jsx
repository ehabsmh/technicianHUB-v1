import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import Spinner from "./components/Spinner";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Global/Register";
import ConfirmEmail from "./pages/Global/ConfirmEmail";
import Login from "./pages/Global/Login";

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
          spinnerSize="80px"
          spinnerClassName="page-spinner"
        />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
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
