import { useFetchSingleTour } from "../../hooks/useFetchSingleTour";
import PicturesCard from "./PicturesCard";

const Pictures = () => {
  const { tour } = useFetchSingleTour();

  if (!tour) return;
  return (
    <section className="section-pictures">
      {tour.images.map((image: string, i: number) => (
        <PicturesCard
          key={i}
          src={image}
          name={tour.name}
          className={`picture-box__img picture-box__img--${i + 1}`}
        />
      ))}
    </section>
  );
};

export default Pictures;
