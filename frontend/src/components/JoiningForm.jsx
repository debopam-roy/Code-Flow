import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { generateRandomPassword } from "js-random-generator";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const JoiningForm = ({ formSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    roomId: "",
    password: "",
  });
  const [sumbitButton, setSubmitButton] = useState("Join");
  const [showPassword, setShowPassword] = useState(false);

  const createNewRoom = () => {
    const roomId = uuid();
    const password = generateRandomPassword(8, 22);

    setFormData((prevFormData) => ({
      ...prevFormData,
      roomId,
      password,
    }));
    setSubmitButton("Create");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formSubmit(formData, sumbitButton);
  };

  return (
    <div className='flex items-center justify-center bg-primary p-6 text-overlay'>
      <div className='bg-secondary shadow-2xl rounded-3xl p-10 w-full max-w-md md:max-w-lg lg:max-w-xl'>
        <p className=' text-4xl font-serif font-semibold mb-3 text-center'>
          Welcome
        </p>
        <p className=' text-center font-light mb-10'>
          Enter the details to join the meeting
        </p>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <div className='relative'>
            <label
              htmlFor='username'
              className='block  text-sm font-medium mb-1'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              autoComplete='off'
              value={formData.username}
              onChange={handleInputChange}
              className='w-full py-3 px-4 bg-secondary  border rounded-lg border-contemporary focus:outline-none'
              placeholder='John Doe'
              required
            />
          </div>

          <div className='relative'>
            <label htmlFor='roomId' className='block  text-sm font-medium mb-1'>
              Room ID
            </label>
            <input
              type='text'
              id='roomId'
              name='roomId'
              value={formData.roomId}
              autoComplete='off'
              onChange={handleInputChange}
              className='w-full py-3 px-4 bg-secondary  border rounded-lg border-contemporary focus:outline-none'
              placeholder='21a4-3df3-453u-98we'
              required
            />
          </div>

          <div className='relative'>
            <label
              htmlFor='password'
              className='block  text-sm font-medium mb-1'
            >
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full py-3 px-4 bg-secondary  border rounded-lg border-contemporary focus:outline-none'
                placeholder='********'
                minLength={8}
                maxLength={22}
                required
                autoComplete='current-password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-3 flex items-center text-sm '
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          <div className='text-right -mt-4'>
            <span
              className=' font-medium cursor-pointer hover:underline'
              onClick={createNewRoom}
            >
              Create a new room
            </span>
          </div>

          <div className='pt-8'>
            <button
              type='submit'
              className='w-full py-3 px-6 bg-contemporary  font-bold rounded-full hover:bg-overlay hover:text-contemporary transition duration-300 ease-in-out '
            >
              {sumbitButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoiningForm;
