import React, { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import './styles/App.css';
import SearchBar from './components/SearchBar';
import RestaurantCard from './components/RestaurantCard';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRestaurants = async (input) => {
    setLoading(true);
    setError(null);

    try {
      if (!input || !input.includes(',')) {
        throw new Error('Please enter input like: Miami, FL');
      }

      const [rawCity, rawState] = input.split(',').map(str => str.trim());

      if (!rawCity || !rawState) {
        throw new Error('Please enter both city and state like: Miami, FL');
      }

      const city = rawCity
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const state = rawState.toUpperCase();

      const fakeData = [
        {
          name: 'Joe’s Pizza',
          address: '123 Main St, Miami, FL',
          phone: '(305) 555-1234'
        },
        {
          name: 'Ocean Diner',
          address: '456 Ocean Ave, Miami, FL',
          phone: '(305) 555-5678'
        }
      ];

      setRestaurants(fakeData);

    } catch (e) {
      setRestaurants([]);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>BiteFinder</h1>
      <SearchBar onSearch={fetchRestaurants} />
      {loading && <p>Loading restaurants...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {restaurants.map((r, index) => (
          <RestaurantCard
            key={`${r.name}-${r.address || r.phone || index}`}
            data={r}
          />
        ))}
      </ul>
    </div>
  );
}

function Detail() {
  const { id } = useParams();
  return (
    <div className="App">
      <h2>Details for {id}</h2>
      <Link to="/">← Back</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
