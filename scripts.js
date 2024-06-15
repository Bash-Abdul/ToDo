//USING FIREBASE 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  apiKey: "AIzaSyDNigV66tgRgnxo2-_JvCoP4U2h_d9A6HU",
  authDomain: "todo-ff974.firebaseapp.com",
  databaseURL: "https://todo-ff974-default-rtdb.firebaseio.com",
  projectId: "todo-ff974",
  storageBucket: "todo-ff974.appspot.com",
  messagingSenderId: "92626872438",
  appId: "1:92626872438:web:195ed168ff3feecdf7d757",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const toDoListInDB = ref(database, "ToDo List");

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

  }
});

onValue(toDoListInDB, function(snapshot){
   if(snapshot.exists()){
    let toDoListArray = Object.entries(snapshot.val());
    clearInputContainer();

    for(let i=0; i<toDoListArray.length; i++){

        let currentItem = toDoListArray[i];
        let currentItemId = currentItem[0];
        let currentItemValue = currentItem[1];

        appendItemsToList(currentItem);
    }
   }
   else{
    list_container.innerHTML = "Nothing added to list..."
   }
})

function clearInputContainer() {
  list_container.innerHTML = "";
}

function clearInputField() {
  list_input.value = "";
}

function appendItemsToList(items){

    let itemsID = items[0];
    let itemsValue = items[1];
    let newList = document.createElement("li");
    newList.innerHTML = `${itemsValue}`;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"
    newList.appendChild(span);

    newList.addEventListener('click', ()=>{
        newList.classList.toggle('checked');
    })

    span.addEventListener('click', ()=>{

       let exactItemId = ref(database, `ToDo List/${itemsID}`);
       remove(exactItemId);
    })

    list_container.append(newList);
}