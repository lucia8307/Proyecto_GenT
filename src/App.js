import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UploadForm from './components/UploadForm';
import SearchBar from './components/SearchBar';
import HelpForm from './components/HelpForm';
import RecentMaterials from './components/RecentMaterials';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import './customStyles.css';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Ruta de inicio */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/recent-materials" element={<RecentMaterials />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/helpform" element={<HelpForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
