import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Table from './components/Table'
import Ratings from './components/Ratings'
import Profile from './components/Profile'
import About from './components/About'
import './App.css';
import {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  

function App() {
const [rating, setRating] = useState(800);
const [validUser, setValidUser] = useState(0);
const [user, setUser] = useState({});

  return (
    <Router>
    <div>
        <Navbar></Navbar>
        <Switch>
            <Route path = "/home">
                <SearchBar validUser = {validUser} setValidUser = {setValidUser} user = {user} setUser = {setUser}></SearchBar>
                <Profile validUser = {validUser} setValidUser = {setValidUser} user = {user} setUser = {setUser}></Profile>
                <Ratings rating = {rating} setRating = {setRating}></Ratings>
                <Table user = {user} rating = {rating} setRating = {setRating} validUser = {validUser}></Table>
            </Route>
            <Route path="/about">
                <About></About>
            </Route>
            <Redirect to="/home"/> 
        </Switch>
    </div>
    </Router>
  );
}

export default App;
