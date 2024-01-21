const input_title = document.getElementById("title");
const input_about = document.getElementById("about");
const addlist_btn = document.getElementById("addlist-btn");
const main = document.getElementById("main");

var elements = JSON.parse(localStorage.getItem("elements") || "[]");

function setListData() {
  if (input_title.value.trim() != "" && input_about.value.trim() != "") {
    elements = JSON.parse(localStorage.getItem("elements") || "[]");
    var new_element = { title: input_title.value, about: input_about.value };

    elements.push(new_element);

    localStorage.setItem("elements", JSON.stringify(elements));

    datatoList();
  }
}

function datatoList() {
  main.innerHTML = "";
  elements.forEach((data, index) => {
    main.innerHTML += `
    <div class="list-container">
        <div class="list">
            <div class="list-text">
                <h4>${data.title}</h4>
                <p>${data.about}</p>
            </div>
            <button class="delete-btn" id="delete-btn" data-index="${index}">X</button>
        </div>
    </div>`;
  });
}

function deleteList(index) {
  elements.splice(index, 1);
  localStorage.setItem("elements", JSON.stringify(elements));
}

addlist_btn.addEventListener("click", () => {
  setListData();
  input_about.value = "";
  input_title.value = null;
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const index = parseInt(event.target.getAttribute("data-index"), 10);
    console.log(index);
    deleteList(index);
    datatoList();
  }
});

datatoList();
