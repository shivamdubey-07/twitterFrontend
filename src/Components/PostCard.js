import {useState} from "react";
import "./PostCard.css";
import Cookies from "js-cookie";
import { MdDriveFolderUpload } from 'react-icons/md';
import axios from "axios";
function PostCard({ username,name,profilePicture, content, media, time ,id}) {
  let date = new Date(time);
  // Get the current date
  let currentDate = new Date();

  // Calculate the time difference in milliseconds
  let timeDifference = currentDate - date;

  // Convert milliseconds to hours
  let hoursDifference = Math.floor(timeDifference / (1000 * 60 ));


  const [toggle,setToggle]=useState(false)
  const [text, setText] = useState('');
  const [selectedMedia,setSelectedMedia]=useState(null)

  const togglehandle=(e)=>{
    setToggle(!toggle)
   
 }
 const handleMediaChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    
      setSelectedMedia(file);
   
  }
};
const handleChange = (event) => {
  const { name: fieldName, value } = event.target;
  if (fieldName === 'text') setText(value);
};

  const deleteTweet = async () => {  // Make sure to pass the `id` as a parameter
    
    try {
     
      const res = await axios.post('http://localhost:9000/api/user/delete/',{ id: id }, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${Cookies.get('token')}`
        } // Include the id in the `data` property
      });
  
      if (res.status === 204) {
        window.location.reload()
        alert('Tweet deleted successfully');
      } else {
        alert('Error deleting tweet');
      }
    } catch (error) {
     
      alert('Error deleting tweet');
    }
  };
  



const editTweet=async()=>{
  setToggle(!toggle)

}
const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("id",id)
    text !==''?formData.append('content', text):setText('')
    selectedMedia !==null?formData.append('file', selectedMedia):setSelectedMedia(null)
   
      const response = await axios.patch("http://localhost:9000/api/user/updateTweet", formData,{
        headers: {
          'Content-Type':'multipart/form-data',
          "Authorization": `${Cookies.get("token")}`, // Add Bearer before token
        },
      });

     
    
     alert(response.data.message)
     window.location.reload()
  

  } catch (error) {
      alert("An error occured");
     
  }
}




  return (
<div>
    {toggle && (
      <div className="form-div w-1/2 h-5/6 flex flex-col justify-center items-center bg-black overflow-y-auto">
          <button className="cut-btn1" onClick={togglehandle}>x</button>
          <img className="absolute w-10 h-10 left-1/2 top-2" src="x.png" alt="logo" />
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 mt-12">
              <h1 className="text-4xl text-white">Update Tweet</h1>
              <input
                  className="p-2 rounded-md mt-14"
                  type="text"
                  name="text"
                  value={text}
                  onChange={handleChange}
                  placeholder="Name"
              />
              <span className="text-white mt-4">Choose tweet image</span>
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
  
  
  {!toggle &&
    <div className="post-card">
      <div className="profile-image ">
        <img className=" w-50 h-50 rounded-full" src={profilePicture} alt="dp" />
      </div>
      <div className="post-content">
        <div className="post-header">
        <span>{name}</span>
          <span>@{username}</span>
         
          <span>{hoursDifference} mins</span>
        </div>
        <div className="post-description">{content}</div>
        {media=="not posted on cloud"? null : (
          <div className="post-photo">
            <img width="200px" height="200px" src={media} />

          </div>
        )}
      </div>
      {Cookies.get('username')===username?
       <div className="flex flex-col ml-10">
        <button className="mb-5"  onClick={editTweet}>Edit</button>
        <button onClick={deleteTweet}>Delete</button>
       </div>:null}
    </div>
}
    </div>
  );
}

export default PostCard;