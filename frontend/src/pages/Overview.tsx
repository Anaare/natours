import { useFetchTours } from "../hooks/useFetchTours";
import Card from "../components/overview-components/Card";

const Overview = () => {
  const { tours } = useFetchTours();

  return (
    <>
      <title>Natours | Exciting tours for adventurous people</title>
      <meta
        name="description"
        content="This is the overview page of my application."
      />
      <main className="main">
        <div className="card-container">
          {tours.map((tour) => (
            <Card key={tour.id} tour={tour} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Overview;
