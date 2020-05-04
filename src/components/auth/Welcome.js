import React, { Component } from "react";

class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>You have registered a new account</p>
        <p>
          We've sent you a email, please click on the confirmation link to
          verify your account.
        </p>
      </div>
    );
  }
}

export default Welcome;
