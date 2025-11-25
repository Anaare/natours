interface reviewsProps {
  key?: string;
  userPhoto: string;
  userName: string;
  rating: number;
  userReview: string;
}

const ReviewCard = ({
  userPhoto,
  userName,
  rating,
  userReview,
}: reviewsProps) => {
  console.log(rating);

  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img src={userPhoto} alt={userName} className="reviews__avatar-img" />
        <h6 className="reviews__user">{userName}</h6>
      </div>
      <p className="reviews__text">{userReview}</p>
      <div className="reviews__rating">
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
        <svg className="reviews__star reviews__star--active">
          <use href="img/icons.svg#icon-star"></use>
        </svg>
      </div>
    </div>
  );
};

export default ReviewCard;
