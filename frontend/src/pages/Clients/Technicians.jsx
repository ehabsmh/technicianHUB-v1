import { Link, useParams } from "react-router-dom";
import "../../styles/technician.css";
import Technician from "../../components/Clients/Technician";
import axios from "axios";
import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";

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
        {/* <div className="filter-container w-80 mb-8 flex flex-wrap relative ">
          <h3>Filter</h3>
          <FontAwesomeIcon
            icon={faFilter}
            className="filter-icon text-sec text-2xl px-3"
          />

          <div className="filter w-60 p-5 rounded-md modal absolute top-full ">
            <p>By Salary:</p>
            <div className="salary flex justify-between mb-5">
              <input
                id="lessPaid"
                type="radio"
                value="lessPaid"
                name="filterSalary"
              />
              <label htmlFor="lessPaid">Less paid</label>
              <input
                id="highPaid"
                type="radio"
                value="highPaid"
                name="filterSalary"
              />
              <label htmlFor="highPaid">High paid</label>
            </div>
            <p>By Rate:</p>
            <div className="rate flex justify-between">
              <input
                id="lessRate"
                type="radio"
                value="lessRate"
                name="filterRate"
              />
              <label htmlFor="lessRate">Less rate</label>
              <input
                id="highRate"
                type="radio"
                value="highRate"
                name="filterRate"
              />
              <label htmlFor="highRate">High rate</label>
            </div>
          </div>
        </div> */}
        <div className="grid grid-cols-2 w-11/12">
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
          <div className="technicians grid grid-cols-3 gap-10">
            {technicians.map((technician, i) => (
              <Technician key={i} technician={technician} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
