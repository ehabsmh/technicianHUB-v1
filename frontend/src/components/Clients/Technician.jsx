/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Technician(props) {
  const { technician } = props;

  return (
    <>
      <div className="technician relative px-3">
        <div className="rate-container">
          <h4 className="technician-rate text-white">
            {Number(Math.round(technician.technicianDetails.rate))}/5
          </h4>
        </div>
        <Link to={`${technician._id}`}>
          <img
            src="/assets/images/default.jpg"
            alt=""
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
