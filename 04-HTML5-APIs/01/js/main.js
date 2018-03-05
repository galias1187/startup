//Checks if storage is supported by browser
let storageAvailable = typeof(Storage) !== 'undefined';

//If not supported and alert message is thrown
if(!storageAvailable) {
  alert("We're sorry, your browser does not support local storage, persistency" +
        "functions will not be available.");
} else {

  //Init storage variables.
  let localStorage = window.localStorage;
}

//Inserts data into local storage.
function localStorageInsert(key, value) {

  //If no storage support, no action is done, and false is returned
  if(!storageAvailable)
    return false;

  localStorage.setItem(key, value);
  return true;

}

function localStorageGet(key) {

  //If no storage support, no action is done and undefined is returned.
  if(storageAvailable) {
    return localStorage.getItem(key);
  }
}

function localStorageDelete(key) {

  //If no storage support, no action is done and false is returned.
  if(!storageAvailable) {
    return false;
  }

  localStorage.removeItem(key);
  return true;
}




var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

//Sets up the indexedDB
if(!indexedDB) {

  //If not supported an alert message is shown.
  alert("We're sorry, your browser does not support indexedDB, persistency" +
        "functions will not be available.");
} else {

  //Opens or creates a connection to an existing or new database.
  let openRequest = indexedDB.open('topic04DB', 2);
  var db;

  //If an error occurs while establishing connection a message is popped.
  openRequest.onerror =  (event) => {
    alert("Usage of indexed DB is not allowed");
  }

  //If connection is successfull db is assigned.
  openRequest.onsuccess = (event) => {
    db = event.target.result;

    //Standard data base error handler.
    db.onerror = (event) => {
      console.log("An error has ocurred while handling DB.")
    }
  }

  /*onupgradeneeded is used to alter de DB structure.
  Creates and object store (like a relational model table)*/
  openRequest.onupgradeneeded = (event) => {
    db = event.target.result;

    //Creates a object store with container as primary key
    let objectStore = db.createObjectStore('HTMLContent', {keyPath: 'container'});
  }

}

/*Insert data into the indexedDB
<store> Target object store.
<values> Data element to be added.
returns a request, the caller must define what to if it succedes or not*/
function indexedDBInsert(store, data) {

  //If no storage support, no action is done.
  if(!indexedDB) {
    alert("IndexedDB operations not supported.");
    return;
  }

  //If the db object is assigned (means that the connection is established)
  if(db) {

    /*Instances a transaction over the desired store and inserts data.
    If a data member with the desired key already exist it is updated*/
    let tx = db.transaction([store], "readwrite");
    let objectStore = tx.objectStore(store);
    let request = objectStore.put(data);

    return request;
  }
}

//This function was only defined to test how data was being stored on the db.
function indexedDBGet(store, key) {

  //If no storage support, no action is done.
  if(!indexedDB) {
    alert("IndexedDB operations not supported.");
    return;
  }

  //If the db object is assigned (means that the connection is established)
  if(db) {

    let tx = db.transaction([store], "readwrite");
    let objectStore = tx.objectStore(store);
    let request = objectStore.get(key);

    return request;
  }

}

function indexedDBDelete(store, key) {

  //If no storage support, no action is done.
  if(!indexedDB) {
    alert("IndexedDB operations not supported.");
    return;
  }

  if(db) {

    let tx = db.transaction([store], 'readwrite');
    let objectStore = tx.objectStore(store);
    let request = objectStore.delete(key);

    return request;
  }

}


//Gets text-area content and saves it to localStorage and indexedDB
function saveTextArea() {

  let textArea = document.getElementById("input-text-area");
  let text = textArea.value;
  let request;

  //Creates an object (like a relational model row)
  const dataElement = {
    container: "text-area",
    data: text
  }

  //Adds text-area data to local storage
  if(localStorageInsert(dataElement.container, dataElement.data)) {
    alert("Text area content saved to local storage");
  }

  //Adds text-area data to indexedDB
  request = indexedDBInsert("HTMLContent", dataElement);

  //If request was returned... (no undefined)
  if(request) {

    request.onsuccess = (event) => {
      alert("Text area content was saved to indexedDB")
    }

    request.onerror = (event) => {
      alert("An error ocurred while saving data to the indexedDB")
    }

  }

}

//Removes stored
function deleteStoredTextArea() {

  const textAreaKey = "text-area"

  //Removes data from localStorage
  if(localStorageDelete(textAreaKey)) {
    alert("Text area content removed from local storage.")
  }

  //Removes data from indexedDB
  request = indexedDBDelete("HTMLContent", textAreaKey);

  //If a request was returned... (No undefined)
  if(request) {

    request.onsuccess = (event) => {
      alert("Text-area content was removed from indexedDB");
    }

    request.onerror = (event) => {
      alert("An error ocurred while removing data from indexedDB.");
    }
  }
}


function allowDrop(ev) {

  //Prevents browser default handling of the data.
  ev.preventDefault();
}

//This function is called when something is dropped on the text-area.
function drop(ev) {
  const loading_file_message = "Loading file..."
  const textArea = document.getElementById("input-text-area");

  //Prevents browser default handling of the data.
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");

  //Prevents multi-file dropping (ensures that one an only one element is dropped)
  if(ev.dataTransfer.items.length == 1) {

    let item = ev.dataTransfer.items[0];

    //If the dropped element is a file...
    if(item.kind === 'file') {

      let file = item.getAsFile();

      //Instances a new file reader and reads the file (as always read is assync)
      let reader = new FileReader();
      reader.readAsText(file, 'UTF-8')
      textArea.value = loading_file_message;

      //If reading is successfull, file contents are saved to text-area
      reader.onload = (event) => {
        textArea.value = event.target.result;
      }

      //Otherwise, an error message is thrown.
      reader.onerror = (event) => {
        textArea.value = "An error was detected while loading file's content to text-area.";
      }
    }
  }

}
