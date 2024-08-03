import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/users', userData);
    console.log('Registration response:', response); // Log the whole response
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
    navigate('/goals');
  } catch (error) {
    console.error('Registration error:', error.message); // Log error message
  }
};


  const login = async (userData) => {
    try {
      const response = await axiosInstance.post('/api/users/login', userData);
      console.log('Login response:', response.data); // Debug log
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/goals');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
