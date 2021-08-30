import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class NavBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="ms-3 navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          meVidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" aria-current="page" to="/movies">
              Movies
            </NavLink>

            <NavLink className="nav-link nav-item" to="/customers">
              Customers
            </NavLink>

            <NavLink className="nav-link nav-item" to="/rental">
              Rental
            </NavLink>
            {user && (
              <React.Fragment>
                <NavLink className="nav-link nav-item" to="/userlogedIn">
                  {user.name}
                </NavLink>

                <NavLink className="nav-link nav-item" to="/logout">
                  LogOut
                </NavLink>
              </React.Fragment>
            )}
             {!user && (
              <React.Fragment>
                <NavLink className="nav-link nav-item" to="/login">
                  Login
                </NavLink>

                <NavLink className="nav-link nav-item" to="/register">
                  Registe
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
