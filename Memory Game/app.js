let game_container = document.getElementsByClassName("game-container")[0];
let time = document.getElementsByClassName("time");
let List = [
  "c++_logo.png",
  "html5_logo.png",
  "javascript_logo.png",
  "PHP_logo.png",
  "Python_logo.png",
];
let cards = [];
let prevElem = null;
let prevIndex = 0;
let attempts = 0;
let start = true;
let d = new Date();
let s = (m = 0);
let id = null;
let imgWH = null;

shuffle();
fillShowBoard();

function levelChanged(opt) {
  List.splice(5);
  if (opt.value === "Medium" || opt.value === "Hard") {
    List.push(
      "css_logo.png",
      "java_logo.png",
      "nodejs_logo.png",
      "reactjs_logo.png",
      "django_logo.png"
    );
    if (window.innerWidth <= "768") {
      imgWH = "width: 6.5em; height: 6.5em;";
      if (window.innerWidth <= "475") {
        imgWH = "width: 4.5em; height: 4.5em;";
      }
    } else {
      imgWH = "width: 9.5em; height: 9.5em;";
    }

    if (opt.value === "Hard") {
      List.push(
        "mysql_logo.png",
        "mongodb_logo.png",
        "redis_logo.png",
        "postgresql_logo.png",
        "aws_logo.png"
      );
      if (window.innerWidth <= "768") {
        imgWH = "width: 5em; height: 5em;";
        if (window.innerWidth <= "475") {
          imgWH = "width: 3.5em; height: 3.5em;";
        }
      } else {
        imgWH = "width: 7.5em; height: 7.5em;";
      }
    }
  }
  shuffle();
  fillShowBoard();
}

function shuffle() {
  cards = [];
  List.forEach((img) => {
    const index1 = Math.floor(Math.random() * cards.length);
    const index2 = Math.floor(Math.random() * cards.length);
    cards.splice(index1, 0, img);
    cards.splice(index2, 0, img);
  });
}

function reset() {
  Array.from(document.getElementsByClassName("back")).forEach((item) => {
    display(item, 1, 0);
  });
  cards = [];
  shuffle();
  let att = document.getElementsByClassName("attempts");
  att[0].innerText = att[1].innerText = attempts = 0;
  time[0].innerText = time[1].innerText = "00:00";
  clearInterval(id);
  start = true;
  m = s = 0;
  document.getElementsByClassName("modal")[0].style.opacity == 0
    ? ""
    : ((document.getElementsByClassName("modal")[0].style =
        "animation: unload .6s; opacity: 0; z-index: -1;"),
      (document.getElementsByClassName("game-container")[0].style =
        "opacity: 1"));
  fillShowBoard();
}

function game_over() {
  let all_found = Array.from(document.getElementsByClassName("back")).filter(
    (item) => {
      return item.style.opacity == 1;
    }
  );

  all_found.length === cards.length
    ? (clearInterval(id),
      (document.getElementsByClassName("modal")[0].style =
        "animation: load .6s; opacity: 1; z-index: 1;"),
      (document.getElementsByClassName("game-container")[0].style =
        "opacity: .5"))
    : "";
}

function stopWatch() {
  s++;
  d.setHours(0, m, s, 0);
  time[0].innerText = time[1].innerText =
    (m < 10 ? "0" : "") +
    d.getMinutes() +
    (s < 10 ? ":0" : ":") +
    d.getSeconds();
  s === 60 ? m++ : "";
}

function check(item) {
  prevElem.children[0].src === item.children[0].src
    ? ((prevElem = null), game_over())
    : setTimeout(() => {
        display(prevElem, 1, 0);
        display(item, 1, 0);
        prevElem.parentNode.style.removeProperty("animation");
        item.parentNode.style.removeProperty("animation");
        prevElem = null;
      }, 500);
}

function display(elem, f, b) {
  let att = document.getElementsByClassName("attempts");
  elem.parentNode.style = "transform: rotateY(180deg); animation: flip .4s;";
  elem.previousSibling.previousSibling.style.opacity = f;
  elem.style.opacity == 0
    ? (att[0].innerText = att[1].innerText = ++attempts)
    : "";
  elem.style.opacity = b;
}

function fillShowBoard() {
  game_container.innerHTML = "";

  cards.forEach((imgUrl) => {
    game_container.innerHTML += `<div class="card">
      <button class="front"><img src="images/defaultGif.gif" /></button>
      <button class="back"><img src=${"images/" + imgUrl} /></button>
      </div>`;
  });
  cards.length > 10
    ? Array.from(document.getElementsByTagName("img")).forEach((elem) => {
        elem.style = imgWH;
      })
    : "";

  Array.from(document.getElementsByClassName("back")).forEach((item, i) => {
    item.addEventListener("click", (e) => {
      display(item, 0, 1);
      prevElem === null
        ? ((prevElem = item), (prevIndex = i))
        : prevIndex !== i
        ? check(item)
        : "";
      start
        ? (Window.constructor((id = setInterval(stopWatch, 1000))),
          (start = false))
        : "";
    });
  });
}
