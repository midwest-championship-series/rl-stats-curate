

import axios from 'axios';

const API_BASE_URL = 'https://awpd99d265.execute-api.us-east-1.amazonaws.com/dev'; // Replace with your actual API URL

interface LoginResponse {
  token: string;
}

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    }, {
      headers: {'x-api-key': 'iWKYsbEBhY13hWReFTBeU9uOymZ79dz154Sw65wZ'}
    });

    console.log(response)

    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to login');
  }
};

export const getJwtToken = (): string | null => {
  return localStorage.getItem('jwtToken');
};

export const logout = (): void => {
  localStorage.removeItem('jwtToken');
};

export const isAuthenticated = (): boolean => {
  const jwtToken = getJwtToken();
  return !!jwtToken;
};