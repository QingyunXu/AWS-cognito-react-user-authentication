import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Validate from "./Validate";
import ErrorsMsg from "./ErrorsMsg";

class ForgetPassword extends Component {
  state = {
    email: "",
    errors: {
      cognito: null,
      blankfield: false,
    },
  };

  clearStateError = () => {
    this.setState({
      errors: {
        cognito: null,
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

  forgetPasswordSubmit = async (event) => {
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
    await Auth.forgotPassword(this.state.email)
      .then(this.props.history.push("/forgetpasswordverification"))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <h1>Forget your password?</h1>
        <div>
          Enter the email address associated with your account and we'll send
          you a verification code to reset password.
        </div>
        <ErrorsMsg errors={this.state.errors} />
        <form onSubmit={this.forgetPasswordSubmit}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={this.state.email}
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

export default ForgetPassword;
