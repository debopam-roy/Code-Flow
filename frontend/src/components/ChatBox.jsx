import React from "react";

const MyChat = ({ username, message }) => (
  <div className='bg-secondary inline-block rounded-3xl py-3 px-6 mx-2 shadow-xl rounded-br-none self-end'>
    <p className='text-xs font-semibold font-sans mb-1'>{username}</p>
    <p className='font-extralight text-xs'>{message}</p>
  </div>
);

const OthersChat = ({ username, message }) => (
  <div className='bg-secondary inline-block rounded-3xl py-3 px-6 mx-2 shadow-xl rounded-bl-none self-start'>
    <p className='text-xs font-semibold font-sans text-overlay mb-1'>
      {username}
    </p>
    <p className='text-overlay font-extralight text-xs'>{message}</p>
  </div>
);

const ChatBox = ({ username, message }) => {
  const localUsername = localStorage.getItem("roomCredentials")
    ? JSON.parse(localStorage.getItem("roomCredentials")).username
    : "";

  const isCurrentUser = username === localUsername;

  return isCurrentUser ? (
    <MyChat username={username} message={message} />
  ) : (
    <OthersChat username={username} message={message} />
  );
};

export default React.memo(ChatBox);
