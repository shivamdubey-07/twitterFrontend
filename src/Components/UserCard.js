import React, { useState, useEffect } from 'react';
import './userCard.css';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function UserCard({ username, name, profilePicture, follow }) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(follow);
  }, [follow]);

  const handleFollowClick = async () => {
    const newFollowStatus = !isFollowing;
    setIsFollowing(newFollowStatus);

    const formData = new FormData();
    formData.append('first', username);
    try {
      const url = newFollowStatus
        ? 'https://twitterbackend-7nga.onrender.com/api/user/follow'
        : 'https://twitterbackend-7nga.onrender.com/api/user/unfollow';
      const res = await axios.patch(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${Cookies.get('token')}`
        }
      });
     
      if (res.status === 200) {
        window.location.reload()
        alert(newFollowStatus ? 'User followed successfully' : 'User unfollowed successfully');
      } else {
        alert('Error updating follow status');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating follow status');
    }
  };

  return (
    <div className="user-card">
      <div className="user-card__profile-picture">
        <img src={profilePicture} alt="Profile" />
      </div>
      <div className="user-card__info">
        <div className="user-card__username">{username}</div>
        <div className="user-card__name">{name}</div>
        <button className="user-card__follow-button" onClick={handleFollowClick}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
