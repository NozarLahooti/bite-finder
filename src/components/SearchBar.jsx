import React, { useState } from 'react'

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
        placeholder="Type anything to test"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}


