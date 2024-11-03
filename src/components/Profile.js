import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../firebase/firebaseConfig';
import { collection, doc, query, where, getDocs, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [materials, setMaterials] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("Usuario autenticado:", currentUser);
        await fetchUserInfo(currentUser.uid);
        await fetchUserMaterials(currentUser.uid);
        setSuccessMessage(`Bienvenido, ${currentUser.email}`);
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const fetchUserInfo = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        console.log("Información del usuario:", data);
        setUserInfo(data);
      } else {
        console.log('No se encontró la información del usuario en Firestore');
        setErrorMessage('No se encontró la información del usuario');
      }
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      setErrorMessage('Error al obtener la información del usuario');
    }
  };

  const fetchUserMaterials = async (userId) => {
    try {
      const q = query(collection(db, 'materials'), where('uploadedBy', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const userMaterials = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Materiales subidos por el usuario:", userMaterials);
      
      if (userMaterials.length > 0) {
        setMaterials(userMaterials);
      } else {
        console.log("No se encontraron materiales subidos por el usuario");
        setErrorMessage("No se encontraron materiales subidos.");
      }
    } catch (error) {
      console.error('Error al cargar los materiales del usuario:', error);
      setErrorMessage('Error al cargar los materiales del usuario');
    }
  };

  const deleteMaterial = async (materialId, fileURL) => {
    try {
      await deleteDoc(doc(db, 'materials', materialId));

      if (fileURL) {
        const fileRef = ref(storage, fileURL);
        await deleteObject(fileRef);
      }

      setMaterials(prevMaterials => prevMaterials.filter(material => material.id !== materialId));
      setSuccessMessage('Material eliminado exitosamente');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error al eliminar el material. Inténtalo de nuevo.');
    }
  };  

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSuccessMessage('Sesión cerrada exitosamente');
      setErrorMessage('');
      setUser(null);
      setUserInfo({});
      setMaterials([]);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      setErrorMessage('Error al cerrar sesión, por favor intenta nuevamente');
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <h2>No has iniciado sesión</h2>
        <p>Para ver tu perfil, inicia sesión o regístrate.</p>
        <button className="btn btn-primary mr-2" onClick={() => navigate('/login')}>Ir a Inicio de Sesión</button>
        <button className="btn btn-secondary" onClick={() => navigate('/register')}>Ir a Registro</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Perfil</h2>
      
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      
      <p><strong>Nombre:</strong> {userInfo.name || 'No especificado'}</p>
      <p><strong>Correo:</strong> {user.email}</p>
      <p><strong>Institución:</strong> {userInfo.institution || 'No especificada'}</p>
      
      <h3 className="mt-4" >Materiales Subidos</h3>
      <ul className="list-group">
        {materials.length > 0 ? (
          materials.map((material) => (
            <li key={material.id} className="list-group-item">
              <h5>{material.materialName || 'Nombre no disponible'}</h5>
              <p><strong>Descripción:</strong> {material.description || 'Descripción no disponible'}</p>
              <p><strong>Categoría:</strong> {material.category || 'Categoría no disponible'}</p>
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
            <p><strong>Tipo:</strong> {material.type || 'Tipo no disponible'}</p>
            <button
                className="btn btn-danger mt-2"
                onClick={() => deleteMaterial(material.id, material.fileURL)}
              >
                Eliminar
              </button>
          </li>
          ))
        ) : (
          <p>No se encontraron materiales subidos.</p>
        )}
      </ul>
      
      <button className="btn btn-danger mt-3" onClick={handleSignOut}>Cerrar Sesión</button>
    </div>
  );
};

export default Profile;