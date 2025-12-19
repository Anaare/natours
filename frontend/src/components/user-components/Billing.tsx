import { Link } from "react-router";
import { useFetchBookings } from "../../hooks/useFetchBookings"; // Assuming you have this

const Billing = () => {
  const { bookings, loading } = useFetchBookings();

  if (loading)
    return <h2 className="heading-secondary">Loading transactions...</h2>;

  if (!bookings || bookings.length === 0) {
    return (
      <main className="main main--error">
        <div className="error">
          <div className="error__title">
            <h2 className="heading-secondary heading-secondary--error">
              No data found
            </h2>
            <span className="error__emoji">🏔️</span>
          </div>
          <p className="error__msg">
            You don't have any payments just yet!
            <br /> Please, follow the link to book a tour.
            <br /> Billing info about the bought tour will appear here!
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

  // Calculate total spent
  const totalSpent = bookings.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="user-view__content">
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Billing History</h2>

        <div className="billing-summary">
          <p className="billing-summary__label">Total Lifetime Spend</p>
          <p className="billing-summary__value">
            ${totalSpent.toLocaleString()}
          </p>
        </div>

        <table className="billing-table">
          <thead>
            <tr>
              <th>Tour</th>
              <th>Date Paid</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="billing-table__tour-name">
                  {booking.tour.name}
                </td>
                <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                <td className="billing-table__price">${booking.price}</td>
                <td>
                  <span className="billing-table__status">Paid</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;
