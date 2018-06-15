import axios from 'axios'

const API_KEY = '98bf436f977971'

const getCurrentLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    resolve({ lat: coords.latitude, lon: coords.longitude })
  }, reject)
})

const getCurrentCity = async () => {
  try {
    const { lat, lon } = await getCurrentLocation()
    const { data } = await axios.get(`https://eu1.locationiq.org/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`)

    return data.address.county.replace('City', '')
  } catch (error) {
    console.log(error)

    return null
  }
}

export default {
  getCurrentCity
}
