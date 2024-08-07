/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Technician(props) {
  const { technician } = props;

  return (
    <>
      <div className="technician">
        <div className="image relative">
          <div className="rate-container">
            <h4 className="technician-rate text-white">
              {Number(Math.round(technician.technicianDetails.rate))}/5
            </h4>
          </div>
          <Link to={`${technician._id}`}>
            {technician.image ? (
              <img
                src={`http://localhost:3000/${technician.image}`}
                alt={`${technician.firstName} ${technician.lastName} photo`}
                className=" cursor-pointer"
              />
            ) : (
              <img
                src={"/assets/images/default.jpg"}
                alt={`${technician.firstName} ${technician.lastName} photo`}
                className=" cursor-pointer"
              />
            )}
          </Link>
        </div>
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
