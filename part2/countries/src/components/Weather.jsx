import { useState, useEffect } from 'react'
import { openMeteoApi } from '../services/apis'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    openMeteoApi(country.latlng[0], country.latlng[1]).then(data => {
      setWeather(data)
    })
  }, [country.latlng])

  return <>
    <h2>Weather in {country.capital[0]}</h2>
    <p>temperature {weather?.temp} Celsius</p>
    {weather?.icon ? <img src={weather.icon} alt={weather?.desc} title={weather?.desc} /> : null}
    <p>wind {weather?.wind} m/s</p>
  </>
}

export default Weather
