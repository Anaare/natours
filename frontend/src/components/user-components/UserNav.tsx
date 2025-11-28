import { NavLink } from "react-router";

// Admin Nav Will be rendered here conditionally

const UserNav = () => {
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
            to="/"
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
      <div className="admin-nav">
        <h5 className="admin-nav__heading">Admin</h5>
        <ul className="side-nav">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "side-nav--active" : "")}
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
              className={({ isActive }) => (isActive ? "side-nav--active" : "")}
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
                <use xlinkHref="img/icons.svg#icon-credit-briefcase"></use>
              </svg>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNav;
