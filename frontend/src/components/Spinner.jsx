import { PuffLoader } from "react-spinners";
import "../styles/spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <PuffLoader
        size={80}
        color="#123abc"
        loading={true}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
