// Fab.js
import React from 'react';
import theme from '../assets/theme.png';
import fontSize from '../assets/fontsize.png';
import code from '../assets/code.png';
import chat from '../assets/chat.png';
import { toast} from 'react-hot-toast';

const Fab = ({ onThemeChange, onSizeChange, onCodeChange }) => {
  
  const handleThemeChange = () => {
    try {
      onThemeChange();
      toast.success(`Theme changed.`)
    }
    catch(err) {
      toast.error('Oops! Please try again.')
    }
  };

  const handleSizeChange = () => {
    try {
      onSizeChange();
      toast.success(`Font size changed.`)
    }
    catch(err) {
      toast.error('Oops! Please try again.')
    }
  };

  const handleCodeChange = () => {
    try {
      onCodeChange();
      toast.success(`Language changed.`)
    }
    catch(err) {
      toast.error('Oops! Please try again.')
    }
  };

  return (
    <div className="fab-main">
      <div className="fab-buttons" onClick={handleThemeChange}>
        <img src={theme} alt='Theme Icon' />
      </div>
      <div className="fab-buttons" onClick={handleSizeChange} >
        <img src={fontSize} alt='Font Size Icon'/>
      </div>
      <div className="fab-buttons" onClick={handleCodeChange}>
        <img src={code} alt='Code Icon'/>
      </div>
      <div className="fab-buttons">
        <img src={chat} alt='Chat Icon'/>
      </div>
    </div>
  );
};

export default Fab;
