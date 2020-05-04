import React, { Component } from "react";
import { Auth } from "aws-amplify";

class Navbar extends Component {
  logoutSubmit = async () => {
    await Auth.signOut()
      .then(() => {
        this.props.auth.setAuthStatus(false);
        this.props.auth.setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="w3-bar w3-black">
        <a href="/" className="w3-bar-item w3-button">
          Home
        </a>
        <a href="/about" className="w3-bar-item w3-button">
          About
        </a>
        {this.props.auth.isAuthenticated && this.props.auth.user && (
          <React.Fragment>
            <a
              href="/login"
              className="w3-bar-item w3-button w3-right"
              onClick={this.logoutSubmit}
            >
              Logout
            </a>
            <span className="w3-bar-item w3-right">
              Hello {this.props.auth.user.username}!
            </span>
          </React.Fragment>
        )}
        {!this.props.auth.isAuthenticated && (
          <React.Fragment>
            <a href="/register" className="w3-bar-item w3-button w3-right">
              Register
            </a>
            <a href="/login" className="w3-bar-item w3-button w3-right">
              Login
            </a>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Navbar;
