import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import axios from "axios";
import { API_BACKEND_URL } from "../config";
import "../assets/css/CardProducto.css";

function CardProducto({ producto }) {
  const { agregarAlCarrito, disminuirCantidad, carrito } =
    useContext(CarritoContext);
  const navigate = useNavigate();
  const [calificacion, setCalificacion] = useState(0);

  useEffect(() => {
    const fetchCalificacion = async () => {
      try {
        const response = await axios.get(`${API_BACKEND_URL}/productos/${producto.id}`);
        setCalificacion(response.data.calificacion || 0);
      } catch (error) {
        console.error("Error obteniendo calificación:", error);
      }
    };
    
    if (producto?.id) {
      fetchCalificacion();
    }
  }, [producto.id]);

  if (!producto?.id) return null;

  const { id, titulo, precio, imagen } = producto;
  const cantidad = carrito.find((p) => p.id === id)?.cantidad || 0;

  const renderEstrellas = () => {
    return [1, 2, 3, 4, 5].map((estrella) => (
      <span 
        key={estrella} 
        className={`estrella ${estrella <= calificacion ? 'llena' : 'vacia'}`}
      >
        {estrella <= calificacion ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="producto">
      <div className="imagen-container">
        <img src={imagen || "https://via.placeholder.com/150"} alt={titulo} />
        </div>

<div className="rating-container">{renderEstrellas()}</div>

<h4>{titulo}</h4>

<div className="acciones">
  <p>${Number(precio).toLocaleString("es-CL")}</p>
  <button
    className="detalle-button"
    onClick={() => navigate(`/publicacion/${id}`)}
  >
    Ver detalle
  </button>
  <div className="control-cantidad">
    <button
      onClick={() => disminuirCantidad(id)}
      disabled={cantidad === 0}
    >
      Quitar
    </button>
    <span>{cantidad}</span>
    <button
      onClick={() =>
        agregarAlCarrito({
          ...producto,
          vendedor_id: producto.usuario_id || producto.vendedor_id,
        })
      }
    >
      Agregar
    </button>
  </div>
</div>
</div>
);
}

export default CardProducto;