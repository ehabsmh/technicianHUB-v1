/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import "../../styles/register.css";
import TechnicianContext from "../../components/Global/Store";
import HireTechnician from "../../components/Clients/HireTechnician";

export default function Technician(props) {
  const [technician, setTechnician] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [hire, setHire] = useState(false);
  const [hired, setHired] = useState(false);
  const { user } = props;

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
      const { technicianDetails } = technician;
      const tech = { ...technician, ...technicianDetails };
      delete tech.technicianDetails;
      setTechnician(tech);
    } catch (error) {
      console.log(error);
    }
  };

  const linkClick = (link) => {
    setActive(link);
  };

  const handleHire = () => {
    setHire(true);
  };

  const checkHiredTechs = () => {
    const hiredTechnicians = user.customerDetails.assignedTechIds;
    if (hiredTechnicians.includes(technician._id)) {
      setHired(true);
    }
  };

  useEffect(() => {
    getTechnician();
    linkClick(active);
    checkHiredTechs();
  }, [technician, hired]);

  if (window.location.pathname.split("/").length <= 4) {
    return <Navigate to={`${window.location.pathname}/about`} />;
  }

  return (
    <TechnicianContext.Provider value={technician}>
      <section className="bg-slate-100">
        <div className="container w-4/5 mx-auto mt-10 bg-white border-b-2 relative">
          {hire && <HireTechnician setHire={setHire} setHired={setHired} />}
          <div className="flex items-center space-x-4 p-3">
            <div className="tech-photo">
              <img
                src={"/assets/images/default.jpg"}
                alt={`${technician.firstName} ${technician.lastName} photo`}
                className="w-40 rounded-full "
              />
              <p className="text-center nunito-medium text-lg">
                {technician.firstName} {technician.lastName}
              </p>
            </div>
            <div>
              <h3 className="nunito-bold text-2xl">{technician.service}</h3>
              <h3 className="nunito-bold text-lg text-sec">
                {technician.salary}$/hr
              </h3>
              <div className="flex">
                <h3 className=" relative after:absolute after:rounded-full after:h-1 after:w-1 after:bg-sec after:top-1/2 after:-right-4 after:-translate-y-1/2">
                  Reviews Count{" "}
                  <span className="nunito-bold">{technician.reviewsCount}</span>
                </h3>
                <h3 className="pl-7">
                  Rate{" "}
                  <span className="nunito-bold">{technician.rate} / 5</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="contacts mt-7 p-3">
            {hired ? (
              <button className="w-36 py-3 px-5 mr-11 bg-sec text-center register-buttons cursor-default text-white ">
                Hired
              </button>
            ) : (
              <button
                className="w-36 py-3 px-5 mr-11 bg-sec text-center register-buttons text-white hover:bg-sec-active"
                onClick={handleHire}
              >
                Hire
              </button>
            )}

            <Link className="py-3 px-5 mr-11 register-buttons bg-sec text-center hover:bg-sec-active">
              <button className="w-32">Send message</button>
            </Link>
          </div>
          <nav className="mt-16 mb-7 relative before:absolute before:-top-5 before:bg-slate-200 before:h-0.5 before:w-full">
            <ul className="flex w-1/3 justify-between p-5 items-center">
              <Link
                to={"about"}
                className={`technician_profile-link ${
                  active.includes("about") ? "bg-slate-200" : ""
                }`}
              >
                <li className="p-10 h-12 flex items-center hover:bg-slate-200 duration-300 rounded-md">
                  Bio
                </li>
              </Link>
              <Link
                to={"reviews"}
                className={`technician_profile-link ${
                  active.includes("reviews") ? "bg-slate-200" : ""
                }`}
              >
                <li className="p-10 h-12 flex items-center hover:bg-slate-200 duration-300 rounded-md">
                  Reviews
                </li>
              </Link>
              <Link
                to={"completed-jobs"}
                className={`technician_profile-link ${
                  active.includes("completed-jobs") ? "bg-slate-200" : ""
                }`}
              >
                <li className="p-10 h-12 flex items-center hover:bg-slate-200 duration-300 rounded-md">
                  Completed jobs
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </section>
      <section className="mt-7">
        <div className="container w-4/5 mx-auto">
          <Outlet />
        </div>
      </section>
    </TechnicianContext.Provider>
  );
}
