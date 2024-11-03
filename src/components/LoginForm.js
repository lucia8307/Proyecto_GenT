import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import '../customStyles.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate(); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setSuccessMessage('Ya has iniciado sesión.');
      } else {
        setIsAuthenticated(false);
        setSuccessMessage('');
      }
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso', userCredential.user);
      setSuccessMessage('Inicio de sesión exitoso');
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error en el inicio de sesión', error);
      setErrorMessage('Correo o contraseña incorrectos');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSuccessMessage('Cierre de sesión exitoso');
      setIsAuthenticated(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      setErrorMessage('Error al cerrar sesión, intenta nuevamente');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {isAuthenticated ? (
        <div>
          <p className="text-success">{successMessage}</p>
          <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {successMessage && <p className="text-success">{successMessage}</p>}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
      )}

      {!isAuthenticated && (
        <div className="mt-3">
          <p>¿No tienes cuenta?</p>
          <button className="btn btn-link" onClick={() => navigate('/register')}>Regístrate</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
