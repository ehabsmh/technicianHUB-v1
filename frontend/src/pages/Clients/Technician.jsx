import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Technician() {
  const [technician, setTechnician] = useState({});
  const { id } = useParams();
  const getTechnician = async () => {
    const options = {
      headers: { token: localStorage.getItem("token") },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/users/technicians/${id}`,
        options
      );
      const { technician } = data;
      setTechnician(technician);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTechnician();
  }, []);

  return (
    <>
      <div className="container w-4/5 mx-auto"></div>
    </>
  );
}
