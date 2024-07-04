/* eslint-disable react/prop-types */
import { PuffLoader } from "react-spinners";
import "../styles/spinner.css";

export default function Spinner(props) {
  const { spinnerClassName, spinnerSize, spinnerColor, loading } = props;
  return (
    <div className={spinnerClassName}>
      <PuffLoader
        size={spinnerSize}
        color={spinnerColor}
        loading={loading}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
