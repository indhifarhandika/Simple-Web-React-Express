import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const register = async (email, username, password, membershipType) => {
  const response = await axios.post(`${API_URL}/register`, { email, username, password, membershipType });
  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: token }
  });
  return response.data;
};

export const getContent = async (token) => {
    const response = await axios.get(`${API_URL}/content`, {
      headers: { Authorization: token }
    });
    return response.data;
  };