import { useContext, useRef, useState } from "react";
import AuthContext from "../../components/Global/AuthContext";
import "../../styles/register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Settings() {
  const { loggedUser, refreshToken } = useContext(AuthContext);
  const [updateInfo, setUpdateInfo] = useState(null);
  const updatedTechnician = {};
  const layer = useRef(null);
  const salaryInput = useRef(null);

  const collectUpdatedData = (e) => {
    updatedTechnician[e.target.name] = e.target.value;
  };

  const updateTechnician = async () => {
    try {
      const oldToken = localStorage.getItem("token");
      const { data } = await axios.put(
        "http://localhost:3000/api/v1/technicians/updateTechnician",
        updatedTechnician,
        { headers: { token: oldToken } }
      );
      refreshToken(oldToken);
      setUpdateInfo(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    layer.current.classList.add("opacity-0");
    layer.current.classList.add("-z-20");
  };

  const openModal = () => {
    layer.current.classList.remove("opacity-0");
    layer.current.classList.remove("-z-20");
  };

  return (
    <>
      <div
        className="layer absolute bg-slate-200 rounded-md top-0 bottom-0 left-0
       right-0 flex flex-col items-center p-5 opacity-0 -z-20 duration-300"
        ref={layer}
      >
        <textarea
          type="text"
          className="w-4/5 h-full mb-10 rounded-md focus-within:outline-0 p-3 nunito-medium"
          defaultValue={loggedUser.technicianDetails.bio}
          name="bio"
          onChange={collectUpdatedData}
        />
        <button
          type="submit"
          className="register-buttons text-white bg-sec w-4/5 hover:bg-sec-active"
          onClick={() => {
            updateTechnician();
            closeModal();
          }}
        >
          Update Bio
        </button>
        <FontAwesomeIcon
          icon={faClose}
          className="absolute top-2 right-2 text-sec text-2xl cursor-pointer"
          onClick={closeModal}
        />
      </div>
      {updateInfo && (
        <h3 className="nunito-medium text-green-600 mb-10">{updateInfo}</h3>
      )}

      <div className="flex w-1/4 justify-between items-center">
        <h3 className="nunito-bold">Change Bio</h3>
        <button
          className="bg-sec text-white p-2 rounded-md"
          onClick={openModal}
        >
          Edit
        </button>
      </div>
      <div className="mt-10">
        <label htmlFor="" className="mr-10 nunito-bold">
          Salary per hour
        </label>
        <input
          type="text"
          name="salary"
          placeholder="Salary per hour"
          className="register-inputs w-44 disabled:bg-gray-300"
          disabled
          defaultValue={loggedUser.technicianDetails.salary}
          ref={salaryInput}
          onChange={collectUpdatedData}
        />
        <button
          className="bg-sec text-white p-2 rounded-md"
          onClick={() => {
            if (salaryInput.current.disabled) {
              salaryInput.current.disabled = false;
              salaryInput.current.disabled = false;
            } else salaryInput.current.disabled = true;
          }}
        >
          Edit
        </button>
      </div>

      <button
        className="bg-sec text-white p-2 rounded-md mt-10 hover:bg-sec-active"
        onClick={updateTechnician}
      >
        Save Changes
      </button>
    </>
  );
}
