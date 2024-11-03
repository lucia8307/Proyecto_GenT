import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (isAuthenticated) {
      setErrorMessage('Ya tienes una sesión iniciada.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid, 
        name,
        email,
        institution,
        createdAt: serverTimestamp(),
      });

      setSuccessMessage('Registro exitoso');
      setErrorMessage('');

      setName('');
      setEmail('');
      setPassword('');
      setInstitution('');
    } catch (error) {
      console.error('Error al registrar', error);
      if (error.message.includes('password')) {
        setErrorMessage('La contraseña debe tener minimo 6 caracteres.');
      } else {
        setErrorMessage('Error al registrar, por favor intenta nuevamente');
      }
      setSuccessMessage('');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSuccessMessage('Sesión cerrada exitosamente');
      setErrorMessage('');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      setErrorMessage('Error al cerrar sesión, por favor intenta nuevamente');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>

      {isAuthenticated ? (
        <div>
          <p>Ya tienes una sesión iniciada.</p>
          <p className="text-success">{successMessage}</p>
          <button className="btn btn-danger" onClick={handleSignOut}>Cerrar Sesión</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="institution">Institución Educativa</label>
            <input
              type="text"
              className="form-control"
              id="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
      )}

      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

      {!isAuthenticated && (
        <div className="mt-3">
          <p>¿Ya tienes cuenta?</p>
          <button className="btn btn-link" onClick={() => navigate('/login')}>Iniciar Sesión</button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
