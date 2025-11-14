import type { Tour } from "../../types";

interface SectionHeaderProps {
  tourData: Tour;
}

const SectionHeader = ({ tourData }: SectionHeaderProps) => {
  return (
    <section className="section-header">
      <div className="header__hero">
        <div className="header__hero-overlay">&nbsp;</div>
        <img
          className="header__hero-img"
          src={`/img/tours/${tourData.imageCover}`}
          alt={tourData.name}
        />
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>{tourData.name}</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use href="/img/icons.svg#icon-clock"></use>
            </svg>
            <span className="heading-box__text">{tourData.duration} days</span>
          </div>
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use href="/img/icons.svg#icon-map-pin"></use>
            </svg>
            <span className="heading-box__text">
              {tourData.startLocation.description}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;
