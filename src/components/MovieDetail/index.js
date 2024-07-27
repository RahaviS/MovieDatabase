import React from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

class MovieDetail extends React.Component {
  state = {
    isLoading: true,
    movieDetails: [],
    castDetails: [],
  }

  componentDidMount() {
    this.getMovieDetails()
    this.getCastDetails()
  }

  getUpdatedData = responseData => ({
    id: responseData.id,
    backdropPath: responseData.backdrop_path,
    runtime: responseData.runtime,
    title: responseData.title,
    overview: responseData.overview,
    releaseDate: responseData.release_date,
    voteAverage: responseData.vote_average,
    genres: responseData.genres.map(each => ({
      genreId: each.id,
      genreName: each.name,
    })),
  })

  getUpdatedCastData = obj => ({
    cast: obj.cast.map(eachCast => ({
      profilePath: eachCast.profile_path,
      castId: eachCast.cast_id,
      originalName: eachCast.original_name,
      character: eachCast.character,
    })),
  })

  getCastDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiKey = 'b0df0f206e1d405a64dc38d86300ff8d'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const castData = await response.json()
      const castDataString = this.getUpdatedCastData(castData)
      this.setState({isLoading: false, castDetails: castDataString})
    }
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiKey = 'b0df0f206e1d405a64dc38d86300ff8d'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const movieData = this.getUpdatedData(data)
    this.setState({isLoading: false, movieDetails: movieData})
  }

  renderSpinner = () => (
    <Loader type="TailSpin" color="#2196f3" height={50} width={50} />
  )

  renderGenres = () => {
    const {movieDetails} = this.state
    const {genres} = movieDetails
    return (
      <div className="genre-section">
        <p className="genre-text">Genres: </p>
        <ul className="genre-list">
          {genres.map(eachGenre => (
            <li key={eachGenre.genreId} className="genre-item">
              {eachGenre.genreName}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderMovieContents = () => {
    const {movieDetails, castDetails} = this.state
    return (
      <>
        <div className="movie-details-container">
          <h1 className="heading">Movie Details</h1>
          <p className="movie-name">{movieDetails.title}</p>
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movieDetails.backdropPath}`}
            alt={movieDetails.id}
          />
          <p className="overview">{movieDetails.overview}</p>
          <div className="rating-duration">
            <p className="rating">
              <span>Rating: </span> {movieDetails.voteAverage}
            </p>
            <p className="duration">
              <span>Duration: </span>
              {`${movieDetails.runtime} mins`}
            </p>
          </div>
          {this.renderGenres()}
          <p className="release-date">
            <span>Released on: </span>
            {movieDetails.releaseDate}
          </p>
        </div>
        <hr />

        <div className="cast-details-container">
          <h1 className="heading">Cast Details</h1>
          <ul className="cast-list">
            {Object.keys(castDetails).length !== 0 &&
              castDetails.cast.map(eachMember => (
                <li key={eachMember.castId} className="cast-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${eachMember.profilePath}`}
                    alt={eachMember.original_name}
                    className="cast_image"
                  />
                  <p className="original-name">{eachMember.originalName}</p>
                  <p className="character-name">
                    <span>Character: </span>
                    {eachMember.character}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Navbar />
        <div className="movie-contents-cotnainer">
          {isLoading ? this.renderSpinner() : this.renderMovieContents()}
        </div>
      </>
    )
  }
}

export default MovieDetail
