import Country from './Country'

const Countries = ({ filter, countries, handleCountry }) => {
  if (!filter || (countries.length === 0)) {
    return null
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length > 1) {
    return countries.map(country => <p key={country.name.common}>
      {country.name.common}&nbsp;
      <button onClick={() => handleCountry(country.name.common)}>show</button>
    </p>)
  }

  return <Country data={countries[0]} />
}

export default Countries
