import React, { Component } from "react";
class SuccessLogin extends Component {
  render() {
    return (
      <div>
        <div>Login Successful</div>
        <div>
          <a href="/changepassword">Change password</a>
        </div>
        <div>User name: {this.props.auth.user.username}</div>
        <div>Email: {this.props.auth.user.attributes.email}</div>
        <div>Family name: {this.props.auth.user.attributes.family_name}</div>
        <div>Given name: {this.props.auth.user.attributes.given_name}</div>
        <div>Phone number: {this.props.auth.user.attributes.phone_number}</div>
      </div>
    );
  }
}

export default SuccessLogin;
