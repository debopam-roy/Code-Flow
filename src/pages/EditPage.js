// EditPage.js
import logo from '../logo.png';
import Fab from '../components/Fab';
import React, { useState } from 'react';
import Editor from '../components/Editor';
import Client from '../components/Client';
import { abcdef, abyss, androidstudio, andromeda, atomone, aura, basicDark, bespin, copilot, darcula, dracula, duotoneDark, githubDark, materialDark, monokai, nord, okaidia, solarizedDark, sublime, vscodeDark, xcodeDark } from '@uiw/codemirror-themes-all';

const EditPage = () => {
  const initialClients = [
    { socketId: 1, username: "Rakesh K" },
    { socketId: 2, username: "John Doe" },
    { socketId: 3, username: "Jack Dan" },
    { socketId: 4, username: "Debopam Roy" },
    { socketId: 5, username: "Rafikul Alam" },
    { socketId: 6, username: "Afaque" },
  ];
  const availableLanguages= ['C++', 'Java', 'Python', 'JavaScript', 'Go', 'C'];
  const availableTemplates = {
    'C++': '#include <iostream>\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}',
    'Java': 'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
    'Python': 'print("Hello, World!")',
    'JavaScript': 'console.log("Hello, World!");',
    'Go': 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello, World!")\n}',
    'C': '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
  };
  
  const [theme, setTheme] = useState(abcdef);
  const [fontSize, setFontSize] = useState(12);
  const [clients, setClients] = useState(initialClients);
  const [language, setLanguage] = useState(availableLanguages[0]);
  const [template, setTemplate] = useState(availableTemplates[language]);

  const handleThemeChange = () => {
    const availableThemes = [abcdef, abyss, androidstudio, andromeda, atomone, aura, basicDark, bespin, copilot, darcula, dracula, duotoneDark, githubDark, materialDark, monokai, nord, okaidia, solarizedDark, sublime, vscodeDark, xcodeDark];
    const currentThemeIndex = availableThemes.indexOf(theme);
    const nextThemeIndex = (currentThemeIndex + 1) % availableThemes.length;
    const nextTheme = availableThemes[nextThemeIndex];
    setTheme(nextTheme);
  };

  const handleTextSizeChange = () => {
    setFontSize((prevSize) => (prevSize + 2) % 20 || 12);
  };
  
  const handleCodeChange = () => {
    const currentIndex = availableLanguages.indexOf(language);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    const nextLanguage = availableLanguages[nextIndex];
    setLanguage(nextLanguage);
    setTemplate(availableTemplates[nextLanguage]);
  };

  return (

     <div className='editContainer'>
     <div className='leftContainer'>
       <div className='leftInner'>
         <div className='logoContainer'>
           <img src={logo} className='logo edit-logo' alt='Code-Flow logo' />
         </div>
         <h3>Connected</h3>
         <div className='clientslist'>
           {clients.map((client) => (
             <Client key={client.socketId} username={client.username} />
           ))}
         </div>
       </div>
       <button className='edit_btn'>Copy ROOM ID</button>
       <button className='edit_btn leave_btn'>Exit</button>
     </div>
     <div className='editorWrap'>
      <Editor language={language} template={template} textSize={fontSize} theme={theme} />
      <Fab onCodeChange ={handleCodeChange} onSizeChange={handleTextSizeChange} onThemeChange={handleThemeChange} />
     </div>
   </div>
  );
};

export default EditPage;
