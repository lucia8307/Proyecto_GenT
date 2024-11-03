import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',  // Cambia por tu URL de la API.
  timeout: 5000, // Timeout de 5 segundos para cada solicitud.
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar un interceptor para manejar tokens de autenticación.
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
