import React from 'react'
import { IoIosSettings } from "react-icons/io";

const Fab = () => {
  return (
    <div className='fabContainer' style={{ backgroundColor:"transparent",textAlign:'right', padding:"20px", zIndex: 1000}}>
        <IoIosSettings size="150px" color="white"/>

    </div>
  )
}

export default Fab;