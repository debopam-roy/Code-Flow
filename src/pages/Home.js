import React, { useState } from 'react';
import logo from '../logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate(); 
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = () => {
    const id = uuid();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const handleJoinClick = () => {
    if(!roomId || !username) {
      if(!roomId) {
        toast.error("RoomId is required");
        return;
      }
      if(!username) {
        toast.error("Username is required");
        return;
      }
    }
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
            className='input '
            autoComplete='off'
            placeholder='ENTER ROOM ID'
            value={roomId}
            onKeyUp={handleKeyUpEvent} 
            onChange={(e) => { setRoomId(e.target.value) }}
          />

          <input
            type="text"
            id="usernameInput"
            className='input username-input'
            autoComplete='off'
            placeholder='ENTER USER NAME'
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
