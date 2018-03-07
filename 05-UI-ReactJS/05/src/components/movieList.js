import React from 'react';
import {connect} from 'react-redux';
import {deleteMovie, selectMovie} from '../actions/actions.js';
import {secondsToTimeString} from '../misc_modules/timeUtils.js';

const movieView = "movie-view";
const movieList = "movie-list";
const movieData = "movie-data";
const movieButtons = "movie-button-area";


//Renders a particular movie on the list.
class MovieView extends React.Component {

  render () {
    return (
      <div className={movieView}>

        <div className={movieData}>
          <p> <span>{this.props.name}</span> </p>
          <p> YEAR: <span>{this.props.year}</span> </p>
          <p> DURATION: <span>{this.props.duration}</span> </p>
        </div>

        <div className={movieButtons}>
          <button onClick={this.props.onDeleteClick}> </button>
        </div>

        <hr />

      </div>
    )
  }
}

//Renders favorite movies list.
class MovieList extends React.Component {

  render() {
    return (
      <div className={movieList}>

        <h3>MY FAVORITE MOVIES LIST</h3>
        <hr />

        <ul>
          {this.props.movies.map( (movie, index) => {
            return (
              <li key={index}
                className={index === this.props.selectedIndex ? "selected-movie" : null}
                onClick={() => {this.props.onSelectClick(index)}}>
                <MovieView
                  index = {index}
                  name = {movie.name}
                  year = {movie.year.toString()}
                  duration = {secondsToTimeString(movie.duration)}
                  onDeleteClick = {(event) => {
                    event.stopPropagation();
                    this.props.onDeleteClick(index);}} />
                </li>
            )
          })}
        </ul>

      </div>
    )
  }
}

//Maps state values to MovieList props
const mapStateToProps = state => {
  return {
    movies: state.movies,
    selectedIndex: state.selectedIndex
  }
}

//Maps action dispatching to MovieList props
const mapDispatchToProps = dispatch => {
  return {
    onDeleteClick: index => {
      dispatch(deleteMovie(index))
    },
    onSelectClick: index => {
      dispatch(selectMovie(index))
    }
  }
}

//Allows MovieForm to use redux by using connect with the defined mappers.
const MovieListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
) (MovieList);

export default MovieListContainer;
