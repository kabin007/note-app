import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Make the API call to register the user
      const response = await axios.post('http://localhost:5000/api/register', user);
      if (response.status === 201) { // Assuming a successful registration returns status 201
        alert('Registration successful!');
        navigate('/login'); // Redirect to login page
      }
    } catch (err) {
      // Handle errors from the backend
      if (err.response && err.response.data.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        console.error(err);
        alert('Error registering user. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
