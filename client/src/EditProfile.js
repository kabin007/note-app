import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleEdit = async () => {
    try {
      const userId = 'current_user_id'; // Replace with the actual user ID logic
      await axios.put(`http://localhost:5000/api/users/${userId}`, user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Profile updated');
      navigate('/');
    } catch (err) {
      alert('Error updating profile');
    }
  };

  const handleDelete = async () => {
    try {
      const userId = 'current_user_id'; // Replace with the actual user ID logic
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Account deleted');
      localStorage.removeItem('token');
      navigate('/register');
    } catch (err) {
      alert('Error deleting account');
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <input
        type="text"
        placeholder="New Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="New Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleEdit}>Update Profile</button>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default EditProfile;
