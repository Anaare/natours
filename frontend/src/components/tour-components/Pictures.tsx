import { useFetchSingleTour } from "../../hooks/useFetchSingleTour";
import PicturesCard from "./PicturesCard";

const Pictures = () => {
  const { tour } = useFetchSingleTour();

  if (!tour) return;
  return (
    <section className="section-pictures">
      {tour.images.map((image, i) => (
        <PicturesCard
          key={i}
          src={image}
          name={tour.name}
          className={`picture-box__img picture-box__img--${i + 1}`}
        />
      ))}

      {/* <div className="picture-box">
        <img
          className="picture-box__img picture-box__img--2"
          src="img/tour-5-2.jpg"
          alt="The Park Camper Tour 1"
        />
      </div>
      <div className="picture-box">
        <img
          className="picture-box__img picture-box__img--3"
          src="img/tour-5-3.jpg"
          alt="The Park Camper Tour 1"
        />
      </div> */}
    </section>
  );
};

export default Pictures;
