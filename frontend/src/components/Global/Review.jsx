/* eslint-disable react/prop-types */
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";
import Rating from "react-rating";

export default function Review(props) {
  const { review, userId } = props;
  const { reviewedBy } = review;

  return (
    <>
      <div className="flex items-center">
        {reviewedBy.picture ? (
          <img
            src={reviewedBy.picture}
            alt={`${reviewedBy.firstName} picture`}
            className="w-32"
          />
        ) : (
          <img src="/assets/images/default.jpg" alt="" className="w-32" />
        )}

        <div>
          <Rating
            initialRating={review.rate}
            readonly
            emptySymbol={<FontAwesomeIcon icon={faStar} />}
            fullSymbol={
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            }
          />

          <h3 className="reviewed-by nunito-bold">
            {userId === reviewedBy._id
              ? "Me"
              : `${reviewedBy.firstName} ${reviewedBy.lastName}`}
          </h3>
          <p className="review text-gray-800 roboto-light">{review.content}</p>
          <p className="text-sec-active roboto-regular-italic text-sm">
            {formatDistanceToNow(new Date(review.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </>
  );
}
