/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import TechnicianContext from "../Global/Store";
import axios from "axios";
import Spinner from "../Spinner";
import AuthContext from "../Global/AuthContext";

export default function HireTechnician(props) {
  const technician = useContext(TechnicianContext);
  const [jobRequest, setJobRequest] = useState({ requestTo: technician._id });
  const [isLoading, setIsLoading] = useState(false);
  const { refreshToken } = useContext(AuthContext);
  const sendJobRequest = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const oldToken = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:3000/api/v1/users/jobRequests",
        jobRequest,
        { headers: { token: oldToken } }
      );

      refreshToken(oldToken);
      setIsLoading(false);
      props.setHire(false);
      props.setHired(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="layer absolute top-0 w-full h-full bg-sec flex justify-center
     z-10 rounded-md duration-300"
    >
      <FontAwesomeIcon
        icon={faClose}
        className="absolute right-0 top-0 text-3xl p-3 cursor-pointer hover:text-zinc-700 duration-150"
        onClick={(e) => {
          e.target.closest(".layer").classList.remove("z-10");
          e.target.closest(".layer").classList.add("-z-20");
          props.setHire(false);
        }}
      />
      <form
        action=""
        className="mt-14"
        onSubmit={sendJobRequest}
        onChange={(e) => {
          jobRequest[e.target.name] = e.target.value;
          console.log(jobRequest);
        }}
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="register-inputs"
        />
        <textarea
          type="text"
          placeholder="Please enter a detailed description of the job you want to be done."
          name="description"
          rows={5}
          cols={50}
          className="register-inputs min-h-48"
        />
        {isLoading ? (
          <button
            type="submit"
            className="register-buttons bg-black hover:bg-gray-900"
          >
            <Spinner
              spinnerColor="#388da8"
              spinnerSize="20px"
              spinnerClassName="register-spinner"
            />
          </button>
        ) : (
          <button
            type="submit"
            className="register-buttons bg-black hover:bg-gray-900"
          >
            Send Request
          </button>
        )}
      </form>
    </div>
  );
}
