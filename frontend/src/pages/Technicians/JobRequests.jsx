import { useEffect, useState } from "react";
import JobRequest from "../../components/Technicians/JobRequest";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function JobRequests() {
  const [jobRequests, setJobRequests] = useState([]);
  const { jobReqLayerRef } = useOutletContext();

  const getJobRequests = async () => {
    const options = {
      headers: { token: localStorage.getItem("token") },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/technicians/jobRequests`,
        options
      );
      console.log(data);
      setJobRequests(data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobRequests();
  }, []);

  return (
    <>
      {jobRequests.length ? (
        jobRequests.map((jobRequest, i) => {
          console.log(jobRequest);
          return (
            <JobRequest
              key={i}
              job={jobRequest}
              jobReqLayerRef={jobReqLayerRef}
            />
          );
        })
      ) : (
        <p className="text-end nunito-bold text-gray-400">No jobs found</p>
      )}
    </>
  );
}
