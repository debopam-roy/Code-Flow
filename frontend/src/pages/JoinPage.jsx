import React from "react";
import JoiningForm from "../components/JoiningForm";
import { useDispatch } from "react-redux";
import { addCredentials } from "../features/Credentials/RoomCredentialSlice";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = (formData, sumbitButton) => {
    dispatch(addCredentials(formData));
    navigate(`editor/${formData.roomId}`);
  };

  return (
    <div className='min-h-screen flex items-center bg-primary justify-center p-2'>
      <JoiningForm formSubmit={formSubmit} />
    </div>
  );
};

export default JoinPage;
