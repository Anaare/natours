import { useFetchReviews } from "../../hooks/useFetchReviews";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const { reviews, loading, error } = useFetchReviews();

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p className="error">Error loading reviews: {error}</p>;
  }

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="section-reviews">
      <div className="reviews">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            userPhoto={`/img/users/${review.user.photo}`}
            userName={review.user.name}
            rating={review.rating}
            userReview={review.review}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
