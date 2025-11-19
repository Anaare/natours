import Cta from "../components/tour-components/Cta";
import Description from "../components/tour-components/Description";
import SectionHeader from "../components/tour-components/Header";
import { useFetchSingleTour } from "../hooks/useFetchSingleTour";

import Pictures from "../components/tour-components/Pictures";
import Reviews from "../components/tour-components/Reviews";

const Tour = () => {
  const { tour, loading, error } = useFetchSingleTour();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!tour) return <p>No tour found</p>;

  return (
    <>
      <SectionHeader tourData={tour} />
      <Description />
      <Pictures />
      <Reviews />
      <Cta />
    </>
  );
};

export default Tour;
