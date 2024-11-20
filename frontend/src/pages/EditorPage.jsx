import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { socket } from "../socket/Socket";
import toast from "react-hot-toast";
import ConnectedMembers from "../components/ConnectedMembers";
import Terminal from "../components/Terminal";
import CodeEditor from "../components/Editor";
import { removeCredentials } from "../features/Credentials/RoomCredentialSlice";
import * as Y from "yjs";

const EditorPage = () => {
  const submitButton = null;
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const ydoc = useRef(new Y.Doc()).current;
  const yText = ydoc.getText("monaco");

  const handleNewUser = ({ username, userId }) => {
    const { username: saved_username } = JSON.parse(
      localStorage.getItem("roomCredentials")
    );

    if (username == saved_username && userId == socket.id) {
      toast.success(`You joined.`);
    } else {
      toast.success(`${username} joined.`);
    }
  };

  const handleCodingLanguageChange = (updatedLanguage) => {
    setSelectedLanguage(updatedLanguage);
  };

  const handleMessageSubmit = (newMessage) => {
    const { username, roomId } = JSON.parse(
      localStorage.getItem("roomCredentials")
    );
    socket.emit("sendMessage", { roomId, username, message: newMessage });
  };

  const handleDisconnect = ({ username, userId }) => {
    const { username: saved_username } = JSON.parse(
      localStorage.getItem("roomCredentials")
    );

    if (username == saved_username && userId == socket.id) {
      socket.disconnect();
      toast.success(`You left.`);
      dispatch(removeCredentials());
      navigate("/");
    } else {
      toast.success(`${username} left.`);
    }
    return;
  };

  const handleExitMeeting = () => {
    const { roomId } = JSON.parse(localStorage.getItem("roomCredentials"));
    socket.emit("leaveRoom", { roomId });
  };

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleEditorMount = (editor, monaco) => {
    editor.focus();
    editorRef.current = editor;

    const { username, roomId } = JSON.parse(
      localStorage.getItem("roomCredentials")
    );
    let isRemoteUpdate = false;
    if (codeSnippet) {
      yText.insert(0, codeSnippet);
    }

    yText.observe(() => {
      if (isRemoteUpdate) return; 
      const code = yText.toString();
      if (code !== editor.getValue()) {
        isRemoteUpdate = true;
        editor.setValue(code);
        setCodeSnippet(code);
        isRemoteUpdate = false;
      }
    });

    editor.onDidChangeModelContent(() => {
      if (isRemoteUpdate) return; 
      const code = editor.getValue();
      setCodeSnippet(code);
      socket.emit("codeUpdate", { roomId, username, code });
    });

    return () => {
      yText.unobserve();
      editor.dispose();
    };
  };

  useEffect(() => {
    const storedCredentials = localStorage.getItem("roomCredentials");
    if (!storedCredentials) {
      toast.error("Error occurred. Please try again.");
      dispatch(removeCredentials());
      navigate("/");
      return;
    }

    const { username, roomId, password } = JSON.parse(storedCredentials);
    socket.connect();

    const handleConnect = () => {
      const action = submitButton == "Join" ? "joinRoom" : "createRoom";

      socket.emit(action, { username, roomId, password }, (response) => {
        if (!response.success) {
          dispatch(removeCredentials());
          navigate("/");
          return;
        }
      });
    };

    const handleUpdateMembers = (members) => {
      setConnectedUsers(members);
    };

    const handleCodeUpdate = ({ code }) => {
      try {
        yText.delete(0, yText.length);
        yText.insert(0, code.trim());
        setCodeSnippet(code.trim());
      } catch (error) {
        console.error("Error inserting code into yText", error);
      }
    };

    const handleInitialCode = ({ code }) => {
      try {
        setCodeSnippet(code);
      } catch (error) {
        console.error("Error inserting initial code into yText", error);
      }
    };

    socket.on("connect", handleConnect);
    socket.on("updateMembers", handleUpdateMembers);
    socket.on("initialCode", handleInitialCode);
    socket.on("userJoined", handleNewUser);
    socket.on("newMessage", handleNewMessage);
    socket.on("receiveCodeUpdate", handleCodeUpdate);
    socket.on("userLeft", handleDisconnect);

    socket.on("error", (response) => {
      console.error("Error from server:", response);
      const { message, socket_error } = response;
      let error_message = "Some error has occured!";
      if (message == "room_exists") error_message = "The RoomID is occupied!";
      else if (message == "wrong_password") error_message = "Wrong password!";
      else if (message == "room_not_exists")
        error_message = "The RoomId is not found!";
      else error_message = `Oops! Error: ${socket_error}`;

      toast.error(error_message);
      navigate("/");
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("updateMembers", handleUpdateMembers);
      socket.off("initialCode", handleInitialCode);
      socket.off("userJoined", handleNewUser);
      socket.off("newMessage", handleNewMessage);
      socket.off("receiveCodeUpdate", handleCodeUpdate);
      socket.off("userLeft", handleDisconnect);
    };
  }, [navigate, dispatch]);

  return (
    <div className='bg-primary h-screen flex w-full text-overlay'>
      <div className='w-[20%] min-w-[300px]'>
        <ConnectedMembers
          messages={messages}
          sendMessage={handleMessageSubmit}
          connectedUsers={connectedUsers}
          handleExitMeeting={handleExitMeeting}
        />
      </div>
      <div className='flex flex-col h-screen w-[80%]'>
        <div className='h-[70vh]'>
          <CodeEditor
            selectedLanguage={selectedLanguage}
            codeSnippet={codeSnippet}
            handleEditorMount={handleEditorMount}
          />
        </div>
        <div className='h-[30vh]'>
          <Terminal
            selectedLanguage={selectedLanguage}
            handleLanguageChange={handleCodingLanguageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
