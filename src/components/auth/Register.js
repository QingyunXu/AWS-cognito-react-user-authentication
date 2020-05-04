import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Validate from "./Validate";
import ErrorsMsg from "./ErrorsMsg";

class Register extends Component {
  state = {
    username: "",
    email: "",
    family_name: "",
    given_name: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    errors: {
      cognito: null,
      blankField: false,
      passwordNotMatch: false,
    },
  };

  clearStateError = () => {
    this.setState({
      errors: {
        cognito: null,
        blankField: false,
        passwordNotMatch: false,
      },
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove("w3-pale-red");
  };

  registerSubmit = async (event) => {
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
    const {
      username,
      email,
      password,
      family_name,
      given_name,
      phone_number,
    } = this.state;

    await Auth.signUp({
      username,
      password,
      attributes: {
        email: email,
        phone_number: phone_number,
        family_name: family_name,
        given_name: given_name,
      },
    })
      .then(() => {
        this.props.history.push("/Welcome");
      })
      .catch((error) => {
        let err = null;
        !error.message ? (err = { message: error }) : (err = error);
        this.setState({
          errors: {
            ...this.state.errors,
            cognito: err,
          },
        });
      });
  };

  render() {
    return (
      <div>
        <h1>Register page</h1>
        <ErrorsMsg errors={this.state.errors} />
        <form onSubmit={this.registerSubmit}>
          <div>
            <input
              type="text"
              placeholder="Enter username"
              id="username"
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter email address"
              id="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter family name"
              id="family_name"
              value={this.state.family_name}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter given name"
              id="given_name"
              value={this.state.given_name}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter phone number"
              id="phone_number"
              value={this.state.phone_number}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              id="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.onChange}
            />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
