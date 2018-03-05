
/* Custom function for this html document. Retrieves an input text from
a textarea, validates it and creates a two dimensional array from it.
Finally, it uses createTable() to append a table to the page body */
function getTableFromStringMatrix() {
  var matrixTextArea = document.getElementById("matrix-input");
  var text = matrixTextArea.value;

  //Validates the textarea input.
  if(!(matrix = validateMatrix(text))){
    matrixTextArea.style.cssText = "color: red;";
    return;
  }

  //Clears any previous error state.
  clearErrorState();

  //This line was only adding for testing. Remove or comment if not necessary
  console.log(matrix);

  //Creates a matrix.
  createTable(matrix);
}


/*Creates a matrix from an input matrix.
Pre-cond: matrix parameter is a valid js two dimensional array.
Important: This is the function required by exercise 06, other functions 
are only for validation and to have an easy way to input text*/
function createTable(matrix) {

  //Creates table, thead and tbody and gets html body element.
  var table = document.createElement("table")
  var tableHeader = document.createElement("thead");
  var tableBody = document.createElement("tbody");
  var htmlBody = document.getElementsByTagName("body")[0];

  //Appends to the body the newly created table.
  htmlBody.appendChild(document.createElement("br"));
  htmlBody.appendChild(table);

  //Appends header and body to the newly created table.
  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  //This flag is used to make a difference between table's header and body.
  var headerFlag = true;

  //Reads two dimensional array row by row
  for(var rowData of matrix) {
    var row = document.createElement("tr");

    //Creates a row cell or a head cell depending on the flag's value.
    //After header is created, headerFlag turns false.
    if(headerFlag) {
      headerFlag = false;
      tableHeader.appendChild(row);
    } else {
      tableBody.appendChild(row);
    }

    //Reads each cell of the current row.
    for(var cellData of rowData) {

      //Creates a table cell and appends it to the current row
      var cell = document.createElement("td");
      row.appendChild(cell);

      //Fills cell with data
      cell.appendChild(document.createTextNode(cellData));
    }
  }

}

/* Validates a string against a JSON matrix pattern. If valid a JS matrix will be,
returned otherwise it will return false */
function validateMatrix(text){

  //if string is empty or undefined false is returned.
  if(!text) {
    return false;
  }

  try{
    var json = '{"items":' + text + '}';
    var matrix = JSON.parse(json).items;

    //If parsing is succesfull but returns a string, false is returned.
    if(typeof matrix == 'string')
      return false;

    /*This line tries to access a element of the array, if has not the correct
    format and exception will be thrown, and catch statement will catch it.
    This ensures that if the input is a valid JSON attribute value it will
    not be validated unless it is a two dimensional array*/
    matrix[0][0];

    return matrix;

  //If parse fails, exception is caught and false is returned.
  } catch(err) {
    return false;
  }
}

//Clears textarea error state.
function clearErrorState(){
  var matrixTextArea = document.getElementById("matrix-input");
  matrixTextArea.style.cssText = "color: black";
}
