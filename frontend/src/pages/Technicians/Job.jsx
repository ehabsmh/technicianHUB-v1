/* eslint-disable react/prop-types */
import Spinner from "../../components/Spinner";
import { useEffect, useState } from "react";
import "../../styles/register.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import JobConfirm from "../../components/Technicians/JobConfirm";
import JobCompleted from "../../components/Technicians/JobCompleted";

export default function Job(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState("pending");
  const [barProgress, setBarProgress] = useState("before:right-100");
  const { jobId } = useParams();

  const checkJobStatus = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/technicians/jobState/${jobId}/status`,
        { headers: { token: localStorage.getItem("token") } }
      );

      setJobStatus(data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkJobStatus();
  });
  useEffect(() => {
    props.setInJob(true);
  }, []);

  const completeJob = async () => {
    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/api/v1/technicians/jobState/${jobId}`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      );

      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <Spinner spinnerColor="#388DA8" loading={isLoading} spinnerSize={80} />
      </div>
      <section className="container mx-auto w-4/5 flex justify-center">
        <div className="w-full">
          <p className="text-center mt-10 nunito-bold text-lg">{jobStatus}</p>
          <div
            className={`w-full h-2 bg-slate-400 mt-5 rounded-2xl relative
          before:absolute before:top-0 before:left-0 before:bottom-0 ${barProgress}
          before:bg-sec before:rounded-2xl before:duration-300`}
          ></div>
          {jobStatus !== "completed" && (
            <p className="text-center mt-5 nunito-regular text-gray-500">
              You don&lsquo;t have access to the platform until you take action
              to the customer
            </p>
          )}

          {jobStatus === "pending confirmation" ? (
            <JobConfirm setBarProgress={setBarProgress} />
          ) : jobStatus === "completed" ? (
            <JobCompleted
              setBarProgress={setBarProgress}
              setInJob={props.setInJob}
            />
          ) : (
            <div className="job-decision bg-neutral-200 rounded-md w-1/3 mx-auto mt-10 text-center p-5">
              <p className="mb-2">Please proceed to the customer...</p>
              <p>Click next, If you finished your job</p>
              <div className="contact flex justify-center mt-8 text-black">
                <button className="register-inputs bg-white w-36 mr-3 hover:bg-heading-color hover:text-white duration-150">
                  Call Customer
                </button>
                <button className="register-inputs bg-white w-36 hover:bg-heading-color hover:text-white duration-150">
                  Send message
                </button>
              </div>
              <div className="proceed mt-10 text-white">
                <button
                  className="register-inputs bg-sec w-28 mr-3 hover:bg-sec-active duration-150"
                  onClick={completeJob}
                >
                  Next
                </button>
                <button className="register-inputs bg-sec w-28 hover:bg-sec-active duration-150">
                  Leave job
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
