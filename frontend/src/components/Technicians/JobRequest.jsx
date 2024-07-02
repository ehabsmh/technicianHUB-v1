/* eslint-disable react/prop-types */
import { formatDistance } from "date-fns";
// import React, { useRef } from "react";

const JobRequest = ({ job, jobReqLayerRef }) => {
  const { requestBy } = job;

  function handleClick() {
    jobReqLayerRef.current?.classList.toggle("scale-0");
  }
  return (
    <>
      <div className="grid grid-cols-3 w-4/5 mx-auto gap-y-8">
        <div className="request w-44">
          <img
            src="/assets/images/default.jpg"
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
