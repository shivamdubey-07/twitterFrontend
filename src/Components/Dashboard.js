import React, { useRef, useState, useEffect} from "react";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import SearchComponent from './Search.js'
import TweetForm from "./TweetForm";
import PostCard from "./PostCard";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const tweetFormRef = useRef(null);
  const [posts, setPosts] = useState([]); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        tweetFormRef.current.scrollIntoView({ behavior: "smooth" });
        console.log(Cookies.get("token"));
        const response = await axios.get("http://localhost:9000/api/user/allFollowingPosts", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${Cookies.get("token")}`, 
          },
        });
        let result = Object.values(response.data).flat();
        console.log("result",result);
        setPosts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePostClick = () => {
    tweetFormRef.current.scrollIntoView({ behavior: "smooth" });
    // Focus the text area inside TweetForm
    setTimeout(() => {
      tweetFormRef.current.querySelector("textarea").focus();
    }, 500);
  };
  const logout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="flex bg-black">
      <div className="bg-black w-3/12 h-screen relative border-r border-gray-900">
        <div className="absolute inset-0 flex flex-col items-center space-y-10 pt-20">
          <div className="flex justify-center items-center text-white space-x-2 text-2xl hover:text-blue-100 hover:bg-gray-800 p-4 rounded-lg transition-all">
            <span className="hover:scale-110 transition-transform">
              <IoMdHome />
            </span>
            <span onClick={()=>{window.location.reload()}} className="hover:scale-110 transition-transform">Home</span>
          </div>
          <div className="flex justify-center items-center text-white space-x-2 text-2xl hover:text-blue-100 hover:bg-gray-800 p-4 rounded-lg transition-all">
            <span className="hover:scale-110 transition-transform">
              <FaUser />
            </span>
            <span onClick={()=>{navigate('/profile')}} className="hover:scale-110 transition-transform">Profile</span>
          </div>
          <div className="absolute bottom-28 w-4/6 left-1/3">
            <span className="w-5/6">
              <button className="w-5/6" onClick={handlePostClick}>Post</button>
            </span>
          </div>
          <div className="absolute bottom-10 flex justify-center items-center text-white space-x-2 text-2xl hover:text-blue-500 hover:bg-gray-800 p-4 rounded-lg transition-all">
            <span className="hover:scale-110 transition-transform">
              <IoLogOut />
            </span>
            <span onClick={logout} className="hover:scale-110 transition-transform">Log out</span>
          </div>
        </div>
      </div>

      <div className="w-6/12 flex flex-col overflow-y-auto bg-black h-screen">
        <div ref={tweetFormRef}>
          <TweetForm />
        </div>
        <div className="bg-black w-full h-full">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard username={post.username} media={post.media} content={post.content} time={post.createdAt} profilePicture={post.profilePicture} name={post.name} />
              
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
      <div className="w-3/12 flex flex-col  bg-black h-screen">
        < SearchComponent></SearchComponent>
      </div>
    </div>
  );
}
