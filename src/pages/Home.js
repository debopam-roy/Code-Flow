import '../App.css';
import React, { useState } from 'react';
import logo from '../logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const Home = () => {
  const navigate = useNavigate(); 
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = () => {
    const id = uuid();
    setRoomId(id);
    
  };

  const handleJoinClick = () => {
    if(!roomId || !username)
      return;
    navigate(`/editor/${roomId}`,{state:{username}})
  };

  const handleKeyUpEvent =(e) => {
    if(e.code ==='Enter') {
      handleJoinClick();
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <div className='formContainer'>
          <img className='logo' src={logo} alt='Code Flow logo' />
          <span className='logo-banner'>Enter invitational ROOM ID</span>
          <input
            type="text"
            id="roomIdInput"
            className='input'
            autoComplete='off'
            placeholder='Enter Room Id'
            value={roomId}
            onKeyUp={handleKeyUpEvent} 
            onChange={(e) => { setRoomId(e.target.value) }}
          />

          <input
            type="text"
            id="usernameInput"
            className='input'
            autoComplete='off'
            placeholder='Enter Username'
            value={username}
            onKeyUp={handleKeyUpEvent} 
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
