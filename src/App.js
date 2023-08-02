import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Table from './components/Table'
import Ratings from './components/Ratings'
import Profile from './components/Profile'
import './App.css';
import {useState} from 'react';

function App() {
const [rating, setRating] = useState(800);
const [validUser, setValidUser] = useState(0);
const [user, setUser] = useState({});

  return (
    <div>
        <Navbar></Navbar>
        <SearchBar validUser = {validUser} setValidUser = {setValidUser} user = {user} setUser = {setUser}></SearchBar>
        <Profile validUser = {validUser} setValidUser = {setValidUser} user = {user} setUser = {setUser}></Profile>
        <Ratings rating = {rating} setRating = {setRating}></Ratings>
        <Table user = {user} rating = {rating} setRating = {setRating} validUser = {validUser}></Table>
    </div>
  );
}

export default App;
