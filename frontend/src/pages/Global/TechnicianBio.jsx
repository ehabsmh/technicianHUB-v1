import { useContext } from "react";
import TechnicianContext from "../../components/Global/Store";
import Spinner from "../../components/Spinner";
import AuthContext from "../../components/Global/AuthContext";

export default function TechnicianBio() {
  const { loggedUser } = useContext(AuthContext);
  const technician = useContext(TechnicianContext);

  if (loggedUser && loggedUser.role === "technician") {
    if (!loggedUser) {
      return (
        <Spinner
          spinnerColor="#388da8"
          spinnerSize="30px"
          spinnerClassName="register-spinner"
        />
      );
    }
    return <p>{loggedUser.technicianDetails?.bio}</p>;
  }

  if (!technician || !technician._id) {
    return (
      <Spinner
        spinnerColor="#388da8"
        spinnerSize="30px"
        spinnerClassName="register-spinner"
      />
    );
  }
  return <p>{technician.bio}</p>;
}
