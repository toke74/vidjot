import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

export class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item dropdown">
          <Link
            to=""
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            id="navbarDropdownMenuLink"
          >
            Video Ideas
          </Link>
          <div className="dropdown-menu">
            <Link to="/ideas" className="dropdown-item">
              Ideas
            </Link>
            <Link to="/ideas/add" className="dropdown-item">
              Add Idea
            </Link>
          </div>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={this.onLogoutClick}>
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="/login">
            Login{" "}
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
      </ul>
    );
    return (
      <div>
        <nav className="navbar navbar-expand-lg  mb-3  p-4 navbar-light bg-info">
          <div className="container-fluid">
            <Link className="navbar-brand brand-text" to="/">
              VidJot
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
