let buttonList = document
  .getElementById("board")
  .getElementsByClassName("myBtn");
let turn = document.getElementById("turn");
let board = document.getElementById("board");
let player_won = document.getElementById("player_won");
let reset = document.getElementById("reset");
let bg_music = document.getElementById("bg_music");
let selected = document.getElementById("selected");
let value = "X";
let firstMove = "X";
let player_1_Name = "Player (X)";
let player_2_Name = "Player (O)";
let player_1_Val = "X";
let player_2_Val = "O";
let tie = 0;
let x_win = 0;
let o_win = 0;
let music = null;

getObj();

function disableAll() {
  Array.from(buttonList).forEach((item, i) => {
    item.disabled = true;
  });
}

function isFull() {
  for (let i = 0; i < buttonList.length; i++) {
    if (buttonList[i].innerText.length === 1) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

function checkPattern() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let j = 0; j < lines.length; j++) {
    let [a, b, c] = lines[j];
    if (
      (buttonList[a].innerText.length && buttonList[a].innerText) ===
        buttonList[b].innerText &&
      buttonList[a].innerText === buttonList[c].innerText
    ) {
      player_wins(a, b, c);
      return false;
    }
  }
  return true;
}

function switchTurn() {
  if (value == "X") {
    value = "O";
  } else if (value == "O") {
    value = "X";
  }
  turnText();
}

function turnText() {
  if (player_1_Val == value) {
    turn.innerText = player_1_Name + "'s turn";
  } else {
    turn.innerText = player_2_Name + "'s turn";
  }
}

function player_wins(a, b, c) {
  buttonList[a].style.backgroundColor = "orange";
  buttonList[b].style.backgroundColor = "orange";
  buttonList[c].style.backgroundColor = "orange";

  if (buttonList[a].innerText === "X") {
    x_win += 1;
    document.getElementById("xWins").innerText = x_win;
  } else {
    o_win += 1;
    document.getElementById("oWins").innerText = o_win;
  }
  if (player_1_Val === buttonList[a].innerText) {
    player_won.innerText = player_1_Name + " wins.";
  } else if (player_2_Val === buttonList[a].innerText) {
    player_won.innerText = player_2_Name + " wins.";
  }

  game_over();
  document.getElementById("winner").style.width = "auto";
  document.getElementsByClassName("myVideo")[0].style.backgroundColor =
    "#64d9d6";
}

function game_over() {
  disableAll();
  turn.innerText = "Game Over!!!";
  board.style.animation = "game_over 2s";
  board.style.transform = "translateY(-35px)";
  reset.style.animation = "new_game 2s infinite";
  player_won.style.animation = "transparentEffect 4s infinite";
}

function getObj() {
  if (localStorage.getItem("playersInfo") != null) {
    let playersInfo = JSON.parse(localStorage.getItem("playersInfo"));
    player_1_Name = playersInfo.player1.name;
    player_2_Name = playersInfo.player2.name;
    player_1_Val = playersInfo.player1.val;
    player_2_Val = playersInfo.player2.val;
    firstMove = playersInfo.first;
    value = playersInfo.first;
    music = playersInfo.bg_music;
    turnText();
    document.getElementById("player_1").innerText =
      player_1_Name + " (" + player_1_Val + ")";
    document.getElementById("player_2").innerText =
      player_2_Name + " (" + player_2_Val + ")";
  }
}

Array.from(buttonList).forEach((item, i) => {
  item.addEventListener("click", () => {
    selected.play();
    music ? bg_music.play(-1) : bg_music.pause();

    if (item.innerText.length == 0) {
      item.innerText = value;
      item.style.backgroundColor = "skyblue";
      switchTurn();
    }

    if (isFull()) {
      if (checkPattern()) {
        tie += 1;
        document.getElementById("tie").innerText = tie;
        document.getElementById("tieGif").style.width =
          "-webkit-fill-available";
        document.getElementById("tieGif").style.height = "120px";
        player_won.innerText = "It's a tie!!!";
        game_over();
      }
    }
    checkPattern();
  });
});

reset.addEventListener("click", () => {
  Array.from(buttonList).forEach((item, i) => {
    item.innerText = "";
    item.style.backgroundColor = "white";
    item.disabled = false;
  });
  value = "X";
  if (firstMove != value) {
    value = firstMove;
  }
  turnText();
  player_won.innerText = "";
  player_won.style.removeProperty("animation");
  board.style.removeProperty("animation");
  reset.style.removeProperty("animation");
  board.style.transform = "none";
  document.getElementById("winner").style.width = "0px";
  document.getElementById("tieGif").style.width = "0px";
  document.getElementsByClassName("myVideo")[0].style.backgroundColor =
    "transparent";
});

let settings = document.getElementById("settings");
let modal = document.getElementsByClassName("modal")[0];
let content = document.getElementById("content");
settings.addEventListener("click", () => {
  modal.style.display = "block";
  content.style.filter = "blur(2px)";
});

window.onclick = function (event) {
  if (
    !modal.contains(event.target) &&
    event.target != (settings && settings.firstChild)
  ) {
    modal.style.display = "none";
    content.style.filter = "none";
  }
};

let close = document.getElementById("close");
close.addEventListener("click", () => {
  modal.style.display = "none";
  content.style.filter = "none";
});

let settingsForm = document.getElementById("settingsForm");
settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var player_1_Name = document.forms["settingsForm"]["player_1_Name"];
  var player_2_Name = document.forms["settingsForm"]["player_2_Name"];
  var player1Choice = document.forms["settingsForm"]["player1Choice"];
  var player1Turn = document.forms["settingsForm"]["turn"];
  var bg_music = document.forms["settingsForm"]["switch"];

  if ((player_1_Name.value.length && player_2_Name.value.length) > 0) {
    if (player1Choice[0].checked) {
      p1Val = "X";
      p2Val = "O";
    } else {
      p1Val = "O";
      p2Val = "X";
    }

    if (player1Turn[0].checked) {
      first = p1Val;
    } else {
      first = p2Val;
    }

    let myObj = {
      player1: {
        name: player_1_Name.value,
        val: p1Val,
      },
      player2: {
        name: player_2_Name.value,
        val: p2Val,
      },
      first: first,
      bg_music: bg_music.checked,
    };

    localStorage.clear();
    localStorage.setItem("playersInfo", JSON.stringify(myObj));
    getObj();
  }
  modal.style.display = "none";
  content.style.filter = "none";
});
