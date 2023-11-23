import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import EditPage from './pages/EditPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div>
        <Toaster 
          position='top-right' 
          toastOptions={{
            success: {
              style: {
                background: 'var(--secondary-color)',
                color:'var(--text-color)',
                boxShadow: '0 0 10px rgba(82, 109, 130, 0.7)'
              },
              iconTheme: {
                primary: 'var(--primary-color)',
                secondary: 'var(--text-color)',
              },
            },
            error: {
              style: {
                background: 'var(--secondary-color)',
                color:'var(--text-color)',
                boxShadow: '0 0 10px rgba(82, 109, 130, 0.7)'
              },
              iconTheme: {
                primary: 'var(--primary-color)',
                secondary: 'var(--text-color)',
              },
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:roomId' element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
