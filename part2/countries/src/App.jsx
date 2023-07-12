import { useState, useEffect } from 'react'
import { countriesApi } from './services/apis'
import Countries from './components/Countries'
import Filter from './components/Filter'
import Weather from './components/Weather'

const App = () => {
  const [filter, setFilter] = useState('')
  const [exact, setExact] = useState(false)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesApi().then(data => {
      setCountries(data.sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common)))
    }).catch(console.error)
  }, [])

  const handleFilter = ({ target }) => {
    setExact(false)
    setFilter(target.value)
  }

  const matchFilter = country => {
    return exact
      ? country.name.common.toLowerCase() === filter.toLowerCase()
      : country.name.common.toLowerCase().includes(filter.toLowerCase())
  }

  const handleCountry = country => {
    setExact(true)
    setFilter(country)
  }

  const filtered = countries.filter(matchFilter)
  console.log(process.env.REACT_APP_OPEN_WEATHER_KEY)

  return <div>
    <Filter filter={filter} handleChange={handleFilter} />
    <Countries
      filter={filter}
      countries={filtered}
      handleCountry={handleCountry}
    />
    {filtered.length === 1 ? <Weather country={filtered[0]} /> : null }
  </div>
}

export default App
