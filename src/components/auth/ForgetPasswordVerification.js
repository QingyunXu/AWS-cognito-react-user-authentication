import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Validate from "./Validate";
import ErrorMsg from "./ErrorsMsg";

class ForgetPasswordVerification extends Component {
  state = {
    verificationCode: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    errors: {
      cognito: null,
      passwordNotMatch: false,
      blankfield: false,
    },
  };

  clearStateError = () => {
    this.setState({
      errors: {
        cognito: null,
        passwordNotMatch: false,
        blankfield: false,
      },
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove("w3-pale-red");
  };

  passwordSubmit = async (event) => {
    event.preventDefault();
    // clear state errors
    this.clearStateError();
    // form validation
    const formError = Validate(this.state);
    if (formError) {
      this.setState({
        errors: { ...this.state.errors, ...formError },
      });
    }
    // AWS cognito integration
    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.verificationCode,
        this.state.newPassword
      );
      this.props.history.push("/changepasswordconfirmation");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Set new password</h1>
        <ErrorMsg errors={this.state.errors} />
        <form onSubmit={this.passwordSubmit}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="text"
              id="verificationCode"
              placeholder="Enter verification code"
              value={this.state.verificationCode}
              onChange={this.onChange}
            />
          </div>

          <div>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={this.state.newPassword}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmNewPassword"
              placeholder="Confirm new password"
              value={this.state.confirmNewPassword}
              onChange={this.onChange}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
export default ForgetPasswordVerification;
