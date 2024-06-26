import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import Spinner from "./components/Spinner";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);

  return <>{loading ? <Spinner /> : <Landing />}</>;
}
export default App;
