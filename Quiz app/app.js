let options = document.getElementsByTagName("input");
let list_items = document.getElementsByTagName("li");
let submit = document.getElementsByTagName("button")[0];
let correct = 0;
let data = "";

fetchData();
Array.from(options).forEach((opt, i) => {
  list_items[i].addEventListener("click", (e) => {
    opt.checked = true;
  });
});

async function fetchData() {
  try {
    const res = await fetch("./data.json");
    data = await res.json();
    nextObj(0);
  } catch (error) {
    console.log(error);
  }
}

function nextObj(i) {
  document.getElementById("ques").style.animation = "2s load_que";
  document.getElementsByClassName("options")[0].style.animation =
  "2s load_options";
  submit.disabled = true;

  if (i === "again") {
    document.getElementsByClassName("options")[0].hidden = false;
    submit.innerText = "Next";
    submit.id = i = 0;
  }
  i < 10 ? (obj = data["SpotTheAns"][i]) : "";
  obj.id
    ? ((submit.id = obj.id),
      (document.getElementById("ques").innerText =
        obj.id + ". " + obj.question),
      Array.from(options).forEach((opt, index) => {
        opt.checked && i > 0
          ? opt.value === data["SpotTheAns"][i - 1].answer
            ? ++correct
            : ""
          : "";
        opt.checked = false;
        list_items[index].children[1].innerText = opt.value =
          obj.options[index];
      }))
    : "";

  setTimeout(() => {
    document.getElementById("ques").style.removeProperty("animation");
    document
      .getElementsByClassName("options")[0]
      .style.removeProperty("animation");
    submit.disabled = false;
  }, 2000);
  i == 9 ? (submit.innerText = "Submit") : "";
  i == 10 ? showResult() : "";
}

function showResult() {
  submit.id = "again";
  submit.innerText = "Try again!";
  document.getElementById("ques").innerText =
    "You got " + correct + " out of 10 correct.";
  document.getElementsByClassName("options")[0].hidden = true;
}
