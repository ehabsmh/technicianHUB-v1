/* eslint-disable react/prop-types */
import { formatDistance } from "date-fns";
import "../../styles/register.css";

const JobRequest = ({ job, setActiveJob }) => {
  const { requestBy } = job;

  return (
    <>
      <div className="request w-44">
        <img
          src={requestBy.picture || "/assets/images/default.jpg"}
          alt={`${requestBy.firstName} ${requestBy.lastName} photo`}
          className="request-img cursor-pointer"
          onClick={() => setActiveJob(job)}
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
    </>
  );
};

export default JobRequest;

/*



*/
