import '../App.css'
import React from 'react';
import logo from '../logo.png'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='pageContainer'>
      <div className='formContainer'>
        <img className='logo' src={logo}></img>
        <span>Enter invitational ROOM ID</span>
        <input type="text" id="textInput" className='input' placeholder='Enter Room Id' />
        <input type="text" id="textInput" className='input' placeholder='Enter Username' />
        <button className='btn'>Join</button>
        <small className='invitation'>
          Don't have an invitation code? &nbsp;
          <Link className='link' to="/create-room">Create room</Link>.
        </small>
      </div>
    </div>
  );
}

export default Home;
