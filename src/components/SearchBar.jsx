import React, { useState } from 'react';
import './SearchBar.css';


export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(input) 
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="e.g Miami, FL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}


