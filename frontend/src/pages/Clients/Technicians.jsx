import { Link, useParams } from "react-router-dom";
import "../../styles/technician.css";
import Technician from "../../components/Clients/Technician";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Technicians() {
  const [technicians, setTechnicians] = useState([]);
  const { service } = useParams();
  const getTechniciansByService = async () => {
    const options = {
      params: { service: service || "plumber" },
      headers: { token: localStorage.getItem("token") },
    };
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/users/technicians/",
        options
      );
      setTechnicians(data.technicians);
      console.log(data.technicians);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTechniciansByService();
  }, []);

  return (
    <>
      <div className="container w-4/5 mx-auto mt-10">
        <h2 className="nunito-bold text-2xl mb-10">
          Choose the technician according to your need.
        </h2>
        <div className="grid grid-cols-2 w-11/12">
          <div className="category bg-slate-100 w-2/5 p-5 rounded-md">
            <ul className="flex flex-col gap-y-5">
              <li>
                <Link
                  to={"/technicians/plumber"}
                  className="hover:text-sec nunito-medium duration-200"
                  onClick={getTechniciansByService}
                >
                  Plumbers
                </Link>
              </li>
              <li>
                <Link
                  to={"/technicians/fridges technician"}
                  className="hover:text-sec nunito-medium duration-200"
                  onClick={getTechniciansByService}
                >
                  Fridges Technician
                </Link>
              </li>
              <li>
                <Link
                  to={"/technicians/air conditions technician"}
                  className="hover:text-sec nunito-medium duration-200"
                  onClick={getTechniciansByService}
                >
                  Air Conditions Technician
                </Link>
              </li>
            </ul>
          </div>
          <div className="technicians grid grid-cols-4 gap-10">
            {technicians.map((technician, i) => (
              <Technician key={i} technician={technician} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
