import React from "react";
import { NavLink } from "react-router-dom";

function adminNavbar() {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
          <NavLink className="nav-link" exact="true" to="/secure/adminpanel/iBgQM6tj55arHpfazcD9">
               Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact="true" to="/secure/createpost">
              create post for Intern
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact="true" to="/secure/listcompanies">
               Listed Companies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact="true" to="/secure/studentinfo">
              Student info
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" exact="true" to="/secure/studentapplication">
          Student applications
            </NavLink>

            
          </li>
        </ul>

        {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <a className="link-secondary" href="#!" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Current month
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Last quarter
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Social engagement
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Year-end sale
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}

export default adminNavbar;
