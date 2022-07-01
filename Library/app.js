let Id = 0;
showBooks();
function getId() {
  return ++Id;
}
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}
function getObj() {
  let booksInfo = localStorage.getItem("booksInfo");
  if (booksInfo == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(booksInfo);
  }
}
function updateStorage(name, author, type, i) {
  let myObj = {
    Id: i,
    name: name,
    author: author,
    type: type,
  };
  getObj();
  booksObj.push(myObj);
  localStorage.setItem("booksInfo", JSON.stringify(booksObj));
}
function delRec(x) {
  getObj();
  booksObj.splice(x, 1);
  localStorage.setItem("booksInfo", JSON.stringify(booksObj));
  new Display().show("Success", "Your book has been deleted successfully.");
  showBooks();
}
function fillModal(elem) {
  let tds = elem.parentNode.parentNode.children;
  document.getElementById("recId").value = elem.id;
  document.getElementById("ebookName").value = tds[1].innerText;
  document.getElementById("ebookAuthor").value = tds[2].innerText;
  document.getElementById("e" + tds[3].innerText).checked = true;
}
function showBooks() {
  getObj();
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  let id = 1;
  Array.from(booksObj).forEach((item, i) => {
    let uiString = `<tr>
                      <td>${id}.</td>
                      <td>${item.name}</td>
                      <td>${item.author}</td>
                      <td>${item.type}</td>
                      <td class="d-md-flex justify-content-center"><button type="button" id="${i}" onclick="delRec(this.id)" class="del btn p-0 px-1 border border-dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                      </svg></button>
                      <button type="button" id="e${i}" class="edit btn p-0 px-1" onclick="fillModal(this)" data-bs-toggle="modal" data-bs-target="#editRecord">✏️</button></td>
                    </tr>`;
    tableBody.innerHTML += uiString;
    id++;
  });
}

function Display() {}

Display.prototype.add = (book, i) => {
  let tableBody = document.getElementById("tableBody");
  let uiString = `<tr>
                      <td>${i}.</td>
                      <td>${book.name}</td>
                      <td>${book.author}</td>
                      <td>${book.type}</td>
                      <td class="d-md-flex justify-content-center"><button type="button" id="${
                        i - 1
                      }" onclick="delRec(this.id)" class="del btn p-0 px-1 border border-dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                      </svg></button>
                      <button type="button" id="e${
                        i - 1
                      }" class="edit btn p-0 px-1" onclick="fillModal(this)" data-bs-toggle="modal" data-bs-target="#editRecord">✏️</button></td>
                    </tr>`;
  tableBody.innerHTML += uiString;
};
Display.prototype.clear = () => {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};
Display.prototype.validate = (book) => {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};
Display.prototype.show = (str, message) => {
  let msg = document.getElementById("msg");
  msg.innerHTML = `<div class="alert alert-${
    str === "Error" ? "danger" : str.toLowerCase()
  } alert-dismissible fade show" role="alert">
                        <strong>${str}:</strong> ${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                     </div>`;
  setTimeout(() => {
    msg.innerHTML = " ";
  }, 2000);
};
Display.prototype.search = (elem) => {
  let inputVal = elem.value.toLowerCase();
  let data = document.getElementById("tableBody").getElementsByTagName("tr");
  Array.from(data).forEach((element, i) => {
    let bname = data[i].childNodes[3].innerText.toLowerCase();
    let bauthor = data[i].childNodes[5].innerText.toLowerCase();
    let btype = data[i].childNodes[7].innerText.toLowerCase();
    if (
      bname.includes(inputVal) ||
      bauthor.includes(inputVal) ||
      btype.includes(inputVal)
    ) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  });
};

function checkedType(fiction, programming, cooking, others) {
  let type;
  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  } else if (others.checked) {
    type = others.value;
  }
  return type;
}

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault();
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("bookAuthor").value;
  let type = checkedType(
    document.getElementById("fiction"),
    document.getElementById("programming"),
    document.getElementById("cooking"),
    document.getElementById("others")
  );

  let book = new Book(name, author, type);
  let display = new Display();
  if (display.validate(book)) {
    let i = getId();
    display.add(book, i);
    updateStorage(name, author, type, i);
    display.clear();
    display.show("Success", "Your book has been successfully added.");
  } else {
    display.show("Error", "Sorry you cannot add this book.");
  }
}

document.getElementById("save").addEventListener("click", (e) => {
  e.preventDefault();
  let id = document.getElementById("recId").value.substr(1);
  let type = checkedType(
    document.getElementById("efiction"),
    document.getElementById("eprogramming"),
    document.getElementById("ecooking"),
    document.getElementById("eothers")
  );

  getObj();
  booksObj[id].name = document.getElementById("ebookName").value;
  booksObj[id].author = document.getElementById("ebookAuthor").value;
  booksObj[id].type = type;
  localStorage.setItem("booksInfo", JSON.stringify(booksObj));
  new Display().show("Success", "Your book has been updated successfully.");
  document.getElementsByClassName("btn-close")[0].click();
  showBooks();
});
