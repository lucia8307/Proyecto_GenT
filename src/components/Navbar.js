import React from 'react';
import { Link } from 'react-router-dom';
import '../customStyles.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link className="navbar-brand" to="/">Mi Plataforma</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/login" className="nav-link"><i className="fas fa-sign-in-alt"></i> Iniciar Sesión</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link"><i className="fas fa-user-plus"></i> Registro</Link>
          </li>
          <li className="nav-item">
            <Link to="/upload" className="nav-link"><i className="fas fa-upload"></i> Subir Material</Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link"><i className="fas fa-search"></i> Buscar Material</Link>
          </li>
          <li className="nav-item">
            <Link to="/recent-materials" className="nav-link"><i className="fas fa-clock"></i> Materiales Recientes</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link"><i className="fas fa-user"></i> Perfil</Link>
          </li>
          <li className="nav-item">
            <Link to="/helpform" className="nav-link"><i className="fas fa-question-circle"></i> Ayuda</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
