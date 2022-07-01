let ctop_pr = document
  .getElementsByClassName("top-pr")[0]
  .getElementsByTagName("input");
let cto_do = document
  .getElementsByClassName("to-do")[0]
  .getElementsByTagName("input");
let note = document.getElementsByClassName("note")[0];
let tbody = document
  .getElementsByTagName("tbody")[0]
  .getElementsByTagName("input");
let cin_prog = document
  .getElementsByClassName("in-prog")[0]
  .getElementsByTagName("input");

let checkedImg = 'url("images/circle-checked24.png")';
let uncheckedImg = 'url("images/circle24.png")';

defaultMarker();
showAll();

function getObjs() {
  top_prObj =
    localStorage.getItem("top_pr") === null
      ? []
      : JSON.parse(localStorage.getItem("top_pr"));
  to_doObj =
    localStorage.getItem("to_do") === null
      ? []
      : JSON.parse(localStorage.getItem("to_do"));
  noteObj =
    localStorage.getItem("note") === null
      ? []
      : JSON.parse(localStorage.getItem("note"));
  scheduledObj =
    localStorage.getItem("scheduled") === null
      ? []
      : JSON.parse(localStorage.getItem("scheduled"));
  in_progObj =
    localStorage.getItem("in_prog") === null
      ? []
      : JSON.parse(localStorage.getItem("in_prog"));
  skin =
    localStorage.getItem("skin") === null
      ? "paper_texture.jpg"
      : JSON.parse(localStorage.getItem("skin"));
}

function defaultMarker() {
  Array.from(document.getElementsByTagName("li")).forEach((li, i) => {
    i > 2
      ? (li.style.listStyleImage === checkedImg
          ? (li.firstChild.value = "")
          : "",
        (li.style.listStyleImage = uncheckedImg),
        (li.firstChild.style = "color: black; text-decoration: none;"))
      : "";
  });
}

function removeCompleted() {
  getObjs();
  [to_doObj, in_progObj].forEach((obj) => {
    Array.from(obj).forEach((item, i) => {
      item ? (item.checked ? (obj[i] = null) : "") : "";
    });
  });
  localStorage.setItem("to_do", JSON.stringify(to_doObj));
  localStorage.setItem("in_prog", JSON.stringify(in_progObj));
  defaultMarker();
}

function reset() {
  let List = ["top_pr", "to_do", "note", "scheduled", "in_prog"];
  List.forEach((key) => {
    localStorage.removeItem(key);
  });
  Array.from(document.getElementsByTagName("input")).forEach((input) => {
    input.value = "";
  });
  note.value = "";
  defaultMarker();
}

function showItem(cls, obj) {
  Array.from(obj).forEach((elem, i) => {
    elem
      ? ((obj === "to_doObj" || "in_progObj") && elem.checked
          ? ((cls[i].parentNode.style.listStyleImage = checkedImg),
            (cls[i].style = "color: gray; text-decoration: line-through;"))
          : (cls[i].style.textDecoration = "none"),
        (cls[i].value = elem["text"]))
      : "";
  });
}

function showAll() {
  getObjs();
  setSkin(skin);
  showItem(ctop_pr, top_prObj);
  showItem(cto_do, to_doObj);
  note.value = noteObj[0] ? noteObj[0]["text"] : "";
  showItem(tbody, scheduledObj);
  showItem(cin_prog, in_progObj);
}

function setObj(index, elem, obj, key) {
  let myObj =
    key === "to_do" || key === "in_prog"
      ? elem.parentNode.style.listStyleImage === checkedImg
        ? { id: index, checked: true, text: elem.value }
        : { id: index, checked: false, text: elem.value }
      : { id: index, text: elem.value };
  obj[index] = myObj;
  localStorage.setItem(key, JSON.stringify(obj));
  showAll();
}

function switchMarker(i, elem, obj, key) {
  if (elem.parentNode.style.listStyleImage === uncheckedImg) {
    elem.parentNode.style.listStyleImage = checkedImg;
    elem.style = "color: gray; text-decoration: line-through;";
  } else {
    elem.parentNode.style.listStyleImage = uncheckedImg;
    elem.style.color = "black";
  }
  setObj(i, elem, obj, key);
}

Array.from(ctop_pr).forEach((elem, i) => {
  elem.addEventListener("input", (e) => {
    setObj(i, elem, top_prObj, "top_pr");
  });
});

Array.from(cto_do).forEach((elem, i) => {
  elem.addEventListener("input", (e) => {
    setObj(i, elem, to_doObj, "to_do");
  });

  elem.parentNode.addEventListener("click", (e) => {
    if (e.target.localName !== "input" && elem.value !== "") {
      switchMarker(i, elem, to_doObj, "to_do");
    }
  });
});

note.addEventListener("input", (e) => {
  setObj(0, note, noteObj, "note");
});

Array.from(tbody).forEach((elem, i) => {
  elem.addEventListener("input", (e) => {
    setObj(i, elem, scheduledObj, "scheduled");
  });
});

Array.from(cin_prog).forEach((elem, i) => {
  elem.addEventListener("input", (e) => {
    setObj(i, elem, in_progObj, "in_prog");
  });

  elem.parentNode.addEventListener("click", (e) => {
    if (e.target.localName !== "input" && elem.value !== "") {
      switchMarker(i, elem, in_progObj, "in_prog");
    }
  });
});

let skins = document.getElementsByClassName("skins")[0];
function showSkins() {
  skins.style.display = skins.style.display === "none" ? "block" : "none";
}

function setSkin(currSkin) {
  let h1 = document.getElementsByTagName("h1")[0];
  h1.style.color =
    currSkin === "skin_4.jpg" || currSkin === "skin_2.jpg"
      ? "white"
      : "firebrick";
  document.getElementsByClassName(
    "container"
  )[0].style.background = `0 url("images/${currSkin}")`;
  Array.from(document.getElementsByTagName("h3")).forEach((h3) => {
    h3.style.background = `0 url("images/${currSkin}")`;
    currSkin === "skin_4.jpg" || currSkin === "skin_2.jpg"
      ? (h3.style.color = "white")
      : (h3.style.color = "firebrick");
  });
}

Array.from(skins.childNodes).forEach((skin) => {
  skin.addEventListener("click", () => {
    let currSkin = skin.src.substr(42);
    setSkin(currSkin);
    localStorage.setItem("skin", JSON.stringify(currSkin));
  });
});

window.addEventListener("click", (e) => {
  e.target.id === "set-skin" ? "" : (skins.style.display = "none");
});
