import { useState, useEffect } from 'react'
import { read } from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    read().then(data => {
      setCountries(data.sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common)))
    }).catch(console.error)
  }, [])

  const handleFilter = ({ target }) => {
    setFilter(target.value)
  }

  const matchFilter = country => {
    if (country.name.common.toLowerCase().includes(filter.toLowerCase())) console.log(country)
    return country.name.common.toLowerCase().includes(filter.toLowerCase())
  }

  const filteredCountries = countries.filter(matchFilter)
  console.log(filteredCountries.length)

  return <div>
    <Filter filter={filter} handleChange={handleFilter} />
    <Countries filter={filter} countries={filteredCountries} />
  </div>
}

export default App
