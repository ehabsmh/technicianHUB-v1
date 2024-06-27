import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const confirmUserEmail = async () => {
    const confirmationToken = localStorage.getItem("confirmEmailToken");
    try {
      if (confirmationToken) {
        await axios.get(
          `http://localhost:3000/api/v1/auth/confirmEmail/?token=${confirmationToken}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      await confirmUserEmail();
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      localStorage.removeItem("confirmEmailToken");
    })();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="text-8xl text-green-500 mb-5"
      />
      <h1 className="text-3xl nunito-bold text-center">Email confirmed</h1>
      <p className="text-center nunito-regular">
        Your email has been confirmed, you can now login
      </p>
    </div>
  );
}
