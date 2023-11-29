import React from 'react';
import theme from '../assets/theme.png';
import fontSize from '../assets/fontsize.png';
import settings from '../assets/settings.png';
import chat from '../assets/chat.png';
const Fab = () => {


  return (
    <div className="fab-main">
      <div className="fab-buttons">
        <img src={theme} alt='Theme Icon'/>
      </div>
      <div className="fab-buttons">
        <img src={fontSize} alt='Font Size Icon'/>
      </div>
      <div className="fab-buttons">
        <img src={settings} alt='Settings Icon'/>
      </div>
      <div className="fab-buttons">
        <img src={chat} alt='Chat Icon'/>
      </div>
    </div>
  );
};

export default Fab;
