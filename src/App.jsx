import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';

export default function App() {
  const [restaurants, setRestaurants] = useState([]);

  
  const fetchRestaurants = async (cityName) => {
    try {
      
      const locationResponse = await axios.get(
        'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation',
        {
          params: { query: cityName },
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
          },
        }
      );
      const locations = locationResponse.data.data;
      if (!locations?.length || !locations[0].locationId) {
        throw new Error('City not found');
      }
      const locationId = locations[0].locationId;

      
      const restaurantResponse = await axios.get(
        'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants',
        {
          params: { locationId },
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
          },
        }
      );
      setRestaurants(restaurantResponse.data.data || []);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      
      setRestaurants([
        { name: 'Mock Sushi Place', location: 'New York', rating: 4.5 },
        { name: 'Mock Pasta House', location: 'New York', rating: 4.3 },
        { name: 'Mock Burger Joint', location: 'New York', rating: 4.1 },
      ]);
    }
  };

  
  useEffect(() => {
    fetchRestaurants('New York');
  }, []);

  return (
    <div className="App">
      <h1>BiteFinder</h1>
      <SearchBar onSearch={fetchRestaurants} />
      <ul>
        {restaurants.map((item, i) => (
          <li key={i}>
            <span>{item.name}</span>
            {item.location && ` — ${item.location}`}
            {item.rating && ` (⭐ ${item.rating})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
