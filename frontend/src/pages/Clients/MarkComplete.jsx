import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../components/Global/AuthContext";

export default function MarkComplete() {
  const { jobToken } = useParams();
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const markJobAsComplete = async () => {
    try {
      await axios.get(
        `http://localhost:3000/api/v1/users/confirmJobCompletion/${jobToken}`,
        { headers: { token: localStorage.getItem("token") } }
      );

      const oldToken = localStorage.getItem("token");
      refreshToken(oldToken);
      return navigate("/technicians/plumber");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    markJobAsComplete();
  }, []);

  return <></>;
}
