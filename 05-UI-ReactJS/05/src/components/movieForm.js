import React from 'react'
import {connect} from 'react-redux';
import {addMovie,
        updateMovie,
        clearSelected,
        changeName,
        changeYear,
        changeDuration
} from '../actions/actions.js'
import {timeStringToSeconds} from '../misc_modules/timeUtils.js'

//Used constants
const formInputClass = "new-movie-input";
const formButtonClass = "new-movie-button";
const formElementContainer = "new-movie-form-element";
const movieForm = "new-movie-form";
const nameInput = "new-movie-name";
const yearInput = "new-movie-year";
const durationInput = "new-movie-duration";


//Text area component for movie name input
class MovieTextArea extends React.Component {

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
          onChange={(event) => {this.props.onChange(event.target.value)}}
          required={this.props.required}>
        </textarea>

      </div>
    )
  }
}

//Input component for movie year and duration input (it can be cast on any of them)
class MovieInput extends React.Component {

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
          onChange={(event) => {this.props.onChange(event.target.value)}}
          step={this.props.step ? this.props.step : null}
          required={this.props.required}>
        </input>

      </div>
    )
  }
}

//Contains the input components of the movie input form
class MovieInputContainer extends React.Component {

  render() {
    return (
      <div className="data-input-area">

        <MovieTextArea
          label="Name: "
          id={nameInput}
          className={formInputClass}
          cols=""
          value = {this.props.nameValue}
          onChange={this.props.onChangeName}
          placeholder="Movie name"
          required="true"/>

        <MovieInput
          label="Release year: "
          id={yearInput}
          type="number"
          className={formInputClass}
          value = {this.props.yearValue}
          onChange={this.props.onChangeYear}
          required="true"/>

        <MovieInput
          label="Duration: "
          id={durationInput}
          className={formInputClass}
          value ={this.props.durationValue}
          onChange={this.props.onChangeDuration}
          type="time"
          step="1"
          required="true"/>

        </div>
      )
    }
}


//Contains the buttons of the movie input form.
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


//Form component. Captures user input and triggers submit and reset events.
class MovieForm extends React.Component {

  render() {

    return (
      <form
        className={movieForm}
        onSubmit= {(e) => {
          e.preventDefault();
          this.props.onSubmit(this.props.selectedIndex);
        }}
        onReset= {() => {this.props.onReset()}}>

        <MovieInputContainer
          onChangeName = {this.props.onChangeName}
          onChangeYear = {this.props.onChangeYear}
          onChangeDuration = {this.props.onChangeDuration}
          nameValue={this.props.name}
          yearValue={this.props.year}
          durationValue={this.props.duration} />

        <MovieInputButtonsContainer
          acceptLabel = {this.props.selectedIndex == null ? "ADD" : "UPDATE"}
          cancelLabel = {this.props.selectedIndex == null ? "CLEAR" : "CANCEL"} />

      </form>
    )
  }
}

//Maps state values to MovieForm component props
const mapStateToProps = state => {
  return {
    movies: state.movies,
    selectedIndex: state.selectedIndex,
    name: state.inputName,
    year: state.inputYear,
    duration: state.inputDuration
  }
}

//Maps action dispatching to MovieForm props
const mapDispatchToProps = dispatch => {
  return {
    onReset: () => {
      dispatch(clearSelected())
    },
    onSubmit: (index, name, year, duration) => {
      if(index == null) {
        dispatch(addMovie(name,
                          parseInt(year, 10),
                          timeStringToSeconds(duration)));
      } else {
        dispatch(updateMovie(index, name,
                             parseInt(year, 10),
                             timeStringToSeconds(duration)));
      }
    },
    onChangeName: (name) => {
      dispatch(changeName(name))
    },
    onChangeYear: (year) => {
      dispatch(changeYear(year))
    },
    onChangeDuration: (duration) => {
      dispatch(changeDuration(duration))
    }
  }
}

//Allows MovieForm to use redux by using connect with the defined mappers.
const MovieFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieForm);

export default MovieFormContainer;
