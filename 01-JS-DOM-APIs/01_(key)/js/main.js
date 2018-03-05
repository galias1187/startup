
//This is a configuration object for httpRequest function. (--> Joke button)
const jokeButtonCfg = {

  //Specifies request type: GET, POST, DELETE, etc.
  type: 'GET',

  //Specifies the target url
  url: 'http://api.icndb.com/jokes/random',

  //Request type (true for async, false otherwise)
  async: true,

  //Max time to fullfill the request
  maxTime: 3000,

  //Behaviour when request is succesfull.
  success: function(response){
    var articleParagraph = document.getElementById('result-text');
    var responseText = JSON.parse(response).value.joke;

    //The following line is only used for testing. Comment if no test required.
    console.log("request succesfully answered...");

    articleParagraph.innerHTML = responseText;
  },

  //Behaviour when request fails.
  failure: function(){
    var mainSection = document.getElementById('main-section');

    //The following line is only used for testing. Comment if no test required.
    console.log("Request failed...");
    mainSection.style.cssText = "color: red";
  },

  //Clears status of elements affected by an error state.
  clearErrorState: function(){
    clearJokeErrorState();
  }

};


//Adding load event to window (triggers after loading the document)
window.addEventListener('load', function() {
  const fadingTime = 1000;

  //Gets the collection of element whose class is fading-pane
  var fadingPanes = document.getElementsByClassName("fading-pane");

  //The following line is only used for testing. Comment if no test required.
  console.log("Page loading finished...");

  //For every element in colection, the quoted properties are added up
  for(var i = 0; i < fadingPanes.length; i++){

    //A variabe is used to make available the item inside timeout block
    var item = fadingPanes.item(i);
    item.style.cssText = "opacity:0; transition: opacity " + fadingTime +
    "ms linear;";

    setTimeout(function() {
      item.style.cssText = "display: none";

      //The following line is only used for testing. Comment if no test required.
      console.log("Element not displayed anymore...");
    }, fadingTime);
  }

});

//Shows an alert message.
function showAlertMessage(){
  alert("This is an alert message.");
}

//Opens a http conection and sends an empty GET http request.
function httpRequest(config){

  var requester = new XMLHttpRequest();

  config.clearErrorState();

  //The resolution of request is resolved as a promise.
  var promise = new Promise(function(resolve, reject){

    /*This was corrected after code review (28/02). Don't know why I have done
    the previous thing. */
    requester.open(config.type, config.url, config.async);
    requester.send();
    console.log("request send!");

    //XMLHttp requester onreadystatechange event handling. (Request is async)
    requester.onreadystatechange = function() {

      //The following line is only used for testing. Comment if no test required.
      console.log("Event triggered - readyState: " + requester.readyState + "...");

      //If request is succesfull, resolved is called.
      if(requester.readyState == XMLHttpRequest.DONE && requester.status == 200){
        resolve(requester.responseText);
      }

      //Else if resquest 400 (bad request) reject is called
      else if(requester.status == 400) {
        reject();
      }

      //A fixed time is given to complete de request, if time goes out reject is called.
      setTimeout(function() {
        reject();
      }, config.maxTime);

    }
  })


  promise.then((result) => {
    config.success(result);
  }).catch(error => {
    config.failure();
  });

  //A promise is returned.
  return promise;
}


function queryGithubRepos(){
  var searchInput = document.getElementById("search-keys-input");
  var searchString = searchInput.value ? searchInput.value : 'JavaScript';

  //This is a configuration object for httpRequest function. (--> Joke button)
  const githubReposCfg = {

    //Specifies request type: GET, POST, DELETE, etc.
    type: 'GET',

    //Specifies the target url
    url: 'https://api.github.com/search/repositories?q=' + parseQuery(searchString),

    //Request type (true for async, false otherwise)
    async: true,

    //Max time to fullfill the request
    maxTime: 3000,

    //Behaviour when request is succesfull.
    success: function(response){
      var contentUl = document.getElementById('result-list');
      var items = JSON.parse(response).items;

      clearReposList();

      //The following line is only used for testing. Comment if no test required.
      console.log("request succesfully answered...");

      if(!items.length){
        var newLi = document.createElement("li");
        newLi.innerHTML = "No matches...";
        contentUl.appendChild(newLi);
      } else {

        //For each item in the http response a list entry is created with a link
        for(var {full_name, html_url} of items) {
          var newLi = document.createElement("li");
          var newLink = document.createElement("a");
          newLink.href = html_url;
          newLink.title = full_name;
          newLink.innerHTML = full_name;
          newLi.appendChild(newLink);

          contentUl.appendChild(newLi);
        };
      }

    },

    //Behaviour when request fails.
    failure: function(){
      var searchInput = document.getElementById('search-keys-input');

      //The following line is only used for testing. Comment if no test required.
      console.log("Request failed...");

      //If an error occurs the input text border turns red.
      searchInput.style.cssText = "border-color: red";
    },

    //Clears status of elements affected by an error state.
    clearErrorState: function(){
      clearRepoErrorState();
    }
  };


  return httpRequest(githubReposCfg);

}

//Parses a multi-word search into a valid URI format.
function parseQuery(searchString){
  return encodeURIComponent(searchString);
}

//Use to clear repos list, when a new search is done.
function clearReposList(){
  var resultList = document.getElementById("result-list");
  resultList.innerHTML = "";
}

//Clears the red colored border from search keys input box.
function clearRepoErrorState(){
  var searchInput = document.getElementById('search-keys-input');
  searchInput.style.cssText = "border-color: black grey grey black";
}

//Clears the red colored text state from main section.
function clearJokeErrorState(){
  var mainSection = document.getElementById('main-section');
  mainSection.style.cssText = "color: black";
}
