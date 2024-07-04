import { useEffect, useRef, useState } from "react";
import JobRequest from "../../components/Technicians/JobRequest";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function JobRequests() {
  const [jobRequests, setJobRequests] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const requestBy = activeJob?.requestBy;
  const jobReqLayerRef = useRef(null);
  const navigate = useNavigate();

  const getJobRequests = async () => {
    const options = {
      headers: { token: localStorage.getItem("token") },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/technicians/jobRequests`,
        options
      );

      setJobRequests(data.jobs);
    } catch (error) {
      setJobRequests([]);
    }
  };

  const refuseJobRequests = async () => {
    const options = {
      headers: { token: localStorage.getItem("token") },
    };
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/technicians/jobRequests/${activeJob._id}`,
        options
      );

      setActiveJob(null);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptJobRequest = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/technicians/jobState`,
        { requestNo: activeJob._id },
        { headers: { token: localStorage.getItem("token") } }
      );

      localStorage.setItem("jobId", data.jobState._id);
      await refuseJobRequests();
      return navigate(`/job/${data.jobState._id}`);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    getJobRequests();
  }, [activeJob]);

  return (
    <>
      {activeJob ? (
        <div
          className="job_req-layer absolute left-0 right-0 top-0 min-h-96 bg-slate-200
   z-10 rounded-md duration-150"
          ref={jobReqLayerRef}
        >
          <FontAwesomeIcon
            icon={faClose}
            className="absolute right-0 text-3xl p-2 cursor-pointer hover:bg-slate-300 rounded-full duration-150"
            onClick={() => setActiveJob(null)}
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
                <span className="nunito-bold ">Name:</span>{" "}
                {requestBy.firstName} {requestBy.lastName}{" "}
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
                <span>Title:</span> {activeJob.title}
              </p>
              <p>
                <span>Description:</span> {activeJob.description}
              </p>
              <div>
                <button
                  className="mr-4 register-buttons bg-sec w-36 py-3 hover:bg-sec-active"
                  onClick={acceptJobRequest}
                >
                  Accept
                </button>
                <button
                  className="register-buttons bg-sec w-36 py-3 hover:bg-sec-active"
                  onClick={() => {
                    refuseJobRequests();
                  }}
                >
                  Refuse
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="grid grid-cols-3 gap-y-8">
        {jobRequests.length ? (
          jobRequests.map((jobRequest, i) => (
            <JobRequest key={i} job={jobRequest} setActiveJob={setActiveJob} />
          ))
        ) : (
          <p className="nunito-bold text-gray-400">No jobs found.</p>
        )}
      </div>
    </>
  );
}
