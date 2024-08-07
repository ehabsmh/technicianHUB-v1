/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import TechnicianContext from "../../components/Global/Store";
import axios from "axios";
import Spinner from "../../components/Spinner";
import Review from "../../components/Global/Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "react-rating";
import { faPlusCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../components/Global/AuthContext";

export default function TechnicianReviews() {
  const technician = useContext(TechnicianContext);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(1);
  const reviewForm = useRef(null);
  const { loggedUser } = useContext(AuthContext);

  const getTechnicianReviews = async () => {
    if (loggedUser.role === "user" && (!technician || !technician._id)) {
      return;
    }

    const options = {
      headers: { token: localStorage.getItem("token") },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/users/technicians/${
          loggedUser.role === "user" ? technician._id : loggedUser._id
        }/reviews`,
        options
      );
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const options = {
      headers: { token: localStorage.getItem("token") },
      data: {
        technicianId: technician._id,
        content: review,
        rate,
      },
    };
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/users/createReview`,
        options.data,
        { headers: options.headers }
      );
      setReviews([...reviews, data.review]);
      setReview("");
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserReview = () => {
    if (!loggedUser || !loggedUser._id) {
      return;
    }

    return reviews.find((review) => review.reviewedBy._id === loggedUser._id);
  };

  useEffect(() => {
    getTechnicianReviews();
  }, [technician, review]);

  if (loggedUser.role === "user" && (!technician || !technician._id)) {
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
      {checkUserReview() ? (
        ""
      ) : loggedUser?.role === "user" ? (
        <div className="add-review relative w-32 mb-10 flex items-center">
          {loggedUser.picture ? (
            <img
              src={loggedUser.picture}
              alt={`${loggedUser.firstName} photo`}
            />
          ) : (
            <img src="/assets/images/default.jpg" alt="No photo" />
          )}
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="text-3xl absolute bottom-1 right-0 bg-white rounded-full cursor-pointer"
            onClick={() => {
              reviewForm.current?.classList.toggle("opacity-0");
              reviewForm.current?.classList.toggle("invisible");
            }}
          />
          <form
            className="opacity-0 invisible duration-300"
            ref={reviewForm}
            onSubmit={submitReview}
          >
            <Rating
              className="ml-10"
              stop={5}
              initialRating={rate}
              onClick={(rate) => setRate(rate)}
              emptySymbol={<FontAwesomeIcon icon={faStar} />}
              fullSymbol={
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              }
            />
            <textarea
              type="text"
              placeholder="Your review here"
              className="review-input ml-10 p-5 bg-slate-300 w-96 focus-within:outline-none"
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              type="submit"
              className="ml-10 bg-sec register px-3 py-2 rounded-md text-white"
            >
              Review
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
      {!reviews.length ? (
        <p className="nunito-bold text-gray-400">No Reviews found.</p>
      ) : (
        reviews.map((review, i) => (
          <Review key={i} review={review} userId={loggedUser._id} />
        ))
      )}
    </>
  );
}
