import { useContext, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../../components/Global/AuthContext";
import Layer from "../../components/Global/Layer";

export default function Profile() {
  const location = useLocation();
  const active = location.pathname;
  const jobReqLayerRef = useRef(null);
  const { loggedUser: technician } = useContext(AuthContext);
  const { technicianDetails } = technician;

  return (
    <>
      <section className="bg-slate-100">
        <div className="container w-4/5 mx-auto mt-10 bg-white border-b-2 relative">
          <Layer ref={jobReqLayerRef} />
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
              <h3 className="nunito-bold text-2xl">
                {technicianDetails.service}
              </h3>
              <h3 className="nunito-bold text-lg text-sec">
                {technicianDetails.salary}$/hr
              </h3>
              <div className="flex">
                <h3 className=" relative after:absolute after:rounded-full after:h-1 after:w-1 after:bg-sec after:top-1/2 after:-right-4 after:-translate-y-1/2">
                  Reviews Count{" "}
                  <span className="nunito-bold">
                    {technicianDetails.reviewsCount}
                  </span>
                </h3>
                <h3 className="pl-7">
                  Rate{" "}
                  <span className="nunito-bold">
                    {Number(technicianDetails.rate).toFixed(1)} / 5
                  </span>
                </h3>
              </div>
            </div>
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
                to={"requests"}
                className={`technician_profile-link ${
                  active.includes("requests") ? "bg-slate-200" : ""
                }`}
              >
                <li className="p-10 h-12 flex items-center hover:bg-slate-200 duration-300 rounded-md">
                  Job requests
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </section>
      <section className="mt-7">
        <div className="container w-4/5 mx-auto">
          <Outlet context={{ jobReqLayerRef }} />
        </div>
      </section>
    </>
  );
}
