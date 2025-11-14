import { useFetchReviews } from "../../hooks/useFetchReviews";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const { reviews } = useFetchReviews();
  console.log(reviews);

  return (
    <section className="section-reviews">
      <div className="reviews">
        <ReviewCard reviews={reviews} />
      </div>
    </section>
  );
};

export default Reviews;
