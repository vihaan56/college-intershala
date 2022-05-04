import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg  shadow navbar-light bg-white">
        <div className="container-fluid">
          <a className="navbar-brand" href="#!">
            College Internships
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/">
                  Home
                </NavLink>
                {/* <a className="nav-link active" aria-current="page" href="/">Home</a> */}
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/contactus">
                  Contact us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/aboutus">
                  About us
                </NavLink>
              </li>

              {localStorage.getItem("token") != null ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      exact="true"
                      to="/user/profile"
                    >
                      Profile{" "}
                    </NavLink>
                  
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout">
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      className="btn btn-primary register-button"
                      href="/register"
                      role="button"
                    >
                      Register
                    </a>

                    <a
                      className="btn btn-primary register-button mx-2"
                      href="/login"
                      role="button"
                    >
                      Login
                    </a>
                  </li>
                </>
              )}

              {sessionStorage.getItem("userstatus") != null &&
              localStorage.getItem("token") != null &&
              sessionStorage.getItem("userstatus") === "admin" ? (
                <li className="nav-item">
                  <a
                    className="btn btn-primary register-button "
                    href="/secure/adminpanel/iBgQM6tj55arHpfazcD9"
                    role="button"
                  >
                    Admin Panel
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
