var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");
const loginButton = document.getElementById("loginSubmit");
const logoutButton = document.getElementById("signup");
var emailErr = document.getElementById("emailErr");
var passwordErr = document.getElementById("passwordErr");

logoutButton.addEventListener("click", e => {
  e.preventDefault();
  window.location = "/signup";
});


var checkEmail = function() {
  if (email.validity.typeMismatch) {
    displayErr(emailErr, "Please enter a valid email address");
  } else if (email.validity.valueMissing) {
    displayErr(emailErr, "Please enter an email address");
  } else {
    displayErr(emailErr, "");
    return true;
  }
};

var checkPw = function() {
  if (password.validity.patternMismatch) {
    displayErr(
      passwordErr,
      "Password must contain at least eight characters, including one letter and one number"
    );
  } else if (password.validity.valueMissing) {
    displayErr(passwordErr, "Please enter a password");
  } else {
    displayErr(passwordErr, "");
    return true;
  }
};


function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

email.addEventListener("focusout", checkEmail);
password.addEventListener("focusout", checkPw);

loginButton.addEventListener("click", e => {
  e.preventDefault();
  if (!checkEmail() || !checkPw() ) {
    swal("", "Please Enter Valid Email / Password  ! ", "error");
    event.preventDefault();
  }
  else{

    const userData = {
      email: email.value,
      password: password.value
    };
    request("POST", "/login", JSON.stringify(userData), (err, res) => {
      if (err) return swal(err, "", "error");
  swal("Welcome Back ", "" , "success").then(value=>{
    window.location = "/";

  })
    });
  }

});
