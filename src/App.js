import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Welcome from "./components/auth/Welcome";
import SuccessLogin from "./components/auth/SuccessLogin";
import ForgetPassword from "./components/auth/ForgetPassword";
import ChangePassword from "./components/auth/ChangePassword";
import ForgetPasswordVerification from "./components/auth/ForgetPasswordVerification";
import ChangePasswordConfirmation from "./components/auth/ChangePasswordConfirmation";

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
  };

  setAuthStatus = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = (user) => {
    this.setState({ user: user });
  };

  componentDidMount = async () => {
    try {
      await Auth.currentSession();
      this.setAuthStatus(true);
      await Auth.currentAuthenticatedUser().then((user) => this.setUser(user));
      // this.setUser(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  };

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <BrowserRouter>
            <div>
              <Navbar auth={authProps} />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => <Home {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/about"
                  render={(props) => <About {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/login"
                  render={(props) => <Login {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/register"
                  render={(props) => <Register {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/welcome"
                  render={(props) => <Welcome {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/successLogin"
                  render={(props) => (
                    <SuccessLogin {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/forgetpassword"
                  render={(props) => (
                    <ForgetPassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/forgetpasswordverification"
                  render={(props) => (
                    <ForgetPasswordVerification {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepasswordconfirmation"
                  render={(props) => (
                    <ChangePasswordConfirmation {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepassword"
                  render={(props) => (
                    <ChangePassword {...props} auth={authProps} />
                  )}
                />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      )
    );
  }
}

export default App;
