import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import GuestGuard from './guards/GuestGuard';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
      
        <Routes>
          <Route path="/" element={<GuestGuard><Home /></GuestGuard>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
