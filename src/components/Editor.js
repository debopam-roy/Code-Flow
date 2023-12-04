import React, {useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { abcdef, abyss, androidstudio, andromeda, atomone, aura, basicDark, bespin, copilot, darcula, dracula, duotoneDark, githubDark, materialDark, monokai, nord, okaidia, solarizedDark, sublime, vscodeDark, xcodeDark } from '@uiw/codemirror-themes-all';
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';

const Editor = () => {
  const availableThemes=[abcdef, abyss, androidstudio, andromeda, atomone, aura, basicDark, bespin, copilot, darcula, dracula, duotoneDark, githubDark, materialDark, monokai, nord, okaidia, solarizedDark, sublime, vscodeDark, xcodeDark]
  const [code, setCode]= useState('');
  const [theme, setTheme] =useState(Math.floor(Math.random()*(availableThemes.length)));

  loadLanguage('tsx');
  
  langs.tsx();
  
  console.log('langNames:', langNames);  const handleButtonClick=()=>{
    setTheme((theme+1)%(availableThemes.length))
  }
  return(
    <div>
      <CodeMirror
      value={code}
      height="100vh"
      theme={availableThemes[theme]}
      onChange={(code) => {
        setCode(code);
      }}
    />
    <button onClick={handleButtonClick}>Hii</button>
    </div>
  );
};

export default Editor;