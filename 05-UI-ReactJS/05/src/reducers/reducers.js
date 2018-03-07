import {
  ADD_MOVIE,
  UPDATE_MOVIE,
  SELECT_MOVIE,
  DELETE_MOVIE,
  CLEAR_SELECTED,
  CHANGE_NAME,
  CHANGE_DURATION,
  CHANGE_YEAR
} from '../actions/actions.js';
import movieModule from '../movie_module/movie.js';
import {secondsToTimeString, timeStringToSeconds} from '../misc_modules/timeUtils.js'

const defaultName = "";
const defaultYear = "2000";
const defaultDuration = "";

//Apps initial_state
const initial_state = {
  movies: [],
  selectedIndex: null,
  inputName: "",
  inputYear: defaultYear,
  inputDuration: ""
}

//Defines how the state changes when an action is dispatched
export default function movieApp(state = initial_state, action) {
  let movies;

  switch(action.type){
    case ADD_MOVIE:
      //This line was just added for debugging, comment if not necessary
      console.log("ADD!");
      const newMovie = new movieModule.Movie(state.inputName,
                                             parseInt(state.inputYear, 10),
                                             timeStringToSeconds(state.inputDuration));
      movies = state.movies.slice();
      return Object.assign({}, initial_state, {movies: movies.concat(newMovie)});

    case UPDATE_MOVIE:
      //This line was just added for debugging, comment if not necessary
      console.log("UPDATE!");
      movies = state.movies.slice();
      const selectedMovie = movies[action.index];
      selectedMovie.name = state.inputName;
      selectedMovie.year = parseInt(state.inputYear, 10);
      selectedMovie.duration = timeStringToSeconds(state.inputDuration);
      return Object.assign({}, initial_state, {movies: movies});

    case SELECT_MOVIE:
      //This line was just added for debugging, comment if not necessary
      console.log("SELECT");
      return Object.assign({}, state, {selectedIndex: action.index,
                                       inputName: state.movies[action.index].name,
                                       inputYear: state.movies[action.index].year.toString(),
                                       inputDuration: secondsToTimeString(state.movies[action.index].duration)});

    case DELETE_MOVIE:
      //This line was just added for debugging, comment if not necessary
      console.log("DELETE!");
      movies = state.movies.slice();
      movies.splice(action.index, 1);
      return Object.assign({}, initial_state, {movies: movies});

    case CLEAR_SELECTED:
      //This line was just added for debugging, comment if not necessary
      console.log("CLEAR/CANCEL!");
      return Object.assign({}, state, {selectedIndex: null,
                                       inputName: defaultName,
                                       inputYear: defaultYear,
                                       inputDuration: defaultDuration});

    case CHANGE_NAME:
      //This line was just added for debugging, comment if not necessary
      console.log("CHANGE NAME!");
      return Object.assign({}, state, {inputName: action.name})

    case CHANGE_YEAR:
      //This line was just added for debugging, comment if not necessary
      console.log("CHANGE YEAR!");
      return Object.assign({}, state, {inputYear: action.year})

    case CHANGE_DURATION:
      //This line was just added for debugging, comment if not necessary
      console.log("CHANGE DURATION!");
      return Object.assign({}, state, {inputDuration: action.duration})

    default:
      //This line was just added for debugging, comment if not necessary
      console.log("UNKNOWN ACTION!");
      return state;
  }

}
