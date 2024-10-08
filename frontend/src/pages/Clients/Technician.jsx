/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
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
import AuthContext from "../../components/Global/AuthContext";
import ChatBox from "../../components/Global/ChatBox";

export default function Technician() {
  const [technician, setTechnician] = useState({});
  const [hire, setHire] = useState(false);
  const [hired, setHired] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const active = location.pathname;
  const { loggedUser } = useContext(AuthContext);
  const layer = useRef(null);

  const handleHire = () => {
    setHire(true);
  };

  useEffect(() => {
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
    getTechnician();
  }, [id]);

  useEffect(() => {
    const checkHiredTechs = () => {
      const { assignedTechIds } = loggedUser.customerDetails;
      if (assignedTechIds.includes(technician._id)) {
        setHired(true);
      }
    };

    checkHiredTechs();
  });

  if (window.location.pathname.split("/").length <= 4) {
    return <Navigate to={`${window.location.pathname}/about`} />;
  }

  return (
    <>
      <div
        className="layer absolute w-full h-full bg-opacity-80 bg-black z-10 hidden justify-center"
        ref={layer}
        onClick={(e) => {
          if (!e.target.classList.contains("layer")) return;
          e.target.classList.remove("flex");
          e.target.classList.add("hidden");
        }}
      >
        <img
          src={`http://localhost:3000/${technician.image}`}
          alt={`${technician.firstName} ${technician.lastName} photo`}
          className=""
        />
      </div>
      <TechnicianContext.Provider value={technician}>
        <section className="container mx-auto w-4/5 relative">
          {hire && (
            <HireTechnician
              setHire={setHire}
              setHired={setHired}
              // verifyToken={verifyToken}
            />
          )}
          <div className="flex items-center space-x-4 p-3">
            <div className="tech-photo">
              {technician.image ? (
                <img
                  src={`http://localhost:3000/${technician.image}`}
                  alt={`${technician.firstName} ${technician.lastName} photo`}
                  className="w-40 h-40 rounded-full cursor-pointer"
                  onClick={() => {
                    layer?.current.classList.remove("hidden");
                    layer?.current.classList.add("flex");
                  }}
                />
              ) : (
                <img
                  src={"/assets/images/default.jpg"}
                  alt={`${technician.firstName} ${technician.lastName} photo`}
                  className="w-40 rounded-full min-h-40 max-h-40"
                />
              )}
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
                  <span className="nunito-bold">
                    {Number(technician.rate).toFixed(1)} / 5
                  </span>
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
                className="w-40 py-3 px-5 mr-11 bg-sec text-center register-buttons text-white hover:bg-sec-active"
                onClick={handleHire}
              >
                Hire
              </button>
            )}

            <button
              className="w-40 py-3 px-5 mr-11 register-buttons bg-sec text-center hover:bg-sec-active"
              onClick={() => {
                setChatOpen(true);
              }}
            >
              Send message
            </button>
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
        </section>
        <section className="mt-7">
          <div className="container w-4/5 mx-auto">
            <Outlet />
          </div>
        </section>
        {chatOpen ? <ChatBox setChatOpen={setChatOpen} /> : null}
      </TechnicianContext.Provider>
    </>
  );
}
