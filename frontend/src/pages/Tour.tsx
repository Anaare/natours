import { useEffect } from "react";
// import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Cta from "../components/tour-components/Cta";
import Description from "../components/tour-components/Description";
import SectionHeader from "../components/tour-components/Header";
import { useFetchSingleTour } from "../hooks/useFetchSingleTour";
import Pictures from "../components/tour-components/Pictures";
import Reviews from "../components/tour-components/Reviews";
import Map from "../components/tour-components/Map";

const Tour = () => {
  const { tour, loading, error } = useFetchSingleTour();

  useEffect(() => {
    if (tour) {
      document.title = `${tour.name} | Tour Details`;
    }
  }, [tour]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!tour) return <p>No tour found</p>;

  return (
    <>
      <meta
        name="description"
        content={`Book your trip to ${tour.startLocation}. Price: ${tour.price}`}
      />
      <SectionHeader tourData={tour} />
      <Description />
      <Pictures />

      <Map />

      <Reviews />
      <Cta />
    </>
  );
};

export default Tour;
