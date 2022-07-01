showNotes();
let addBtn = document.getElementById("addBtn");
let favBtn = document.getElementById("favBtn");
let starBtns = document.getElementsByClassName("starBtn");

function get_Obj() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
}

function get_favObj() {
  let favourites = localStorage.getItem("favourites");
  if (favourites == null) {
    favObj = [];
  } else {
    favObj = JSON.parse(favourites);
  }
}

function showNotes() {
  let html = "";
  get_Obj();
  notesObj.forEach((item, i) => {
    html += `
      <div class="card m-2 ms-0 p-0 col-md-3">
        <div class="card-body">
        <input class="card-title fw-bold p-2" id="h${i}${item.id}" contenteditable onchange="editNote(this)" value="${item.title}">
        <textarea class="card-text p-2" id="c${i}${item.id}" rows="4" contenteditable onchange="editNote(this)">${item.text}</textarea>
        <button id="${item.id}" onclick="deleteNote(this.id)" class="btn p-1 del">Delete</button>          
        <button id="f${item.id}" onclick="addFav(this)" class="btn btn-primary starBtn">&starf;</button>
        </div>
      </div> `;
  });

  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `<p>Nothing to show <u>add your first note</u> using <b><i>"New Note +"</i></b></p>`;
  }
  showFav();
}

function showFav() {
  get_favObj();
  favObj.forEach((id) => {
    let starBtns = document.getElementsByClassName("starBtn");
    Array.from(starBtns).forEach((elem) => {
      if (id == elem.id.substring(1)) {
        elem.classList.replace("btn-primary", "btn-dark");
      }
    });
  });
}

function deleteNote(Id) {
  get_Obj();
  notesObj.forEach((note, index) => {
    if (note.id == Id) {
      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      removeFav(Id);
    }
  });
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", () => {
  let inputVal = search.value.toLowerCase();
  let cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((element) => {
    let cardTitle = element
      .getElementsByTagName("input")[0]
      .value.toLocaleLowerCase();
    let cardTxt = element
      .getElementsByTagName("textarea")[0]
      .value.toLocaleLowerCase();
    if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

addBtn.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addText");
  let addTitle = document.getElementById("addTitle");
  if (addTxt.value != "" && addTitle.value != "") {
    get_Obj();
    let myObj = {
      id: Date.now(),
      title: addTitle.value,
      text: addTxt.value,
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
  }
  document.getElementsByClassName("btn-close")[0].click();
  showNotes();
});

function editNote(note) {
  get_Obj();
  let index = note.id.substr(1, 1);
  if (note.classList[0] == "card-title") {
    notesObj[index].title = note.value;
  } else if (note.classList[0] == "card-text") {
    console.log(note, notesObj, index);
    notesObj[index].text = note.value;
  }
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function setObj(ID) {
  get_favObj();
  favObj.push(ID);
  localStorage.setItem("favourites", JSON.stringify(favObj));
  showFav();
}

function addFav(elem) {
  let ID = elem.id.substr(1);
  favObj.length > 0
    ? elem.classList[1] === "btn-primary"
      ? (elem.classList.replace("btn-primary", "btn-dark"), setObj(ID))
      : removeFav(ID)
    : setObj(ID);
}

function removeFav(Id) {
  get_favObj();
  favObj.forEach((id, i) => {
    if (id == Id) {
      favObj.splice(i, i + 1);
      document.getElementById(Id).classList.replace("btn-dark", "btn-primary");
    }
  });
  localStorage.setItem("favourites", JSON.stringify(favObj));
  showNotes();
}

favBtn.addEventListener("click", () => {
  if (favBtn.classList[1] == "btn-primary") {
    favBtn.classList.replace("btn-primary", "btn-dark");
    Array.from(starBtns).forEach((elem) => {
      if (elem.classList[1] == "btn-dark") {
        elem.parentElement.parentElement.style.display = "block";
      } else {
        elem.parentElement.parentElement.style.display = "none";
      }
    });
  } else if (favBtn.classList[1] == "btn-dark") {
    favBtn.classList.replace("btn-dark", "btn-primary");
    let cards = document.getElementsByClassName("card");
    Array.from(cards).forEach((item) => {
      item.style.display = "block";
    });
  }
});
