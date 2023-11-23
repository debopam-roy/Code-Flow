import React, { useState } from 'react';
import logo from '../logo.png';
import Client from '../components/Client';
import Editor from '../components/Editor';

const initialClients = [
  { socketId: 1, username: "Rakesh K" },
  { socketId: 1, username: "John Doe" },
  { socketId: 1, username: "Jack Dan" },
  { socketId: 1, username: "Debopam Roy" },
  { socketId: 1, username: "Rafikul Alam" },
  { socketId: 1, username: "Afaque" },
];

const EditPage = () => {
  const [clients, setClients] = useState(initialClients);

  return (
    <div className='editContainer'>
      <div className='leftContainer'>
        <div className='leftInner'>
          <div className='logoContainer'>
            <img src={logo} className='logo edit-logo' alt='Code-Flow logo' />
          </div>
          <h3>Connected</h3>
          <div className='clientslist'>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className='edit_btn'>Copy ROOM ID</button>
        <button className='edit_btn leave_btn'>Exit</button>
      </div>
      <div className='editorWrap'>
        <Editor />
      </div>
    </div>
  );
};

export default EditPage;
