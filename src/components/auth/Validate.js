const Validate = (state) => {
  // clear class alert
  const inputs = document.getElementsByClassName("w3-pale-red");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].classList.contains("w3-pale-red")) {
      inputs[i].classList.remove("w3-pale-red");
    }
  }
  // check all input
  if (state.hasOwnProperty("username") && state.username === "") {
    document.getElementById("username").classList.add("w3-pale-red");
    return { blankField: true };
  }
  if (state.hasOwnProperty("email") && state.email === "") {
    document.getElementById("email").classList.add("w3-pale-red");
    return { blankField: true };
  }
  if (state.hasOwnProperty("family_name") && state.family_name === "") {
    document.getElementById("family_name").classList.add("w3-pale-red");
    return { blankField: true };
  }
  if (state.hasOwnProperty("given_name") && state.given_name === "") {
    document.getElementById("given_name").classList.add("w3-pale-red");
    return { blankField: true };
  }
  if (state.hasOwnProperty("phone_number") && state.phone_number === "") {
    document.getElementById("phone_number").classList.add("w3-pale-red");
    return { blankField: true };
  }
  if (state.hasOwnProperty("password") && state.password === "") {
    document.getElementById("password").classList.add("w3-pale-red");
    return { blankField: true };
  }
  if (state.hasOwnProperty("confirmPassword") && state.confirmPassword === "") {
    document.getElementById("confirmPassword").classList.add("w3-pale-red");
    return { blankField: true };
  }
  if (state.hasOwnProperty("oldPassword") && state.oldPassword === "") {
    document.getElementById("oldPassword").classList.add("w3-pale-red");
    return { blankField: true };
  }
  if (state.hasOwnProperty("newPassword") && state.newPassword === "") {
    document.getElementById("newPassword").classList.add("w3-pale-red");
    return { blankField: true };
  }
  if (
    state.hasOwnProperty("verificationCode") &&
    state.verificationCode === ""
  ) {
    document.getElementById("verificationCode").classList.add("w3-pale-red");
    return { blankField: true };
  }
  if (
    state.hasOwnProperty("confirmNewPassword") &&
    state.confirmNewPassword === ""
  ) {
    document.getElementById("confirmNewPassword").classList.add("w3-pale-red");
    return { blankField: true };
  }

  // check password match
  if (
    state.hasOwnProperty("password") &&
    state.hasOwnProperty("confirmPassword") &&
    state.password !== state.confirmPassword
  ) {
    document.getElementById("password").classList.add("w3-pale-red");
    document.getElementById("confirmPassword").classList.add("w3-pale-red");
    return { passwordNotMatch: true };
  }
  if (
    state.hasOwnProperty("newPassword") &&
    state.hasOwnProperty("confirmNewPassword") &&
    state.newPassword !== state.confirmNewPassword
  ) {
    document.getElementById("newPassword").classList.add("w3-pale-red");
    document.getElementById("confirmNewPassword").classList.add("w3-pale-red");
    return { passwordNotMatch: true };
  }
};
export default Validate;
