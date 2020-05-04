import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Validate from "./Validate";
import ErrorsMsg from "./ErrorsMsg";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankField: false,
    },
  };

  clearStateError = () => {
    this.setState({
      errors: {
        cognito: null,
        blankField: false,
      },
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove("w3-pale-red");
  };

  loginSubmit = async (event) => {
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
    await Auth.signIn(this.state.username, this.state.password)
      .then((user) => {
        this.props.auth.setAuthStatus(true);
        this.props.auth.setUser(user);
        this.props.history.push("/successLogin");
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
        <h1>Login page</h1>
        <ErrorsMsg errors={this.state.errors} />
        <form onSubmit={this.loginSubmit}>
          <div>
            <input
              type="test"
              placeholder="Enter username or email"
              id="username"
              value={this.state.username}
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
            <a href="./forgetpassword">Forget password</a>
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
