function validateFname(fname) {
    if (fname.value.length === 0 || fname.value == " ") {
        document.getElementById("fname_error").hidden = false;
        document.getElementById("fname_error").innerHTML = "*This field is required.";
        return false;
    }
    var pattern = /^[0-9\s]+$/;
    if (fname.value.match(pattern)){
      document.getElementById("fname_error").hidden = false;
      document.getElementById("fname_error").innerHTML = "*First name should not contain numbers and whitespaces.";
      return false;
    }
    return true;
}
function validateMname(mname) {
    if (mname.value.length === 0 || mname.value == " ") {
        document.getElementById("mname_error").hidden = false;
        document.getElementById("mname_error").innerHTML = "*This field is required.";
        return false;
    }
    var pattern = /^[0-9\s]+$/;
    if (mname.value.match(pattern)){
      document.getElementById("mname_error").hidden = false;
      document.getElementById("mname_error").innerHTML = "*Middle name should not contain numbers and whitespaces.";
      return false;
    }
    return true;
}
function validateLname(lname) {
    if (lname.value.length === 0 || lname.value == " ") {
        document.getElementById("lname_error").hidden = false;
        document.getElementById("lname_error").innerHTML = "*This field is required.";
        return false;
    }
    var pattern = /^[0-9\s]+$/;
    if (lname.value.match(pattern)){
      document.getElementById("lname_error").hidden = false;
      document.getElementById("lname_error").innerHTML = "*Last name should not contain numbers and whitespaces.";
      return false;
    }
    return true;
}
function validateDob(dob) {
    if (dob.value.length === 0 || dob.value == " ") {
        document.getElementById("dob_error").innerHTML = "*This field is required.";
        document.getElementById("dob_error").hidden = false;
        return false;
    }
    return true;
}
function validateUname(uname) {
    if (uname.value.length === 0 || uname.value == " ") {
        document.getElementById("uname_error").hidden = false;
        document.getElementById("uname_error").innerHTML = "*This field is required.";
        return false;
    }
    return true;
}
function validatePhone(phoneNo) {
    if (phoneNo.value.length < 10 || phoneNo.value.length > 10 || phoneNo.value.length == 0) {
        document.getElementById("phoneNo_error").hidden = false;
        document.getElementById("phoneNo_error").innerHTML = "*Mobile number must contain 10 digits.";
        return false;
    }
    var pattern = /^[0-9]+$/;
    if (!phoneNo.value.match(pattern)) {
        document.getElementById("phoneNo_error").hidden = false;
        document.getElementById("phoneNo_error").innerHTML = '*Invalid phone number';
        return false;
    }
    return true;
}
function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var atpos = email.value.indexOf("@");
    var dotpos = email.value.lastIndexOf(".");

    if(email.value.length == 0) {
        document.getElementById("email_error").hidden = false;
        document.getElementById("email_error").innerHTML = "*Please Enter Email";
        return false;
    }
    else if( !email.value.match(pattern) || dotpos < atpos+2 || dotpos+2 >= email.value.length ) {
        document.getElementById("email_error").hidden = false;
        document.getElementById("email_error").innerHTML = "*Invalid Email. Please enter @ after text and also use . ";
        return false;
    }
    return true;
}
function validateCname(cname) {
    if (cname.value.length === 0 || cname.value == " ") {
        document.getElementById("cname_error").hidden = false;
        document.getElementById("cname_error").innerHTML = "*This field is required.";
        return false;
    }
    return true;
}
function validateCyear(cyear) {
  if(cyear.value == 0) {
    document.getElementById("cyear_error").hidden = false;
    document.getElementById("cyear_error").innerHTML = "*Choose a Course year";
    return false;
  }
  return true;
}
function validateAddress(address) {
    if (address.value.length === 0 || address.value == " ") {
        document.getElementById("address_error").hidden = false;
        document.getElementById("address_error").innerHTML = "*This field is required.";
        return false;
    }
    return true;
}
function validatePass(password) {
    if (password.value.length == 0) {
        document.getElementById("pass_error").hidden = false;
        document.getElementById("pass_error").innerHTML = "*Please enter your password";
        return false;
    }
    var pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!password.value.match(pattern) || password.value.length < 8) {
        document.getElementById("pass_error").hidden = false;
        document.getElementById("pass_error").innerHTML = "*Password must contain at least 8 characters, including UPPER/lowercase, numbers and special characters";
        return false;
    }
    return true;
}
function validateCpass(cpassword, password) {
    if (cpassword.value.length == 0 || cpassword.value == " ") {
        document.getElementById("cpass_error").hidden = false;
        document.getElementById("cpass_error").innerHTML = "*Please Confirm the Password";
        return false;
    }
    if (cpassword.value != password.value || cpassword.value.length != password.value.length){
        document.getElementById("cpass_error").hidden = false;
        document.getElementById("cpass_error").innerHTML = "*Passwords Don't Match";
        return false;
    }
    return true;
}
function clearError() {
    let formErrors = document.getElementsByClassName('formError');
    Array.from(formErrors).forEach((item, i) => {
        item.innerHTML = "";
        item.hidden = true;
    });
}

function validateForm() {
    var fname = document.forms['regForm']['fname'];
    var mname = document.forms['regForm']['mname'];
    var lname = document.forms['regForm']['lname'];
    var email = document.forms['regForm']['email'];
    var dob = document.forms['regForm']['dob'];
    var uname = document.forms['regForm']['uname'];
    var phoneNo = document.forms['regForm']['phoneNo'];
    var cname = document.forms['regForm']['cname'];
    var cyear = document.forms['regForm']['cyear'];
    var address = document.forms['regForm']['address'];
    var password = document.forms['regForm']['pass'];
    var cpassword = document.forms['regForm']['cpassword'];

    clearError();
    var fname_valid = validateFname(fname);
    var mname_valid = validateMname(mname);
    var lname_valid = validateLname(lname);
    var email_valid =  validateEmail(email);
    var dob_valid = validateDob(dob);
    var uname_valid = validateUname(uname);
    var phoneNo_valid = validatePhone(phoneNo);
    var cname_valid = validateCname(cname);
    var cyear_valid = validateCyear(cyear);
    var address_valid = validateAddress(address);
    var password_valid = validatePass(password);
    var cpassword_valid = validateCpass(cpassword, password);

    if (fname_valid && mname_valid && lname_valid && email_valid && dob_valid && uname_valid && phoneNo_valid && cname_valid && cyear_valid && address_valid && password_valid && cpassword_valid){
      return true;
    }
    return false;
}
