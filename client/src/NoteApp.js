import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');


  // Fetch notes for the logged-in user
  const fetchNotes = useCallback(async () => {
    setToken(localStorage.getItem('token'));
    console.log('Retrieved token:', token);
    const res = await axios.get('http://localhost:5000/api/notes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);


  //Add note
  const addNote = async () => {
    try {
      // Log the request details for debugging
      console.log('Sending request to add note:', { newNote, token });
  
      const res = await axios.post(
        'http://localhost:5000/api/notes',
        { ...newNote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Log the response for debugging
      console.log('Note added successfully:', res.data);
  
      // Update the notes and reset the input
      setNotes((prevNotes) => [...prevNotes, res.data]);
      setNewNote({ title: '', content: '' });
    } catch (err) {
      // Log full error for debugging
      console.error('Error details:', err);
  
      // Handle specific errors
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error(`Failed to add note: ${err.response.status} - ${err.response.data.message}`);
        if (err.response.status === 401) {
          console.error('Unauthorized: Please check your token or log in again.');
        } else {
          console.error('An error occurred:', err.response.data.message || 'Unknown error');
        }
      } else if (err.request) {
        // Request made but no response received
        console.error('No response received from server:', err.request);
      } else {
        // Other errors
        console.error('Failed to add note:', err.message);
      }
    }
  };
  

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Failed to delete note:', err.response?.data?.message || err.message);
    }
  };

  // Edit a note
  const editNote = async (id) => {
    try {
      const title = prompt('Enter new title');
      const content = prompt('Enter new content');
      const res = await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(notes.map((note) => (note._id === id ? res.data : note)));
    } catch (err) {
      console.error('Failed to edit note:', err.response?.data?.message || err.message);
    }
  };

  // Logout
  const logout = () => {
    setToken('');
    setUser(null);
    setNotes([]);
  };

  return (
    <div>
      {/* Add New Note */}
      <input
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
      />
      <button onClick={addNote}>Add Note</button>

      {/* Display Notes */}
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => editNote(note._id)}>Edit</button>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
};
export default NoteApp;
