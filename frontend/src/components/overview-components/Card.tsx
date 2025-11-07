// import { Link } from "react-router";
import type { Tour } from "../../types/index";

interface CardProps {
  tour: Tour;
}

const Card = ({ tour }: CardProps) => {
  return (
    // <div className="card">
    //   <div className="card__header">
    //     <div className="card__picture">
    //       <div className="card__picture-overlay">&nbsp;</div>
    //       <img src={src} alt={alt} className="card__picture-img" />
    //     </div>

    //     <h3 className="heading-tertirary">
    //       <span>{heading}</span>
    //     </h3>
    //   </div>

    //   <div className="card__details">
    //     <h4 className="card__sub-heading">{subheading}</h4>
    //     <p className="card__text">{description}</p>
    //     <div className="card__data">
    //       <svg className="card__icon">
    //         <use xlinkHref="img/icons.svg#icon-map-pin"></use>
    //       </svg>
    //       <span>{location}</span>
    //     </div>
    //     <div className="card__data">
    //       <svg className="card__icon">
    //         <use xlinkHref="img/icons.svg#icon-calendar"></use>
    //       </svg>
    //       <span>{date}</span>
    //     </div>
    //     <div className="card__data">
    //       <svg className="card__icon">
    //         <use xlinkHref="img/icons.svg#icon-flag"></use>
    //       </svg>
    //       <span>{stops} stops</span>
    //     </div>
    //     <div className="card__data">
    //       <svg className="card__icon">
    //         <use xlinkHref="img/icons.svg#icon-user"></use>
    //       </svg>
    //       <span>{people} people</span>
    //     </div>
    //   </div>

    //   <div className="card__footer">
    //     <p>
    //       <span className="card__footer-value">${price}</span>
    //       <span className="card__footer-text">per person</span>
    //     </p>
    //     <p className="card__ratings">
    //       <span className="card__footer-value">{rating}</span>
    //       <span className="card__footer-text">rating ({ratingsTotal})</span>
    //     </p>
    //     <Link to="tours/:tourSlug" className="btn btn--green btn--small">
    //       Details
    //     </Link>
    //   </div>
    // </div>
    <div>{tour.name}</div>
  );
};

export default Card;
