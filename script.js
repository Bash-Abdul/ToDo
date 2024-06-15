// USING DEFAULT JS
let list_input = document.querySelector(".list_input");
let btn = document.querySelector(".btn");
let list_container = document.querySelector(".list_item_container");

btn.addEventListener("click", () => {
  let list_item = list_input.value;

  if (list_item == "") {
    alert("ERROR. INVALID INPUT");
  } else {
    push(toDoListInDB, list_item);
    clearInputField();

    let newList = document.createElement("li");
    newList.innerHTML = `${list_item}`;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    newList.appendChild(span);

    list_container.append(newList);
  }
  saveData();
});

list_container.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", list_container.innerHTML);
}
function showTask() {
  list_container.innerHTML = localStorage.getItem("data");
}
showTask();


function clearInputContainer() {
  list_container.innerHTML = "";
}

function clearInputField() {
  list_input.value = "";
}
