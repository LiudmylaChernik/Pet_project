import React, { createContext, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (username, password) => {
    const res = await axios.post('http://localhost:5001/register', { username, password });
    setUser(res.data);
  };

  const login = async (username, password) => {
    const res = await axios.post('http://localhost:5001/login', { username, password });
    const token = res.data.token;
    localStorage.setItem('token', token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
