// I'm gonna have to fetch data for the cards from API

import Card from "../components/overview-components/Card";
import { useFetchTours } from "../hooks/useFetchTours";

const Overview = () => {
  const { tours } = useFetchTours();

  console.log(tours);

  return (
    <main className="main">
      <div className="card-container">
        {tours.map((tour) => (
          <Card key={tour.id} tour={tour} />
        ))}
      </div>
    </main>
  );
};

export default Overview;
