import React, { useState, useEffect } from 'react';
import logo from '../logo.png';
import Client from '../components/Client';
import Editor from '../components/Editor';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import CodeMirror from 'codemirror';
import 'codemirror/theme/dracula.css'; 
import Fab from '../components/Fab';

const initialClients = [
  { socketId: 1, username: "Rakesh K" },
  { socketId: 2, username: "John Doe" },
  { socketId: 3, username: "Jack Dan" },
  { socketId: 4, username: "Debopam Roy" },
  { socketId: 5, username: "Rafikul Alam" },
  { socketId: 6, username: "Afaque" },
];

const EditPage = () => {
  const [clients, setClients] = useState(initialClients);
  const [code, setCode] = useState('');

  useEffect(() => {
    const editor = CodeMirror(document.getElementById('editor'), {
      
      mode: 'javascript',
      lineNumbers: false,
      theme: 'dracula',
    });
  
    // Set an event handler for changes
    editor.on('change', (cm) => {
      setCode(cm.getValue());
    });
  
    return () => {
    };
  }, []);
  
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
        <div id="editor"></div>
        <Fab/>

      </div>
    </div>
  );
};

export default EditPage;
