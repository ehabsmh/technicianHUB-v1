import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MarkComplete() {
  const { jobToken } = useParams();

  const markJobAsComplete = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/users/confirmJobCompletion/${jobToken}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    markJobAsComplete();
  }, []);
  return (
    <>
      <p>Rate</p>
      <p>Review</p>
    </>
  );
}
