import {Link, withRouter} from 'react-router-dom'
import MovieDbContext from '../../context/MovieDbContext'

import './index.css'

const Navbar = props => {
  const renderSearchBar = () => (
    <MovieDbContext.Consumer>
      {value => {
        const {onTriggerSearchingQuery, onChangeSearchInput} = value
        const {searchInput} = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className="search-section">
            <input
              type="text"
              className="search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search for Movies"
            />
            <button
              className="search-btn"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </MovieDbContext.Consumer>
  )

  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <h1 className="page-logo">movieDB</h1>
      </div>
      <div className="nav-menu-container">
        <ul className="nav-items-list">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Popular
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/top-rated">
              Top Rated
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/upcoming">
              Upcoming
            </Link>
          </li>
        </ul>
        {renderSearchBar()}
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
