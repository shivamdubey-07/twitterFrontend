// src/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const Testing = () => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('content', content);
    formData.append('file', file);

    try {
      const response = await axios.post('https://twitterbackend-7nga.onrender.com/api/user/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>File:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default Testing;
