import React, { useState } from 'react';
import axios from 'axios';

const PathSet = () => {
  const [path, setPath] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setPath(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/set-directory', { path });
      if (response && response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        throw new Error('Unexpected response from the server');
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Set Directory Path</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Directory Path:
          <input type="text" value={path} onChange={handleChange} />
        </label>
        <button type="submit">Set Directory</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PathSet;
