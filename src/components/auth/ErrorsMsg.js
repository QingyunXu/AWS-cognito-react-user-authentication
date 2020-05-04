import React from "react";

const ErrorsMsg = (props) => {
  let msg = null;
  const error = props.errors;
  if (error && (error.blankField || error.passwordNotMatch)) {
    msg = (
      <div className="w3-red">
        {error.blankField ? "All fields are required" : ""}
        {error.passwordNotMatch ? "Password does not match" : ""}
      </div>
    );
  } else if (error.cognito) {
    msg = <div className="w3-red">{error.cognito.message}</div>;
  } else {
    msg = <div />;
  }
  return msg;
};

export default ErrorsMsg;
