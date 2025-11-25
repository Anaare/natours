import { useFetchReviews } from "../../hooks/useFetchReviews";
import ReviewCard from "./ReviewCard";
import type { Review } from "../../types/index";

const Reviews = () => {
  const { reviews } = useFetchReviews() as { reviews: Review[] };
  console.log(reviews);

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
