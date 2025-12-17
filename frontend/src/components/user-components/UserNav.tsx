import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";

// Admin Nav Will be rendered here conditionally

const UserNav = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">
          Loading account settings...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md text-red-600">
          Error loading data: {error}
        </h2>
      </div>
    );
  }

  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "side-nav--active" : "")}
          >
            <svg className="card__icon">
              <use xlinkHref="img/icons.svg#icon-settings"></use>
            </svg>
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/myTours"
            className={({ isActive }) => (isActive ? "side-nav--active" : "")}
          >
            <svg className="card__icon">
              <use xlinkHref="img/icons.svg#icon-briefcase"></use>
            </svg>
            My bookings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "side-nav--active" : "")}
          >
            <svg className="card__icon">
              <use xlinkHref="img/icons.svg#icon-star"></use>
            </svg>
            My reviews
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "side-nav--active" : "")}
          >
            <svg className="card__icon">
              <use xlinkHref="img/icons.svg#icon-credit-card"></use>
            </svg>
            Billing
          </NavLink>
        </li>
      </ul>
      {/* ADMIN */}
      {user?.role === "admin" && (
        <div className="admin-nav">
          <h5 className="admin-nav__heading">Admin</h5>
          <ul className="side-nav">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "side-nav--active" : ""
                }
              >
                <svg className="card__icon">
                  <use xlinkHref="img/icons.svg#icon-map"></use>
                </svg>
                Manage tours
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "side-nav--active" : ""
                }
              >
                <svg className="card__icon">
                  <use xlinkHref="img/icons.svg#icon-users"></use>
                </svg>
                Manage users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "side-nav--active" : ""
                }
              >
                <svg className="card__icon">
                  <use xlinkHref="img/icons.svg#icon-star"></use>
                </svg>
                My reviews
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "side-nav--active" : ""
                }
              >
                <svg className="card__icon">
                  <use xlinkHref="img/icons.svg#icon-credit-briefcase"></use>
                </svg>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default UserNav;
