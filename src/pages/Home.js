import '../App.css';
import React, { useState } from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = () => {
    const id = uuid();
    setRoomId(id);
    
  };

  const handleJoinClick = () => {
    console.log("Hiii");
  };

  return (
    <>
      <div className='pageContainer'>
        <div className='formContainer'>
          <img className='logo' src={logo} alt='Code Flow logo' />
          <span>Enter invitational ROOM ID</span>
          <input
            type="text"
            id="roomIdInput"
            className='input'
            placeholder='Enter Room Id'
            value={roomId}
            onChange={(e) => { setRoomId(e.target.value) }}
          />
          <input
            type="text"
            id="usernameInput"
            className='input'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
          />
          <button className='btn' onClick={handleJoinClick}>
            Join
          </button>
          <small className='invitation'>
            Don't have an invitation code? &nbsp;
            <Link onClick={createNewRoom} className='link'>
              Create room
            </Link>
          </small>
        </div>
      </div>
    </>
  );
};

export default Home;
