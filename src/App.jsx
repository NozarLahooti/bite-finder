import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetch('New York');
  }, []);

  const fetch = async (cityName) => {
    try {
      
      const options = {
          method: 'GET',
          url: 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/all-city',
          params: { city: cityName },
          headers: {
            headers: {
              'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
              'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST
}


            
  }
};

const response = await axios.request(options);
console.log('API DATA:', response.data);
setRestaurants(response.data);



      
    } catch {
      setRestaurants([{ name: 'Mock Sushi', location: 'NY', rating: 4 }]);
    }
  };

  return (
    <div className="App">
      <h1>BiteFinder</h1>
      <SearchBar onSearch={fetch} />
      {/* <ul>
        {restaurants.map((r, i) => (
          <li key={i}>
            <Link to={`/restaurant/${r.locationId || i}`}>
              {r.name} {r.location && `— ${r.location}`}
            </Link>
          </li>
        ))}
      </ul> */}
      <ul>
        {restaurants.map((r) => (
          <RestaurantCard
            key={`${r.name}-${r.address || r.phone || Math.random()}`}
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
