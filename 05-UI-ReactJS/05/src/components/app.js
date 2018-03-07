import React from 'react'
import MovieFormContainer from '../components/movieForm.js'
import MovieListContainer from '../components/movieList.js'

//Renders both the movie list and the movie adding/updating form.
const App = () => {
  return (
    <div>
      <MovieFormContainer />
      <MovieListContainer />
    </div>
  )
}

export default App;
