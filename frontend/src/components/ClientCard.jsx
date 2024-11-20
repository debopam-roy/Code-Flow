import React from "react";
import Avatar from "react-avatar";

const ClientCard = ({ username }) => {
  return (
    <div className='flex flex-col items-center p-1'>
      <Avatar name={username} size={50} round='30%' />
      <span className='text-center'>{username}</span>
    </div>
  );
};

export default ClientCard;
