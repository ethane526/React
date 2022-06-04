import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark bg-gradient"
        aria-label="Fourth navbar example"
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="https://pw.sabio.la/images/Sabio.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Sabio"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/" className="nav-link px-2 text-white link-button">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/friends"
                  className="nav-link px-2 text-white link-button"
                >
                  Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/jobs"
                  className="nav-link px-2 text-white link-button"
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/companies"
                  className="nav-link px-2 text-white link-button"
                >
                  Tech Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/events"
                  className="nav-link px-2 text-white link-button"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="test"
                  className="nav-link px-2 text-white link-button"
                >
                  Test and Ajax Call
                </Link>
              </li>
            </ul>
            <div className="text-end d-inline-flex bd-highlight">
              <div
                className="collapse navbar-collapse me-2"
                id="navbarNavDarkDropdown"
              >
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle text-warning"
                      href="/"
                      id="navbarDarkDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {props.user.firstName} {props.user.lastName}
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                      <li>
                        <a className="dropdown-item" href="/">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <Link
                to="/login"
                type="button"
                className="btn btn-outline-light me-2"
              >
                Login
              </Link>
              <Link to="/register" type="button" className="btn btn-warning">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
