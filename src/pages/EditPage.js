import logo from "../assets/logo.png";
import Fab from "../components/Fab";
import React, { useEffect, useRef, useState } from "react";
import Editor from "../components/Editor";
import Client from "../components/Client";
import {
  abcdef,
  abyss,
  androidstudio,
  andromeda,
  atomone,
  aura,
  basicDark,
  bespin,
  copilot,
  darcula,
  dracula,
  duotoneDark,
  githubDark,
  materialDark,
  monokai,
  nord,
  okaidia,
  solarizedDark,
  sublime,
  vscodeDark,
  xcodeDark,
} from "@uiw/codemirror-themes-all";
import initSocket from "../components/Socket";
import ACTIONS from "../utils/Actions";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditPage = () => {
  const availableLanguages = ["C", "C++", "Java", "Python", "JavaScript"];
  const availableTemplates = {
    C: '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
    "C++":
      '#include <iostream>\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}',
    Java: 'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
    Python: 'print("Hello, World!")',
    JavaScript: 'console.log("Hello, World!");',
  };
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const location = useLocation();
  const pageNavigator = useNavigate();
  const initialClients = [];
  const [theme, setTheme] = useState(abcdef);
  const [fontSize, setFontSize] = useState(12);
  const [clientsList, setClientsList] = useState(initialClients);
  const [language, setLanguage] = useState(availableLanguages[0]);
  const [template, setTemplate] = useState(availableTemplates[language]);

  const handleError = (err) => {
    console.log(err);
    toast.error(`Oops! Socket connection wasn't sucessful.`);
    pageNavigator("/");
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          let joiningPopUp;
          if (username !== location.state?.username) {
            joiningPopUp = `${username} joined.`;
          } else {
            joiningPopUp = `You have joined.`;
          }
          toast.success(joiningPopUp);
          setClientsList(clients);
          console.log(clients);
        }
      );
    };
    init();
  }, []);

  const handleThemeChange = () => {
    const availableThemes = [
      abcdef,
      abyss,
      androidstudio,
      andromeda,
      atomone,
      aura,
      basicDark,
      bespin,
      copilot,
      darcula,
      dracula,
      duotoneDark,
      githubDark,
      materialDark,
      monokai,
      nord,
      okaidia,
      solarizedDark,
      sublime,
      vscodeDark,
      xcodeDark,
    ];
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
            {clientsList.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className='edit_btn'>Copy ROOM ID</button>
        <button className='edit_btn leave_btn'>Exit</button>
      </div>
      <div className='editorWrap'>
        <Editor
          language={language}
          template={template}
          textSize={fontSize}
          theme={theme}
        />
        <Fab
          onCodeChange={handleCodeChange}
          onSizeChange={handleTextSizeChange}
          onThemeChange={handleThemeChange}
        />
      </div>
    </div>
  );
};

export default EditPage;
