import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, db, auth } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


const UploadMaterialForm = () => {
  const [materialName, setMaterialName] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [contacto, setcontacto] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setErrorMessage('Debes iniciar sesión para subir material.');
      return;
    }
    if (!file) {
      setErrorMessage('Por favor, selecciona un archivo para subir.');
      return;
    }

    try {
      const fileRef = ref(storage, `materials/${file.name}`);
      const uploadResult = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, 'materials'), {
        materialName: materialName,
        type: materialType,
        category,
        description,
        fileURL: downloadURL,
        uploadedAt: serverTimestamp(),
        uploadedBy: auth.currentUser.uid,
        contacto,
      });

      setSuccessMessage('Material subido exitosamente');
      setErrorMessage('');

      setMaterialName('');
      setMaterialType('');
      setCategory(''); 
      setDescription('');
      setFile(null);
      setcontacto('');
      document.getElementById('file').value = '';
    } catch (error) {
      console.error('Error al subir el material', error);
      setErrorMessage('Error al subir el material. Por favor, intenta nuevamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Subir Material</h2>

      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

      {!isAuthenticated ? (
        <div className="alert alert-warning mt-3">
          <p>No puedes subir materiales sin antes iniciar sesión.</p>
          <button className="btn btn-primary mr-2" onClick={() => navigate('/login')}>
            Iniciar Sesión
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/register')}>
            Registrarse
          </button>
        </div>
      ) : (
        <form onSubmit={handleFileUpload}>
          <div className="form-group">
            <label htmlFor="materialName">Nombre del Material</label>
            <input
              type="text"
              className="form-control"
              id="materialName"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="materialType">Tipo de Material</label>
            <select
              className="form-control"
              id="materialType"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="PDF">PDF</option>
              <option value="Imagen">Imagen</option>
              <option value="Fisico">Formato Fisico</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <select
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Seleccionar Categoría</option>
              <option value="Actividades Fisicas y Deportes">Actividades Fisicas y Deportes</option>
              <option value="Artes y Diseño">Artes y Diseño</option>
              <option value="Comunicación y Lenguas">Comunicación y Lenguas</option>
              <option value="Economía y Administración">Economía y Administración</option>
              <option value="Naturaleza y Ambiente">Naturaleza y Ambiente</option>
              <option value="Salud">Salud</option>
              <option value="Seguridad y Defensa">Seguridad y Defensa</option>
              <option value="Sociales y Humanidades">Sociales y Humanidades</option>
              <option value="Educación">Educación</option>
              <option value="Industrias, Informática y Tecnologías">Industrias, Informática y Tecnologías</option>
              <option value="Jurídica">Jurídica</option>
              <option value="Ciencias Exactas">Ciencias Exactas</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="contacto">Medio de Contacto</label>
            <input
              type="text"
              className="form-control"
              id="contacto"
              value={contacto}
              onChange={(e) => setcontacto(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Archivo</label>
            <input
              type="file"
              className="form-control-file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Subir Material</button>
        </form>
      )}
    </div>
  );
};

export default UploadMaterialForm;
