let list = [1, 2, 3, 4, 5, 6];
let randomNo = null;
let dice = document.getElementsByClassName("dice")[0];
let rolled = 0;
let score = localStorage.getItem("score");
let dl = [];

document.getElementById("score").innerText = localStorage.getItem("score")
  ? score
  : "00";

function roll() {
  rolled++;
  document.getElementById("rolled").innerText = rolled;
  Array.from(dice.getElementsByTagName("button")).forEach((elem) => {
    !elem.disabled
      ? ((randomNo = Math.floor(Math.random() * list.length)),
        (elem.innerText = list[randomNo]))
      : "";
  });
}
function freeze(die) {
  die.disabled = true;
  die.style.backgroundColor = "yellowgreen";
  dl.push(parseInt(die.innerText));
  dl.length === dice.childElementCount ? game_over() : "";
}
function game_over() {
  if (dl.every((n) => n === dl[0])) {
    dice.style.display = "none";
    document.getElementById("roll").disabled = true;
    document.getElementById("game_over").style.display = "flex";
    score
      ? score > rolled - 1
        ? localStorage.setItem("score", rolled - 1)
        : ""
      : localStorage.setItem("score", rolled - 1);
    document.getElementById("score").innerText = localStorage.getItem("score");
  }
}
function reset() {
  Array.from(dice.getElementsByTagName("button")).forEach((elem) => {
    elem.disabled = false;
    elem.innerText = 0;
    elem.style.backgroundColor = "white";
  });
  dl.splice(0);
  dice.style.display = "block";
  document.getElementById("roll").disabled = false;
  document.getElementById("rolled").innerText = rolled = 0;
  document.getElementById("game_over").style.display = "none";
}
