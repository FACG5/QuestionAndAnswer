var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");
var nameInput = document.getElementById("name");
var form = document.getElementsByTagName("form")[0];
console.log(nameInput);


var emailErr = document.getElementById("emailErr");
var passwordErr = document.getElementById("passwordErr");
var confirmErr = document.getElementById("confirmErr");

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

var checkConfirmPw = function() {
  if (password.value != confirmPassword.value) {
    displayErr(confirmErr, "Passwords do not match");
  } else if (confirmPassword.validity.valueMissing) {
    displayErr(confirmErr, "Please confirm your password");
  } else {
    displayErr(confirmErr, "");
    return true;
  }
};

// email.addEventListener("focusout",checkEmail);
// password.addEventListener("focusout",checkPw);
// confirmPassword.addEventListener("focusout",checkConfirmPw);

form.addEventListener('submit',(event)=>{
  // if(!checkEmail()||!checkPw()||!checkConfirmPw()) return e.preventDefault();
event.preventDefault()
var nameValue = nameInput.value ;
var emailValue = email.value;
var passwordValue = password.value;
console.log(nameValue,emailValue,passwordValue);

body={nameValue,emailValue,passwordValue};

fetch('/signup',{
  method: "POST",
  body: JSON.stringify(body),
  headers:{
    "Content-Type": "application/json"
  }
}).then(res=>{
 return res.json()

  
}).then(res=>{
  console.log(res);
  
  if(res.msg==='suc') {
    swal("", "Success SignUp , You Can login now ! ", "success");
     window.location='/login'
}else{
  window.location='/signup'

}

  
  
})
});
