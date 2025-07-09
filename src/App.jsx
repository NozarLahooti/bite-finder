import { useState } from 'react'
import axios from 'axios'
import './App.css'

export default function App() {
  const[restaurants, setRestaurants] = useState([])

  const fetchRestaurants = async (query) => {
    const options = {
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants',
      params: { locationId: '304554'},
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
      },
    }

  try {
    const response = await axios.request(options)
    setRestaurants(response.data.data || [])
  } catch (error) {
    console.error('Error fetching restaurants:', error)
  }
}

return (
  <div>
    <h1> BiteFinder </h1>
    <SearchBar onSearch={fetchRestaurants} />
    <ul>
      {restaurants.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  </div>
)
}