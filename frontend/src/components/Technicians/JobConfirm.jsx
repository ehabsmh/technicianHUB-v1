/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function JobConfirm({ setJobState, setBarProgress }) {
  useEffect(() => {
    setJobState("You're on the half way!");
    setBarProgress("before:right-1/2");
  });

  return (
    <>
      <div className="flex justify-center items-center mt-10 mx-auto">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-green-500 text-6xl mr-10"
        />
        <div className="">
          <p className="w-8/12 mb-5 nunito-medium">
            Job completed, The platform will open again when the customer mark
            job as completed.
          </p>
          <p className="nunito-medium text-gray-400">
            Thanks for your patience.
          </p>
        </div>
      </div>
    </>
  );
}
