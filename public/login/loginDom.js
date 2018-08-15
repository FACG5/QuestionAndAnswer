var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");
const loginButton = document.getElementById("loginSubmit");

var emailErr = document.getElementById("emailErr");
var passwordErr = document.getElementById("passwordErr");

loginButton.addEventListener("click", e => {
  e.preventDefault();
});

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

loginButton.addEventListener("click", e => {
  e.preventDefault();
  const userData = {
    email: email.value,
    password: password.value
  };
  request("POST", "/login", JSON.stringify(userData), (err, res) => {
    if (err) return console.log(err);
    window.location = "/";
  });
});
