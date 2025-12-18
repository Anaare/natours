import Error from "../Error";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useFetchSingleTour } from "../../hooks/useFetchSingleTour";
// import { getStripe } from "../../utils/stripe";

const Cta = () => {
  const { tour, loading, error } = useFetchSingleTour();
  const { user } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (error) return <Error errorMsg="There is no tour with that name." />;
  if (!tour) return <p>No tour found</p>;

  const handleBooking = async () => {
    try {
      if (user) {
        // 1. Get checkout session from backend
        const session = await axios(
          `${import.meta.env.VITE_API_URL}/api/v1/bookings/checkout-session/${
            tour._id
          }`,
          { withCredentials: true }
        );

        // 2. Checkout form + charge credit card
        window.location.href = session.data.session.url;

        if (error) {
          toast.error("Payment failed to initialize.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong with the booking.");
    }
  };

  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src="/img/logo-white.png" alt="Natours logo" className="" />
        </div>
        <img
          src={`/img/tours/${tour.images[0]}`}
          alt=""
          className="cta__img cta__img--1"
        />
        <img
          src={`/img/tours/${tour.images[1]}`}
          alt=""
          className="cta__img cta__img--2"
        />

        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">
            {tour.duration} days. 1 adventure. Infinite memories. Make it yours
            today!
          </p>
          <div className="span-all-rows">
            {!user ? (
              <Link className="btn btn--green" to="/login">
                Log in to book a tour
              </Link>
            ) : (
              <button className="btn btn--green" onClick={handleBooking}>
                {loading ? "Processing..." : "Book tour now!"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
