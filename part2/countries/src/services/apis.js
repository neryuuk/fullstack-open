import axios from 'axios'

export const countriesApi = () => {
  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  return axios.get(url).then(({ data }) => data)
}

export const openMeteoApi = (lat, lng) => {
  const url = (lat, lng) => `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&windspeed_unit=ms`
  return axios.get(url(lat, lng)).then(({ data }) => {
    return {
      temp: data?.current_weather?.temperature,
      wind: data?.current_weather?.windspeed,
      desc: null,
      icon: null
    }
  })
}

export const openWeatherApi = (lat, lng) => {
  const url = (lat, lng) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`
  return axios.get(url(lat, lng)).then(({ data }) => {
    const { icon, description } = data?.weather[0]
    return {
      temp: data?.main?.temp,
      wind: data?.wind?.speed,
      desc: (icon && description) ? description : null,
      icon: (icon) ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null
    }
  })
}
