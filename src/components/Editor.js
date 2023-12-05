// Editor.js
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';


const Editor = ({ language, template, textSize, theme }) => {
  const [code, setCode] = useState('');

  //TODO: Use a module to generate the template for the code base selected...
  
  return (
    <div style={{fontSize:textSize}}>
      <CodeMirror
        value={code}
        height="100vh"
        placeholder={template}
        theme={theme}
        onChange={(newCode) => {
          setCode(newCode);
        }}
      />
    </div>
  );
};

export default Editor;
