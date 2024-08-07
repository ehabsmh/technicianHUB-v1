import { Link, useParams } from "react-router-dom";
import "../../styles/technician.css";
import Technician from "../../components/Clients/Technician";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function Technicians() {
  const [technicians, setTechnicians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { service } = useParams();

  useEffect(() => {
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getTechniciansByService();
  }, [service]);

  return (
    <>
      <div className="container w-4/5 mx-auto mt-10">
        <h2 className="nunito-bold text-2xl mb-10">
          Choose the technician according to your need.
        </h2>
        <div className="grid grid-cols-2">
          <div className="category bg-slate-100 w-2/5 p-5 rounded-md min-h-96">
            <ul className="flex flex-col gap-y-5">
              <li>
                <Link
                  to={"/technicians/plumber"}
                  className="hover:text-sec nunito-medium duration-200"
                >
                  Plumbers
                </Link>
              </li>
              <li>
                <Link
                  to={"/technicians/fridges technician"}
                  className="hover:text-sec nunito-medium duration-200"
                >
                  Fridges Technician
                </Link>
              </li>
              <li>
                <Link
                  to={"/technicians/air conditions technician"}
                  className="hover:text-sec nunito-medium duration-200"
                >
                  Air Conditions Technician
                </Link>
              </li>
            </ul>
          </div>
          {isLoading && (
            <Spinner
              spinnerColor="#388da8"
              spinnerSize="30px"
              spinnerClassName="register-spinner"
            />
          )}
          {!isLoading && !technicians.length ? (
            <p className="nunito-bold text-gray-400">No technicians found.</p>
          ) : (
            <div className="technicians grid grid-cols-3 gap-16">
              {technicians.map((technician, i) => (
                <Technician key={i} technician={technician} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
