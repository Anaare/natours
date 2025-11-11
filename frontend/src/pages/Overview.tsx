import { useFetchTours } from "../hooks/useFetchTours";
import Card from "../components/overview-components/Card";

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
