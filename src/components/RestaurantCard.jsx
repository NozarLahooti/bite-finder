import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantCard.css';   

export default function RestaurantCard({ data }) {
  // console.log('Card Data:', data)
  const { name, phone, address, rating } = data;

  return (
  <li className="restaurant-card">
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </li>
);
}














//     return (
//     <li className="restaurant-card">
//       <Link to={`/restaurant/${name}`} className="card-link">
//         <h3 className="card-name">{name}</h3>
//         {address && <p className="card-location">{address}</p>}
//         {rating && <p className="card-rating">⭐ {rating}</p>}
//         {phone && <p className="card-phone">📞 {phone}</p>}
//       </Link>
//     </li>
//   );
// }