import React, { memo, useState } from "react";
import { IoMdInformationCircleOutline, IoMdSend } from "react-icons/io";
import ClientCard from "./ClientCard";
import Logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCredentials } from "../features/Credentials/RoomCredentialSlice";
import ChatBox from "./ChatBox";

const ConnectedMembers = ({
  messages,
  connectedUsers,
  sendMessage,
  handleExitMeeting,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageInput, setMessageInput] = useState("");

  const handleCopyRoomId = () => {
    const roomId = JSON.parse(localStorage.getItem("roomCredentials"))?.roomId;
    navigator.clipboard
      .writeText(roomId)
      .then(() => toast.success("Room ID copied"))
      .catch(() => toast.error("Failed to copy"));
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      sendMessage(messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className='flex flex-col items-center h-screen max-h-screen'>
      {/* Logo */}
      <img src={Logo} alt='Logo' className='w-30 h-10 py-2 mt-4' />

      {/* Connected Members */}
      <div className='w-full flex-1 flex flex-col'>
        <hr className='border border-secondary' />
        <div className='flex items-center justify-between my-2 px-6'>
          <p className='text-sm font-bold'>CONNECTED MEMBERS</p>
          <IoMdInformationCircleOutline title='Members currently connected to the room' />
        </div>
        <hr className='border border-secondary mb-4' />
        <div className='grid grid-cols-2 gap-4 flex-1 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-overlay scrollbar-track-primary'>
          {connectedUsers.map((user, index) => (
            <ClientCard key={index} username={user} />
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className='w-full h-1/2 flex flex-col'>
        <hr className='border border-secondary' />
        <div className='flex items-center justify-between my-2 px-6'>
          <p className='text-sm font-bold'>CHAT BOX</p>
          <IoMdInformationCircleOutline title='Chat with connected members' />
        </div>
        <hr className='border border-secondary' />

        {/* Chat messages */}
        <div className='flex-1 overflow-y-auto flex flex-col my-2 gap-2 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-overlay scrollbar-track-primary'>
          {messages.map((message, index) => (
            <MemoizedChatBox
              key={index}
              username={message.username}
              message={message.message}
            />
          ))}
        </div>

        {/* Chat input */}
        <div className='flex items-center bg-secondary rounded-sm shadow px-2'>
          <input
            type='text'
            className='py-3 bg-secondary outline-none text-xs flex-1'
            placeholder='Type a message'
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            className='text-white rounded-lg ms-1 p-2'
            onClick={handleSendMessage}
          >
            <IoMdSend size={20} />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className='mt-4 '>
        <button
          className='py-3 px-4 bg-secondary hover:bg-contemporary border-secondary shadow-lg rounded font-semibold m-1 text-xs transition duration-300'
          onClick={handleCopyRoomId}
        >
          COPY ROOM ID
        </button>
        <button
          className='py-3 px-4 bg-red-700 hover:bg-red-600 shadow-lg rounded font-semibold text-xs m-1 transition duration-300'
          onClick={handleExitMeeting}
        >
          EXIT MEETING
        </button>
      </div>
      <p className='text-contemporary text-xs p-1 font-serif'>
        Crafted in India | Where Tradition Meets Tech
      </p>
    </div>
  );
};

const MemoizedChatBox = memo(ChatBox);

export default ConnectedMembers;
