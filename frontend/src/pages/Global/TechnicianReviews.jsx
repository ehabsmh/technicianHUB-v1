import { useContext, useEffect, useState } from "react";
import TechnicianContext from "../../components/Global/Store";
import axios from "axios";
import Spinner from "../../components/Spinner";

export default function TechnicianReviews() {
  const technician = useContext(TechnicianContext);
  const [reviews, setReviews] = useState([]);

  const getTechnicianReviews = async () => {
    if (!technician || !technician._id) {
      return;
    }

    const options = {
      headers: { token: localStorage.getItem("token") },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/users/technicians/${technician._id}/reviews`,
        options
      );
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTechnicianReviews();
  }, [technician]);

  if (!technician || !technician._id) {
    return (
      <Spinner
        spinnerColor="#388da8"
        spinnerSize="30px"
        spinnerClassName="register-spinner"
      />
    );
  }

  return (
    <>
      <p>Reviewsss</p>
      {reviews.map((review, index) => (
        <div key={index}>
          <p>{review.content}</p>
        </div>
      ))}
    </>
  );
}
