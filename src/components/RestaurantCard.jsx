import React from 'react';

export default function RestaurantCard({ data }) {
  return (
    <li style={{ border: '1px solid #ccc', margin: '8px', padding: '8px' }}>
      <h3>{data.name}</h3>
      <p>{data.address}</p>
      <p>{data.phone}</p>
    </li>
  );
}
