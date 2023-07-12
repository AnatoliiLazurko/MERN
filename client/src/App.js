import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import GuestGuard from './guards/GuestGuard';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Users from './components/users/Users';

function App() {
  return (
    <div>
      <Provider store={store}>
        <AuthProvider>
          <Header />
      
          <Routes>
            <Route path="/" element={<GuestGuard><Home /></GuestGuard>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/users" element={<Users />} />
          </Routes>

        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
