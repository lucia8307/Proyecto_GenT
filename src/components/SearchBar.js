import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const categories = [
  "Actividades Fisicas y Deportes",
  "Artes y Diseño",
  "Comunicación y Lenguas",
  "Economía y Administración",
  "Naturaleza y Ambiente",
  "Salud",
  "Seguridad y Defensa",
  "Sociales y Humanidades",
  "Educación",
  "Industrias, Informática y Tecnologías",
  "Jurídica",
  "Ciencias Exactas"
];


const SearchMaterials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleSearch = async () => {
    try {
      setErrorMessage(''); 
      setSuccessMessage('');

      const q = query(
        collection(db, 'materials'),
        where('materialName', '>=', searchTerm),
        where('materialName', '<=', searchTerm + '\uf8ff')
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMaterials(results);

      if (results.length > 0) {
        setSuccessMessage('Materiales encontrados.');
      } else {
        setErrorMessage('No se encontraron materiales con ese nombre.');
      }

      setSearchTerm('');
    } catch (error) {
      console.error('Error al buscar materiales', error);
      setErrorMessage('Error al buscar materiales. Por favor, intenta nuevamente.');
      setMaterials([]);
    }
  };

  const handleCategorySearch = async (category) => {
    try {
      setErrorMessage('');
      setSuccessMessage('');

      const q = query(
        collection(db, 'materials'),
        where('category', '==', category)
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMaterials(results);

      if (results.length > 0) {
        setSuccessMessage(`Materiales encontrados en la categoría "${category}".`);
      } else {
        setErrorMessage(`No se encontraron materiales en la categoría "${category}".`);
      }
    } catch (error) {
      console.error('Error al buscar materiales por categoría', error);
      setErrorMessage('Error al buscar materiales. Por favor, intenta nuevamente.');
      setMaterials([]);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Buscar Materiales</h2>

      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre del material"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary mt-2">Buscar</button>
      </div>
      
      <div className="mt-3">
        <h5>Categorías</h5>
        <div className="d-flex flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySearch(category)}
              className="btn btn-outline-primary m-1"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <ul className="list-group mt-3">
        {materials.map((material) => (
          <li key={material.id} className="list-group-item">
            <h5>{material.materialName}</h5>
            <p>{material.description}</p>
            <p>Categoría: {material.category}</p>
            {material.type === "Imagen" || material.type === "Fisico" ? (
          <>
            <img src={material.fileURL} alt={material.materialName} style={{ width: '100%' }} />
            <a href={material.fileURL} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">
              Ver Imagen
            </a>
          </>
          ) : material.type === "PDF" ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f2f2f2' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" alt="PDF icon" style={{ width: '50px', marginRight: '10px' }} />
                <div>
                  <p className="mb-0"><strong>{material.materialName}</strong></p>
                  <p className="mb-0 text-muted">PDF</p>
                </div>
                <a href={material.fileURL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary ml-auto">
                  Ver PDF
                </a>
              </div>
            </>
          ) : null}
            <p>Tipo: {material.type}</p>
            <p>Medio de Contacto: {material.contacto}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMaterials;