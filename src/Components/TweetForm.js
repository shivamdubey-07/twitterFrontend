import React, { useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import axios from 'axios';
import Cookies from 'js-cookie';

const TweetForm = () => {
  const [tweetText, setTweetText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleChange = (event) => {
    const newText = event.target.value;
    const wordCount = newText.split(/\s+/).filter(word => word.length > 0).length;

    if (wordCount <= 300) {
      setTweetText(newText);
    }
  };

  const handleMediaChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
        setSelectedMedia(file);
      console.log('Selected media:', file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting tweet...',selectedMedia);
    submitTweet();
    setTweetText('');
    setSelectedMedia(null);
  };


  const submitTweet = async() => {
    const formData = new FormData();
    formData.append('content', tweetText);
    formData.append('file', selectedMedia);
   const res= await axios.post('http://localhost:9000/api/user/post', formData, {
    headers: {
      'Content-Type':'multipart/form-data',
      Authorization: `${Cookies.get('token')}`
    }
   })
   res.status === 201? alert('Tweet posted successfully') : alert('Error posting tweet');

  };

  const wordCount = tweetText.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className='relative'>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '4px' }}>
        <img src="x.png" width="20px" height="20px" alt='logo' />
      </div>

      <form onSubmit={handleSubmit} className="text-white flex flex-col items-center space-y-4">
        <textarea
          value={tweetText}
          onChange={handleChange}
          placeholder="What's happening?"
          className="w-full h-32 px-4 py-2 border-b-2 bg-black border-gray-900 focus:outline-none"
        />
        <div className="w-full flex justify-between items-center px-4">
          <p className="text-gray-500">{wordCount} / 300 words</p>
        </div>

        <div className="w-20 flex items-center justify-center space-x-4 absolute right-0 bottom-0">
          <input
            type="file"
            id="media-upload"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="media-upload" className="cursor-pointer">
            <MdDriveFolderUpload className="text-4xl text-blue-500 hover:text-blue-700" />
          </label>
          {selectedMedia && (
            <p className="text-gray-500">{selectedMedia.type.startsWith('image/') ? 'Image' : 'Video'} selected: {selectedMedia.name}</p>
          )}
        </div>

        <button type="submit" className="bg-blue-500 absolute left-32 w-36 top-36 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Post
        </button>
       
      </form>

      <div className='border-b-2 bg-black border-gray-900 w-full mt-5' > </div>
    </div>
  );
};

export default TweetForm;