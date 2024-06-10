import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import UserCard from "./UserCard";
import axios from "axios";
import Cookies from 'js-cookie';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [follow, setFollow] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    console.log(`${Cookies.get("token")}`, searchQuery);
    try {
      const res = await axios.post(
        "http://localhost:9000/api/user/searchUser",
        { searchQuery: searchQuery },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${Cookies.get("token")}`
          }
        }
      );

      if (res.data) {
        setData(res.data.data);
        setFollow(res.data.follow);
      } else {
        setData("User not found");
      }
    } catch (error) {
      console.error('Error:', error);
      setData("User not found");
    }
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-center p-4">
      <div className="flex items-center bg-black rounded-full shadow-md w-full max-w-md">
        <input
          type="text"
          className="text-white flex-grow p-2 rounded-l-full focus:outline-none bg-black border-2 border-gray-900"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSearch}
          className="bg-gray-900 text-white p-2 rounded-r-full hover:bg-blue-600 focus:outline-none"
        >
          <FaSearch />
        </button>
      </div>
      <div className="w-full">
        {data && typeof data === 'object' && (
          <UserCard
            username={data.username}
            name={data.name}
            profilePicture={data.profilePicture}
            follow={follow}
          />
        )}
        {data && typeof data === 'string' && (
          <div className="text-white">{data}</div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
