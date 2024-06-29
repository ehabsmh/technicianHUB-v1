import { useContext } from "react";
import TechnicianContext from "../../components/Global/Store";
import Spinner from "../../components/Spinner";

export default function TechnicianBio() {
  const technician = useContext(TechnicianContext);

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
