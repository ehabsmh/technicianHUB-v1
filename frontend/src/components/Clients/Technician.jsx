/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Technician(props) {
  const { technician } = props;
  return (
    <>
      <div className="technician relative">
        <div className="rate-container">
          <h4 className="technician-rate text-white">
            {technician.technicianDetails.rate}
          </h4>
        </div>
        <Link>
          <img
            src="../assets/images/default.jpg"
            alt="xxxx"
            className="rounded-xl technician-picture"
          />
        </Link>
        <div className="flex justify-between">
          <h4 className="technician-name">{`${technician.firstName} ${technician.lastName}`}</h4>
          <h4 className="technician-salary">
            {technician.technicianDetails.salary}$/h
          </h4>
        </div>
      </div>
    </>
  );
}
