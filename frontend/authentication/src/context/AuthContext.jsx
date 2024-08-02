// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const register = async (userData) => {
    const response = await axios.post('/api/users', userData);
    setUser(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    navigate('/goals');
  };

  const login = async (userData) => {
    const response = await axios.post('/api/users/login', userData);
    setUser(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    navigate('/goals');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
