import axios from 'axios'


let base_api_url= ``

if(import.meta.env.DEV)
    base_api_url = 'http://127.0.0.1:5000'
else
    base_api_url = 'https://megasense-server.cs.helsinki.fi/fwowebserver'

const dataApi = `${base_api_url}/api/data`

const getDataFromFlask = async () => {
    console.log('GET - request to flask')
    console.log(dataApi)
    const result = await axios.get(dataApi)
    console.log(result)
    return result
}

const getOccupancyOfRestaurantsByHour = async () => {
    console.log(base_api_url)
    const result = await axios.get(`${base_api_url}/data/occupancy`)
    console.log('getOccupancyOfRestaurantsByHour: ', result)
    return result
}

const getBiowastePrediction = async () => {
    const result = await axios.get(`${base_api_url}/data/biowaste`)
    console.log('getBiowastePrediction: ', result)
    return result
}

export default {
    getDataFromFlask,
    getOccupancyOfRestaurantsByHour,
    getBiowastePrediction
}