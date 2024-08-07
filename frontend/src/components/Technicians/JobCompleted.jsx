/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function JobCompleted({ setBarProgress, setInJob }) {
  const navigate = useNavigate();

  useEffect(() => {
    setBarProgress("before:right-0");
  });

  useEffect(() => {
    localStorage.removeItem("jobId");
    setInJob(false);
    return navigate("/tech");
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-10 mx-auto">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-green-500 text-6xl mr-10"
        />
        <div className="">
          <p className="w-8/12 mb-5 nunito-medium">Congratulations!</p>
          <p className="nunito-medium text-gray-400">
            Job completed successfully.
          </p>
        </div>
      </div>
    </>
  );
}
