import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => (
  <div className="container mt-5">
    <h1>Bienvenido a Mi Plataforma Educativa</h1>
    <p>Explora y comparte materiales educativos de forma rápida y sencilla.</p>
    <div className="row">
      <div className="col-md-4">
        <h3>Sube Material</h3>
        <p>Comparte tus documentos y recursos con otros usuarios.</p>
        <Link to="/upload">
          <button className="btn btn-primary">Subir Material</button>
        </Link>
      </div>
      <div className="col-md-4">
        <h3>Buscar Material</h3>
        <p>Encuentra recursos según categoría o nombre.</p>
        <Link to="/search">
          <button className="btn btn-primary">Buscar Material</button>
        </Link>
      </div>
      <div className="col-md-4">
        <h3>Materiales Recientes</h3>
        <p>Consulta los materiales más recientes subidos a la plataforma.</p>
        <Link to="/recent-materials">
          <button className="btn btn-primary">Materiales Recientes</button>
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
