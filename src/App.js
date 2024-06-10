import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Components/Signup';
import Sidebar from './Components/Sidebar';
import { Dashboard } from './Components/Dashboard';
import PostCard from './Components/PostCard';
import { Profile } from './Components/Profile';
import Testing from './Components/Testing';
import TweetForm from './Components/TweetForm';




function App() {
  return (

    <BrowserRouter> 
      <Routes>
      <Route exact path="/" element={<Signup/>}></Route>
      </Routes>
      <Routes>
      <Route exact path="/Home" element={<Dashboard/>}></Route>
     
      <Route exact path="/post" element={<PostCard/>}></Route>
      <Route exact path="/profile" element={<Profile/>}></Route>
      <Route exact path="/testing" element={<Testing/>}></Route>
      <Route exact path="/post" element={<PostCard/>}></Route>
      <Route exact path="/dashboard" element={<Dashboard/>}></Route>
      <Route exact path="/post-tweet" element={<TweetForm/>} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
