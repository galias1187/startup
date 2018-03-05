
//Imports necesary modules
import React from 'react'
import ReactDOM from 'react-dom'
import movieModule from './movie_module/movie.js'
import {timeStringToSeconds, secondsToTimeString} from './misc_modules/timeUtils.js'
import './index.css'


//Defines some constanst (to avoid using hardcoded values)
const nameInput = "new-movie-name";
const yearInput = "new-movie-year";
const durationInput = "new-movie-duration";
const formInputClass = "new-movie-input";
const formButtonClass = "new-movie-button";
const formElementContainer = "new-movie-form-element";
const movieForm = "new-movie-form";
const movieView = "movie-view";
const movieList = "movie-list";
const movieData = "movie-data";
const movieButtons = "movie-button-area";
const defaultYear = "2000";
const actionSelect = "select";
const actionDelete = "delete";

//Changed from function to class due to handleChange method implementation
class MovieTextArea extends React.Component {

  //Constructor is now needed (component has no state at all)

  //Handles a changes on the textarea component
  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className={formElementContainer}>

        <label htmlFor={this.props.id}>
          {this.props.label}
        </label>

        <textarea
          key={this.props.id}
          id={this.props.id}
          className={this.props.className}
          placeholder={this.props.placeholder}
          cols={this.props.cols}
          value={this.props.value}
          onChange={(event) => this.handleChange(event)}
          required={this.props.required}>
        </textarea>

      </div>
    )
  }
}

//Changed from function to class due to handleChange method implementation
class MovieInput extends React.Component {

  //Constructor is now needed (component has no state at all)

  //Handles a changes on the input component
  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
  return (
    <div className={formElementContainer}>

      <label htmlFor={this.props.id}>
        {this.props.label}
      </label>

      <input
          key={this.props.id}
          id={this.props.id}
          className={this.props.className}
          type={this.props.type}
          value={this.props.value}
          step={this.props.step ? this.props.step : null}
          onChange={(event) => {this.handleChange(event)}}
          required={this.props.required}>
      </input>

    </div>
  ) }
}

//Input elements container is now a separate component
function MovieInputContainer(props) {

  return (
    <div className="data-input-area">

      <MovieTextArea
        label="Name: "
        id={nameInput}
        className={formInputClass}
        cols=""
        value = {props.name}
        placeholder="Movie name"
        onChange={props.onNameChange}
        required="true" />

      <MovieInput
        label="Release year: "
        id={yearInput}
        type="number"
        className={formInputClass}
        value = {props.year}
        onChange={props.onYearChange}
        required="true" />

      <MovieInput
        label="Duration: "
        id={durationInput}
        className={formInputClass}
        value ={props.duration}
        type="time"
        step="1"
        onChange={props.onDurationChange}
        required="true" />

    </div>
  )
}

//Input buttons container is now a separate component
function MovieInputButtonsContainer(props) {

  return (
    <div className="button-area">
      <button type="submit" className={formButtonClass}>
        {props.acceptLabel}
      </button>
      <button type="reset" className={formButtonClass}>
        {props.cancelLabel}
      </button>
    </div>
  )
}

//This component renders a complete form to create new movies or update existing ones
class NewMovieForm extends React.Component {

  //Constructor sets initial state.
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      year: defaultYear,
      duration: "",
    }
  }

  nameChanged(value) {
    this.props.onInput(nameInput, value);

    this.setState({
      name: value,
      year: this.props.updateMode ? this.props.movie.year.toString() :
                                    this.state.year,
      duration: this.props.updateMode ?
                secondsToTimeString(this.props.movie.duration) :
                this.state.duration
    })
  }

  yearChanged(value) {
    this.props.onInput(yearInput, value);

    this.setState({
      name: this.props.updateMode ? this.props.movie.name : this.state.name,
      year: value,
      duration: this.props.updateMode ?
                secondsToTimeString(this.props.movie.duration) :
                this.state.duration
    })
  }

  durationChanged(value) {
    this.props.onInput(durationInput, value);

    this.setState({
      name: this.props.updateMode ? this.props.movie.name : this.state.name,
      year: this.props.updateMode ? this.props.movie.year.toString() :
                                    this.state.year,
      duration: value
    })
  }

  handleSubmit(event) {
    //Prevents page reloading when submit is called.
    event.preventDefault();
    event.stopPropagation();

    this.props.onSubmit();
    this.handleReset();
  }

  //Handles reset event. Clears this form and calls parent for clearing its state.
  handleReset() {
    this.setState({
      name: "",
      year: defaultYear,
      duration: ""
    })

    this.props.onReset();
  }

  //Renders the new movie form.
  render() {

    let name = this.state.name;
    let year = this.state.year;
    let duration = this.state.duration;

    //If update mode was activated renders forms with the selected movie data
    if(this.props.updateMode && this.props.movie) {
      name = this.props.movie.name;
      year = this.props.movie.year.toString();
      duration = secondsToTimeString(this.props.movie.duration)
    }

    return (
      <form
        className={movieForm}
        onSubmit= {this.handleSubmit.bind(this)}
        onReset= {this.handleReset.bind(this)}>

        <MovieInputContainer
          onNameChange = {this.nameChanged.bind(this)}
          onYearChange = {this.yearChanged.bind(this)}
          onDurationChange = {this.durationChanged.bind(this)}
          name = {name}
          year = {year}
          duration = {duration} />

        <MovieInputButtonsContainer
          acceptLabel = {this.props.acceptLabel}
          cancelLabel = {this.props.cancelLabel} />

      </form>
    )
  }
}

//Had to add a handleClick function. The function was replaced by a class
class MovieView extends React.Component {

  /*Important: This handler uses event.stopPropagation to avoid click propagate
  to parent li element which is also clickable*/
  handleClick(event) {
    event.stopPropagation();
    this.props.onClick(this.props.index, actionDelete);
  }

  render() {

    //Movie view structure was changed to hold a delete button.
    return (
      <div className={movieView}>

        <div className={movieData}>
          <p> <span>{this.props.name}</span> </p>
          <p> YEAR: <span>{this.props.year}</span> </p>
          <p> DURATION: <span>{secondsToTimeString(this.props.duration)}</span> </p>
        </div>

        <div className={movieButtons}>
          <button onClick={(event) => this.handleClick(event)}> </button>
        </div>

      <hr />

    </div>
    )
  }

}

//Renders the movie list, it will be filled when the users adds new movies.
class MovieList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      deleteClicked: false
    }
  }

  //Handles li element click event (it could be either select or delete)
  handleClick(index, action) {
    switch(action) {
      case actionSelect:
        this.props.onSelect(index);
        break;
      case actionDelete:
        this.props.onDelete(index);
        break;
      default:
        break;
    }
  }

  /*Renders a single movie, key is a unique id required on arrays or iterators
  of react components*/
  renderMovie(movie, key) {
    const className = this.props.selectedIndex === key ? "selected-movie" : null;

    //li element was added an onClick handler to select a movie from list.
    return (
      <li key={key}
        className={className}
        onClick={() => this.handleClick(key, actionSelect)}>
        <MovieView
          index = {key}
          name = {movie.name}
          year = {movie.year}
          duration = {movie.duration}
          onClick = {this.handleClick.bind(this)} />
      </li>
    )
  }

  //Renders the movie list
  render() {
    let key = 0;

    //Renders a movie component for each movie in this component's movies prop.
    const movies = this.props.movies.map((movie) => {
      return this.renderMovie(movie, key++);
    });

    return (
      <div className={movieList}>
        <h3>MY FAVORITE MOVIES LIST</h3>
        <hr />
        <ul> {movies} </ul>
      </div>
    )
  }
}


//Renders both the movie list and the movie adding/updating form.
class MovieApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //This array will contain all user added movies.
      movies: [],
      selected: null,

      //This object updates on data input and is used to create the new movies.
      newMovieData: {
        name: null,
        year: defaultYear,
        duration: null
      },

      //Activates when edit is toggled on
      editJustToggled: false
    }
  }

  //If its posible (valid inputs) creates a new movie and adds it to the list.
  handleSubmit() {
    if(!this.state.newMovieData.name || !this.state.newMovieData.duration) {
       return;
    }
    const newMovieData = this.state.newMovieData;

    if(this.state.selected != null) {

      //This block handles updating
      const movies = this.state.movies.slice();
      const selectedMovie = movies[this.state.selected];

      selectedMovie.name = newMovieData.name;
      selectedMovie.year = parseInt(newMovieData.year, 10);
      selectedMovie.duration = timeStringToSeconds(newMovieData.duration);

      this.setState({
        movies: movies
      })
    } else {

      //This block handles adding
      const year = parseInt(newMovieData.year, 10);
      const duration = timeStringToSeconds(newMovieData.duration)
      const newMovie = new movieModule.Movie(newMovieData.name, year, duration);

      //Inserts the new movie into the copied array and finally updates state.
      this.setState({
        movies: this.state.movies.concat(newMovie)
      })
    }

    //Resets new movie data.
    this.handleReset();

  }

  //Updates new movie data when user inputs data on the form.
  handleInput(field, value) {

    //Copies previous state data
    const newMovieData = Object.assign({}, this.state.newMovieData);

    //Depending on which field was passed a particular newMovieData attribute is updated.
    switch(field) {
      case nameInput:
        newMovieData.name = value;
        break;
      case yearInput:
        newMovieData.year = value;
        break;
      case durationInput:
        newMovieData.duration = value;
        break;
      default:
        break;
    }

    //New state is set
    this.setState({
      newMovieData: newMovieData,
      editJustToggled: false
    })

  }

  //Handles form reset action.
  handleReset() {

    //Resets current's state (just form and selection, not movie list)
    this.setState({
      newMovieData: {
        name: null,
        year: defaultYear,
        duration: null
      },
      selected: null,
      editJustToggled: false
    });
  }

  //Saves selection of a movie in a list in this component's state.
  handleSelect(i) {
    const newMovieData = {
      name: this.state.movies[i].name,
      year: this.state.movies[i].year.toString(),
      duration: secondsToTimeString(this.state.movies[i].duration)
    }

    this.setState({
      selected: i,
      newMovieData: newMovieData,
      editJustToggled: true
    })
  }

  handleDelete(i) {
    const movies = this.state.movies.slice();
    movies.splice(i, 1);

    /*Repeats some handleReset code but avoids calling two times setState which
    means rendering two times*/
    this.setState({
      movies: movies,
      newMovieData: {
        name: null,
        year: defaultYear,
        duration: null
      },
      selected: null,
      editJustToggled: false
    })
  }

  /*Using .bind() in local handleInput can be invoked on child element
  this --> handleInput(field, value) */
  render() {

    const acceptLabel = this.state.selected != null ? "UPDATE" : "ADD";
    const cancelLabel = this.state.selected != null ? "CANCEL" : "CLEAR";
    const selectedMovie = this.state.selected != null ? this.state.movies[this.state.selected] : null;

    return (
      <div>
        <NewMovieForm
          onSubmit = {this.handleSubmit.bind(this)}
          onReset = {this.handleReset.bind(this)}
          onInput = {this.handleInput.bind(this)}
          acceptLabel = {acceptLabel}
          cancelLabel = {cancelLabel}
          updateMode = {this.state.editJustToggled}
          movie = {selectedMovie}/>
        <MovieList movies={this.state.movies}
          onSelect = {this.handleSelect.bind(this)}
          onDelete = {this.handleDelete.bind(this)}
          selectedIndex = {this.state.selected}/>
      </div>
    )
  }

}


// =============================

ReactDOM.render(
  <MovieApp />,
  document.getElementById('root')
)
