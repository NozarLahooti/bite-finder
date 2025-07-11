import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('New York');
  }, []);

  const fetch = async (cityName) => {
    try {
      const loc = await axios.get(
        'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation',
        {
          params: { query: cityName },
          headers: {
            'x-rapidapi-key':  import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
          }
        }
      );
      const id = loc.data.data[0]?.locationId;
      const res = await axios.get(
        'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants',
        {
          params: { locationId: id },
          headers: {
            'x-rapidapi-key':  import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
          }
        }
      );
      setRestaurants(res.data.data || []);
    } catch {
      setRestaurants([{ name: 'Mock Sushi', location: 'NY', rating: 4 }]);
    }
  };

  return (
    <div className="App">
      <h1>BiteFinder</h1>
      <SearchBar onSearch={fetch} />
      <ul>
        {restaurants.map((r, i) => (
          <li key={i}>
            <Link to={`/restaurant/${r.locationId || i}`}>
              {r.name} {r.location && `— ${r.location}`}
            </Link>
          </li>
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
