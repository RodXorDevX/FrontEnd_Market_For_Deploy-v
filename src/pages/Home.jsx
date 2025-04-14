import GaleriaDestacados from "../components/GaleriaDestacados";
import "../assets/css/Home.css";
import {
  FaSearch,
  FaShoppingBag,
} from "react-icons/fa";
import Banner from "../components/Banner";
import { useState } from "react";
import GaleriaPublicaciones from "../components/GaleriaPublicaciones";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleGaleriaClick = () => {
    navigate('/publicaciones');
  };

  return (
    <div className="home-container">
      <div className="main-content">
        {/* Banner Principal */}
        <Banner />

        {/* Sección de Búsqueda y Galería */}
        <div className="search-section">
          <div onClick={handleGaleriaClick} style={{ cursor: 'pointer' }}>
            <div className="gallery-icon">
              <FaShoppingBag color="white" size={60} />
            </div>
            <p className="gallery-title">Galería de publicaciones</p>
          </div>
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           
            </div>
          </div>
        </div>

        {/* Publicaciones destacadas */}
        <h2 className="publications-heading">Publicaciones destacadas</h2>
        <GaleriaDestacados search={search} />
      </div>
    </div>
  );
}

export default Home;
