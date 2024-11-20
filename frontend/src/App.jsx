import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinPage from "./pages/JoinPage";
import EditorPage from "./pages/EditorPage";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div>
        <Toaster
          position='top-right'
          toastOptions={{
            success: {
              style: {
                background: "#526d82",
                color: "#f3efe3",
              },
              iconTheme: {
                primary: "#89a4b5",
                secondary: "#ffffff",
              },
            },
            error: {
              style: {
                background: "#526d82",
                color: "#f3efe3",
              },
              iconTheme: {
                primary: "#011f00",
                secondary: "#f3efe3",
              },
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<JoinPage />} />
          <Route path='/editor/:roomId' element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
