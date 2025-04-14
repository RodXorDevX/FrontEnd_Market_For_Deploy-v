import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye } from 'react-icons/fa';
import '../assets/css/PublicacionGuardada.css';

function PublicacionGuardada({ publicacion, onRemove }) {
  const navigate = useNavigate();

  return (
    <div className="producto guardado">
      <div className="imagen-container">
        <img src={publicacion.image} alt={publicacion.title} />
      </div>
      
      <h4>{publicacion.title}</h4>
      
      <div className="acciones">
        <p>${publicacion.price}</p>

        <div className="botones-guardado">
          <button 
            className="ver-button"
            onClick={() => navigate(`/publicacion/${publicacion.id}`)}
          >
            <FaEye /> Ver
          </button>
          <button 
            className="eliminar-button"
            onClick={() => onRemove(publicacion.id)}
          >
            <FaTrash /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicacionGuardada; 