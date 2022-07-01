let options = document
  .getElementsByClassName("options")[0]
  .getElementsByTagName("input");
let str = "";
let len = 4;

function reset() {
  Array.from(options).forEach((elem) => {
    elem.value = "4";
    elem.checked = false;
  });
  document.getElementsByName("password")[0].value = "";
}

function copy() {
  navigator.clipboard.writeText(
    document.getElementsByName("password")[0].value
  );
}

function fill(tname) {
  let string = "";
  if (tname === "numbers") {
    string = "0123456789";
  } else if (tname === "uppercase") {
    string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  } else if (tname === "lowercase") {
    string = "abcdefghijklmnopqrstuvwxyz";
  } else if (tname === "specialChar") {
    string = "@%+/'!#$^?:,(){}[]~-_.";
  }
  return string;
}

function randomPass(str) {
  let pass = "";
  if (str !== "") {
    for (let i = len; i > 0; i--) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
  }
  return pass;
}

Array.from(options).forEach((opt) => {
  opt.addEventListener("input", (e) => {
    let r = "";
    if (e.target.checked) {
      str += fill(e.target.name);
    } else {
      r += fill(e.target.name);
      str = str.replace(r, "");
    }
    if (e.target.name === "len") {
      if (e.target.value !== "" && Number.isInteger(Number(e.target.value))) {
        e.target.value < 4 ? (e.target.value = 4) : (len = e.target.value);
      }
    }
    document.getElementsByName("password")[0].value = randomPass(str);
  });
});
