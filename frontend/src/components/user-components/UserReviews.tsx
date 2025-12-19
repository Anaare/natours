import { useFetchTours } from "../../hooks/useFetchTours";
import { useFetchUserReviews } from "../../hooks/useFetchUserReviews";
import CardReview from "../overview-components/CardReview";

const UserReviews = () => {
  const { reviews, loading } = useFetchUserReviews();
  const { tours } = useFetchTours();

  if (loading)
    return (
      <main className="main">
        <h2 className="heading-secondary">Loading your adventures...</h2>
      </main>
    );

  if (!reviews || reviews.length === 0) {
    return (
      <main className="main main--error">
        <div className="error">
          <div className="error__title">
            <h2 className="heading-secondary heading-secondary--error">
              No reviews found
            </h2>
            <span className="error__emoji">🏔️</span>
          </div>
          <p className="error__msg">You don't have any reviews just yet!</p>
        </div>
      </main>
    );
  }

  if (!tours) return null;
  const tourMap = new Map(tours.map((tour) => [tour._id, tour]));

  return (
    <main className="main">
      <div className="card-container">
        {reviews.map((review) => {
          const tour = tourMap.get(review.tour);
          if (!tour) return null;

          return (
            <div key={review._id} className="review-card-wrapper">
              <CardReview tour={tour} />
              <div className="review-content">
                <div className="reviews__rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`reviews__star reviews__star--${
                        review.rating >= star ? "active" : "inactive"
                      }`}
                    >
                      <use xlinkHref="/img/icons.svg#icon-star" />
                    </svg>
                  ))}
                </div>
                <p className="review-content__text">{review.review}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default UserReviews;
