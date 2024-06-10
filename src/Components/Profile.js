import Sidebar from "./Sidebar"
import{useState,useEffect} from "react"
import PostCard from "./PostCard";
import axios from "axios";
import Cookies from "js-cookie";
import  './Profile.css'
import { Navigate, useNavigate } from "react-router-dom";
import { MdDriveFolderUpload } from 'react-icons/md';
import { IoArrowBackCircleSharp } from "react-icons/io5";


export const Profile = () => {
  const [post, setPost] = useState([]); 
  const [toggle,setToggle]=useState(false)
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  // const [location, setLocation] = useState('');
  const [selectedMedia,setSelectedMedia]=useState(null)
  const navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(Cookies.get("token"));
        const response = await axios.get("https://twitterbackend-7nga.onrender.com/api/user/myProfile", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${Cookies.get("token")}`, // Add Bearer before token
          },
        });
        let result=response.data[0];
        console.log("result",result);
        
        setPost(result);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const togglehandle=(e)=>{
     setToggle(!toggle)
     console.log(toggle)
  }
  const handleChange = (event) => {
    const { name: fieldName, value } = event.target;
    if (fieldName === 'name') setName(value);
   
    if (fieldName === 'bio') setBio(value);
    // if (fieldName === 'location') setLocation(value);

};

const handleMediaChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    
      setSelectedMedia(file);
   
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    name !==''?formData.append('name', name):setName()
    bio !==''?formData.append('bio', bio):setBio('')
    selectedMedia !==null?formData.append('file', selectedMedia):setSelectedMedia(null)
   
    //  console.log(Cookies.get('token'),"yaha tk nhi pahuch ppa rha hai")
      const response = await axios.patch("https://twitterbackend-7nga.onrender.com/api/user/profileUpdate", formData,{
        headers: {
          'Content-Type':'multipart/form-data',
          "Authorization": `${Cookies.get("token")}`, // Add Bearer before token
        },
      });

      const data = await response.message;
     console.log(data)
     window.location.reload()
  

  } catch (error) {
      alert("An error occured");
      console.error('Error:', error);
  }
};


// html yaha se hai
   return (
<div>

{toggle && (
                <div className="form-div w-1/2 h-5/6 flex flex-col justify-center items-center bg-black overflow-y-auto">
                   
                    <button className="cut-btn1" onClick={togglehandle}>x</button>
                    <img className="absolute w-10 h-10 left-1/2 top-2" src="x.png" alt="logo" />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 mt-12">
                        <h1 className="text-4xl text-white">Update Profile</h1>
                        <input
                            className="p-2 rounded-md mt-14"
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <input
                            className="p-2 rounded-md mt-14"
                            type="text"
                            name="bio"
                            value={bio}
                            onChange={handleChange}
                            placeholder="Bio"
                        />
                        {/* <input
                            className="p-2 rounded-md mt-4"
                            type="text"
                            name="location"
                            value={location}
                            onChange={handleChange}
                            placeholder="Location"
                        /> */}
                        <span className="text-white mt-4">Choose Profile Photo</span>
                        <div >
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
                        
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}

     {!toggle && (<div className="relative bg-black h-screen text-white">
       {/* Top image */}
       <div className="h-60">
         <img
           src="ytb.png"
           alt="Top Image"
           className="w-full h-full object-cover"
         />
       </div>
 
       {/* Bottom left image */}
       <div className="absolute top-40 ml-4 mb-10 ">
         <img
           src={post.profilePicture}
           alt="Bottom Left Image"
           className="w-40 h-40 rounded-full"
         />
       </div>
       <button onClick={togglehandle} className="absolute top-64 right-0 mr-9 ">Edit Cover</button>
       <button onClick={togglehandle} className="absolute top-64 right-0 mr-9 ">Edit profile</button>
       <div className="absolute top-80 left-6 w-full h-20">
         <h1 className=" absolute top-10 text-2xl">{post.name}</h1>
         <h3 className=" absolute top-24">@{post.username}</h3>
       </div>

       <div className="absolute bottom-72 left-6 mr-9 ">
           <p>
           {post.bio}
           </p>
       </div>
       <div className="absolute bottom-68 left-6 mr-9">
         <span >{post.location}</span>
         <span className="p-10">{post.website}</span>
       </div>
       <div className="absolute bottom-56 left-6 mr-9 ">
       <span >{post.followers && post.followers.length} Followers</span>
          <span className="p-10">{post.following && post.following.length} Following</span>
         
       </div>
       <div className="absolute bottom-40 border-b w-full border-gray-700"></div>

       <div className="absolute bottom-28 left-1/2 mr-9  ">
         <h1 className="text-2xl">Posts</h1>
       </div>
    <div className="absolute bottom-24 border-b w-full border-gray-700"></div>
    
    <IoArrowBackCircleSharp onClick={()=>{navigate('/dashboard')}} className="text-white absolute bottom-24 left-10 text-6xl"/>
     </div>)}
     { !toggle && post.tweets && post.tweets.length > 0 ?(

            post.tweets.map((po) => (
              
              <PostCard  username={po.username} media={po.media} content={po.content} time={po.createdAt} profilePicture={post.profilePicture} name={po.name} id={po._id}/>
              
            ))
          ) : (
            <p>No posts available</p>
          )}
    </div>
    
   );
 };