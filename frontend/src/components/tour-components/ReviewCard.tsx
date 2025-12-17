interface reviewsProps {
  key?: string;
  userPhoto: string;
  userName: string;
  rating: number;
  userReview: string;
}

const MAX_RATING = 5;
const STAR_ARRAY = Array.from({ length: MAX_RATING }, (_, i) => i + 1);

const ReviewCard = ({
  userPhoto,
  userName,
  rating,
  userReview,
}: reviewsProps) => {
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img src={userPhoto} alt={userName} className="reviews__avatar-img" />
        <h6 className="reviews__user">{userName}</h6>
      </div>
      <p className="reviews__text">{userReview}</p>
      <div className="reviews__rating">
        {/* 2. Map over the STAR_ARRAY to generate 5 SVG elements */}
        {STAR_ARRAY.map((starIndex) => {
          // Check if the current star index (1, 2, 3, 4, or 5) is less than
          // or equal to the actual rating (e.g., 4)
          const isActive = starIndex <= rating;

          const starClassName = isActive
            ? "reviews__star reviews__star--active"
            : "reviews__star reviews__star--inactive"; // Assuming 'reviews__star' is the gray/inactive class

          return (
            <svg key={starIndex} className={starClassName}>
              {/* Note: The href attribute needs a slash if it's relative to the domain root */}
              <use href="/img/icons.svg#icon-star"></use>
            </svg>
          );
        })}
      </div>
      {/* <div className="reviews__rating">
        {for (let i=rating; i<=0; i--){

        }}
        <svg className="reviews__star reviews__star--active">
          <use href="/img/icons.svg#icon-star"></use>
        </svg>
        <svg className="reviews__star reviews__star--active">
          <use href="img/icons.svg#icon-star"></use>
        </svg>
        <svg className="reviews__star reviews__star--active">
          <use href="img/icons.svg#icon-star"></use>
        </svg>
        <svg className="reviews__star reviews__star--active">
          <use href="img/icons.svg#icon-star"></use>
        </svg>
        <svg className="reviews__star reviews__star--active">
          <use href="img/icons.svg#icon-star"></use>
        </svg>
      </div> */}
    </div>
  );
};

export default ReviewCard;
