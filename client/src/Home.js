import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import NoteApp from './NoteApp';
import './home.css';

const Home = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username'); // Retrieve the username from localStorage
        if (storedUsername) {
          setUsername(storedUsername); // Set the username in the state
        } else {
          // If no user is logged in, redirect to login page
          navigate('/login');
        }
      }, [navigate]);
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
            <button onClick={handleLogout}>Logout</button>
            <h1>Welcome to NoteApp, {username}</h1>
            <NoteApp />
        </div>
    );
};

export default Home;
