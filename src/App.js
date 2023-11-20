import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import EditPage from './pages/EditPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit/:roomId' element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
