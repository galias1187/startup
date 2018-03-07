
//Defines actions types
export const ADD_MOVIE = "ADD_MOVIE";
export const UPDATE_MOVIE = "UPDATE_MOVIE";
export const SELECT_MOVIE = "SELECT_MOVIE";
export const DELETE_MOVIE = "DELETE_MOVIE";
export const CLEAR_SELECTED = "CLEAR_SELECTED";
export const CHANGE_NAME = "CHANGE_NAME";
export const CHANGE_YEAR = "CHANGE_YEAR";
export const CHANGE_DURATION = "CHANGE_DURATION";

//Add movie action
export function addMovie(name, year, duration) {
  return {
    type: ADD_MOVIE,
    name,
    year,
    duration
  }
}

//Update movie action
export function updateMovie(index, name, year, duration) {
  return {
    type: UPDATE_MOVIE,
    index,
    name,
    year,
    duration
  }
}

//Select movie action
export function selectMovie(index) {
  return {
    type: SELECT_MOVIE,
    index
  }
}

//Delete movie action
export function deleteMovie(index) {
  return {
    type: DELETE_MOVIE,
    index
  }
}

//Clears form and current selection
export function clearSelected() {
  return {
    type: CLEAR_SELECTED,
    index: null
  }
}

//Changes name input
export function changeName(name) {
  return {
    type: CHANGE_NAME,
    name
  }
}

//Changes year input
export function changeYear(year) {
  return {
    type: CHANGE_YEAR,
    year
  }
}

//Changes duration input
export function changeDuration(duration) {
  return {
    type: CHANGE_DURATION,
    duration
  }
}
