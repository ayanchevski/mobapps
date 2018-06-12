const axios = require('axios')
const apiKey = '398e596d110a43dab70193353181106'

const getCurrentWeather = async city => {
  const url = 'https://api.apixu.com/v1/current.json?key=' + apiKey + '&q=' + city

  try {
    const { data } = await axios.get(url)

    return data
  } catch (err) {
    return null
  }
}

const getForecastWeather = async (city, days = 5) => {
  const url = 'https://api.apixu.com/v1/forecast.json?key=' + apiKey + '&q=' + city + '&days=' + days

  try {
    const { data } = await axios.get(url)

    return data
  } catch (err) {
    return null
  }
}

export default {
  getCurrentWeather,
  getForecastWeather
}
