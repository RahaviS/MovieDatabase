import React from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'

import './index.css'

class Upcoming extends React.Component {
  state = {
    isLoading: true,
    upcomingMovieResponse: {},
  }

  componentDidMount() {
    this.getUpcomingMoviesResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getUpcomingMoviesResponse = async (page = 1) => {
    const apiKey = 'b0df0f206e1d405a64dc38d86300ff8d'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, upcomingMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {upcomingMovieResponse} = this.state
    const {results} = upcomingMovieResponse

    return (
      <ul className="movie-list-container">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, upcomingMovieResponse} = this.state

    return (
      <div className="route-page-body">
        <Navbar />
        <div className="upcoming-contents">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Pagination
          totalPages={upcomingMovieResponse.totalPages}
          apiCallback={this.getUpcomingMoviesResponse}
        />
      </div>
    )
  }
}

export default Upcoming
