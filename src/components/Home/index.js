import React from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'
import './index.css'

class Home extends React.Component {
  state = {
    isLoading: true,
    popularMovieResponse: {},
  }

  componentDidMount() {
    this.getPopularMoviesResponse()
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

  getPopularMoviesResponse = async (page = 1) => {
    const apiKey = 'b0df0f206e1d405a64dc38d86300ff8d'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, popularMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {popularMovieResponse} = this.state
    const {results} = popularMovieResponse

    return (
      <ul className="movies-list">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovieResponse} = this.state

    return (
      <div className="route-page-body">
        <Navbar />
        <div className="home-contents">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Pagination
          totalPages={popularMovieResponse.totalPages}
          apiCallback={this.getPopularMoviesResponse}
        />
      </div>
    )
  }
}

export default Home