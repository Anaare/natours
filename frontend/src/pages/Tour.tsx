import Cta from "../components/tour-components/Cta";
import Description from "../components/tour-components/Description";
import SectionHeader from "../components/tour-components/Header";
import Pictures from "../components/tour-components/Pictures";
import Reviews from "../components/tour-components/Reviews";

const Tour = () => {
  return (
    <>
      <SectionHeader name="Forest Hiker" days={10} location="Las Vegas, USA" />
      <Description />
      <Pictures />
      <Reviews />
      <Cta />
    </>
  );
};

export default Tour;
