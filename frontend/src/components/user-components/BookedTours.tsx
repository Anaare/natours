import { useFetchBookings } from "../../hooks/useFetchBookings";
import { useFetchTours } from "../../hooks/useFetchTours";
import Card from "../overview-components/Card";

const BookedTours = () => {
  const { bookings } = useFetchBookings();
  const { tours } = useFetchTours();

  if (!bookings || !tours) return null;

  const tourMap = new Map(tours.map((tour) => [tour._id, tour]));

  return (
    <main className="main">
      <div className="card-container">
        {bookings.map((booking) => {
          const tour = tourMap.get(booking.tour._id);
          if (!tour) return null;

          return <Card key={booking._id} tour={tour} />;
        })}
      </div>
    </main>
  );
};

export default BookedTours;
