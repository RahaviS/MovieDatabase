import {createContext} from 'react'

const MovieDbContext = createContext({
  searchResponse: {},
  onTriggerSearchingQuery: () => {},
})

export default MovieDbContext
