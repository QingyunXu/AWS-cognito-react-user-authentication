import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Validate from "./Validate";
import ErrorMsg from "./ErrorsMsg";

class ChangePassword extends Component {
  state = {
    oldPassword: "",
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

  changePasswordSubmit = async (event) => {
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
    // AWS cognito integration};
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        user,
        this.state.oldPassword,
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
        <h1>Change password</h1>
        <ErrorMsg errors={this.state.errors} />
        <form onSubmit={this.changePasswordSubmit}>
          <div>
            <input
              type="password"
              id="oldPassword"
              placeholder="Old password"
              value={this.state.ondpassword}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="newPassword"
              placeholder="New password"
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

export default ChangePassword;
