import { Link } from "react-router-dom";
import { useFetchBookings } from "../../hooks/useFetchBookings";
import { useFetchTours } from "../../hooks/useFetchTours";
import Card from "../overview-components/Card";

const BookedTours = () => {
  const { bookings, loading } = useFetchBookings();
  const { tours } = useFetchTours();

  // 1. Loading state to prevent "flashing" empty screen
  if (loading)
    return (
      <main className="main">
        <h2 className="heading-secondary">Loading your adventures...</h2>
      </main>
    );

  // 2. Empty State - Triggered if bookings is null or an empty array []
  if (!bookings || bookings.length === 0) {
    return (
      <main className="main main--error">
        <div className="error">
          <div className="error__title">
            <h2 className="heading-secondary heading-secondary--error">
              No tours found
            </h2>
            <span className="error__emoji">🏔️</span>
          </div>
          <p className="error__msg">
            You don't have any tours booked just yet! <br />
            Please, follow the link to book a tour.
          </p>
          <div style={{ marginTop: "3.5rem" }}>
            <Link to="/" className="btn btn--green btn--small">
              Find a Tour
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 3. Data exists - Mapping through tours
  if (!tours) return null;
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
