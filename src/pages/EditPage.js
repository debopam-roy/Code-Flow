import React, { useState } from 'react'
import logo from '../logo.png'
import Client from '../components/Client';

const EditPage = () => {
  const [clients, setClients]=useState([
    {socketId:1, username: "Debopam Roy"},
    {socketId:1, username: "Arnab Adak"},
    {socketId:1, username: "Puja Maity"}
  ]);
  return (
    <>
      <div className='editContainer'>
        <div className='leftContainer'>
          <div className='leftInner'>
            <div className='logoContainer'>
              <img src={logo} className='left_logo' alt='Code-Flow logo'></img>
            </div>
            <h3>Connected</h3>
            <div className='clientslist'>
                {
                  clients.map((client)=><Client username={client.username}/>)
                }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPage