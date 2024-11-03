import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import MaterialCard from './MaterialCard';

const RecentMaterials = () => {
  const [recentMaterials, setRecentMaterials] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    const fetchRecentMaterials = async () => {
      try {
        setErrorMessage(''); 
        const q = query(
          collection(db, 'materials'),
          orderBy('uploadedAt', 'desc'),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const materialsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecentMaterials(materialsList);

        if (materialsList.length === 0) {
          setErrorMessage('No hay materiales recientes para mostrar.');
        }
      } catch (error) {
        console.error('Error al obtener materiales recientes', error);
        setErrorMessage('Error al obtener los materiales recientes. Por favor, intenta nuevamente.');
      }
    };
    fetchRecentMaterials();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Materiales Recientes</h2>

      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

      <div>
        {recentMaterials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </div>
  );
};

export default RecentMaterials;