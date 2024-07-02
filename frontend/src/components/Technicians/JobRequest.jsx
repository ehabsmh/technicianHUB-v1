/* eslint-disable react/prop-types */
import { formatDistance } from "date-fns";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
// import React, { useRef } from "react";

const JobRequest = ({ job }) => {
  const { requestBy } = job;
  const jobReqLayerRef = useRef(null);

  function handleClick() {
    console.log(job);
    console.log(requestBy);
    jobReqLayerRef.current?.classList.toggle("scale-0");
  }
  return (
    <>
      <div
        className="job_req-layer absolute left-0 right-0 top-0 min-h-96 scale-0 bg-slate-200
       z-10 rounded-md duration-150 "
        ref={jobReqLayerRef}
      >
        <FontAwesomeIcon
          icon={faClose}
          className="absolute right-0 text-3xl p-2 cursor-pointer hover:bg-slate-300 rounded-full duration-150"
        />
        <div className="request-info">
          <div className="profile-picture flex justify-center">
            <img
              src={requestBy.picture || "/assets/images/default.jpg"}
              alt={`${requestBy.firstName} ${requestBy.lastName} photo`}
              className="w-28 rounded-full"
            />
          </div>
          <div className="request-details p-7 grid grid-cols-2 w-4/5 mx-auto">
            <p className="pe-10 mb-5">
              <span className="nunito-bold ">Name:</span> {requestBy.firstName}{" "}
              {requestBy.lastName}{" "}
            </p>
            <p className="pe-10 mb-5">
              <span>Address:</span> {requestBy.address}
            </p>
            <p className="pe-10 mb-5">
              <span>Phone number:</span> {requestBy.phone}
            </p>
            <p className="pe-10 mb-5">
              <span>Email:</span> {requestBy.email}
            </p>
            <p className="pe-10 mb-5">
              <span>Title:</span> {job.title}
            </p>
            <p>
              <span>Description:</span> {job.description}
            </p>
            <div className="">
              <button className="mr-4 register-buttons bg-sec w-36 py-3 hover:bg-sec-active">
                Accept
              </button>
              <button className="register-buttons bg-sec w-36 py-3 hover:bg-sec-active">
                Refuse
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-y-8">
        <div className="request w-44">
          <img
            src={requestBy.picture || "/assets/images/default.jpg"}
            alt={`${requestBy.firstName} ${requestBy.lastName} photo`}
            className="cursor-pointer"
            onClick={handleClick}
          />
          <p className="roboto-medium">
            {requestBy.firstName} {requestBy.lastName}
          </p>
          <p className="text-end nunito-bold text-gray-400">
            {formatDistance(job.createdAt, new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default JobRequest;
