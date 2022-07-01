let choices = document.getElementsByClassName("btn");
let clicked = document.getElementById("clicked");
let bg_music = document.getElementById("bg_music");
let List = [
  "images/Rock.png",
  "images/Paper.png",
  "images/Scissors.png",
  "images/Lizard.png",
  "images/Spock.png",
];
let win = 0;
let lost = 0;
let draw = 0;

function checkPattern() {
  let user = document.getElementById("user").src.substr(35);
  let comp = document.getElementById("comp").src.substr(35);
  let result_text = document.getElementById("result_text");
  let scores = document.getElementsByTagName("td");

  if (user === List[0]) {
    if (comp === List[0]) {
      result_text.innerText = "It's a draw!!! 😵";
      ++draw;
    } else if (comp === List[1]) {
      result_text.innerText = "Paper covers Rock. You lost 😭";
      ++lost;
    } else if (comp === List[2]) {
      result_text.innerText = "Rock crushes Scissors. You win 😎";
      ++win;
    } else if (comp === List[3]) {
      result_text.innerText = "Rock crushes Lizard. You win 😎";
      ++win;
    } else if (comp === List[4]) {
      result_text.innerText = "Spock vaporizes Rock. You lost 😭";
      ++lost;
    }
  } else if (user === List[1]) {
    if (comp === List[0]) {
      result_text.innerText = "Paper covers Rock. You win 😎";
      ++win;
    } else if (comp === List[1]) {
      result_text.innerText = "It's a draw!!! 😵";
      ++draw;
    } else if (comp === List[2]) {
      result_text.innerText = "Scissors cuts Paper. You lost 😭";
      ++lost;
    } else if (comp === List[3]) {
      result_text.innerText = "Lizard eats Paper. You lost 😭";
      ++lost;
    } else if (comp === List[4]) {
      result_text.innerText = "Paper disproves Spock. You win 😎";
      ++win;
    }
  } else if (user === List[2]) {
    if (comp === List[0]) {
      result_text.innerText = "Rock crushes Scissors. You lost 😭";
      ++lost;
    } else if (comp === List[1]) {
      result_text.innerText = "Scissors cuts Paper. You win 😎";
      ++win;
    } else if (comp === List[2]) {
      result_text.innerText = "It's a draw!!! 😵";
      ++draw;
    } else if (comp === List[3]) {
      result_text.innerText = "Scissors decapitates Lizard. You win 😎";
      ++win;
    } else if (comp === List[4]) {
      result_text.innerText = "Spock smashes Scissors. You lost 😭";
      ++lost;
    }
  } else if (user === List[3]) {
    if (comp === List[0]) {
      result_text.innerText = "Rock crushes Lizard. You lost 😭";
      ++lost;
    } else if (comp === List[1]) {
      result_text.innerText = "Lizard eats Paper. You win 😎";
      ++win;
    } else if (comp === List[2]) {
      result_text.innerText = "Scissors decapitates Lizard. You lost 😭";
      ++lost;
    } else if (comp === List[3]) {
      result_text.innerText = "It's a draw!!! 😵";
      ++draw;
    } else if (comp === List[4]) {
      result_text.innerText = "Lizard poisons Spock. You win 😎";
      ++win;
    }
  } else if (user === List[4]) {
    if (comp === List[0]) {
      result_text.innerText = "Spock vaporizes Rock. You win 😎";
      ++win;
    } else if (comp === List[1]) {
      result_text.innerText = "Paper disproves Spock. You lost 😭";
      ++lost;
    } else if (comp === List[2]) {
      result_text.innerText = "Spock smashes Scissors. You win 😎";
      ++win;
    } else if (comp === List[3]) {
      result_text.innerText = "Lizard poisons Spock. You lost 😭";
      ++lost;
    } else if (comp === List[4]) {
      result_text.innerText = "It's a draw!!! 😵";
      ++draw;
    }
  }

  scores[1].innerText = win;
  scores[3].innerText = draw;
  scores[5].innerText = lost;
}

function compChoice() {
  return List[Math.floor(Math.random() * List.length)];
}

function defaultState(index) {
  Array.from(choices).forEach((choice, i) => {
    i === index ? "" : (choice.childNodes[1].style.backgroundColor = "skyblue");
  });
}

function reset() {
  let result_text = document.getElementById("result_text");
  let scores = document.getElementsByTagName("td");

  result_text.innerText = "Game Mode On";
  scores[1].innerText =
    scores[3].innerText =
    scores[5].innerText =
    win =
    draw =
    lost =
      0;
  document.getElementById("default").style.display = "flex";
  document.getElementsByClassName("board")[0].style.display = "none";
  defaultState(null);
}

Array.from(choices).forEach((choice, i) => {
  choice.addEventListener("click", () => {
    clicked.play();
    bg_music.play(-1);

    document.getElementById("default").style.display = "none";
    document.getElementsByClassName("board")[0].style.display = "flex";
    defaultState(i);

    choice.childNodes[1].style.backgroundColor = "aquamarine";
    document.getElementById("user").src = List[i];
    document.getElementById("comp").src = compChoice();
    checkPattern();
  });
});
