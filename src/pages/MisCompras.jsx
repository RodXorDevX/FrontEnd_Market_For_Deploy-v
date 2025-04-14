import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SidebarPerfil from "../components/SidebarPerfil";
import { AuthContext } from "../context/AuthContext";
import { API_BACKEND_URL } from "../config";
import axios from "axios";
import "../assets/css/MisCompras.css";

const EstrellasCalificacion = ({ calificacion, onCalificar, productoId }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="estrellas-calificacion">
      {[1, 2, 3, 4, 5].map((estrella) => (
        <span
          key={estrella}
          className={`estrella ${(hoverRating || calificacion) >= estrella ? "activa" : ""}`}
          onClick={() => onCalificar(productoId, estrella)}
          onMouseEnter={() => setHoverRating(estrella)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const MisCompras = () => {
  const { usuario } = useContext(AuthContext);
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [calificaciones, setCalificaciones] = useState({});

  const handleCalificar = async (productoId, nuevaCalificacion) => {
    try {
      const calificacionActual = calificaciones[productoId]?.calificacion || 0;
      const promedio = calificacionActual 
        ? Math.round((calificacionActual + nuevaCalificacion) / 2)
        : nuevaCalificacion;
      
      await axios.put(`${API_BACKEND_URL}/productos/${productoId}`, { 
        calificacion: promedio 
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setCalificaciones(prev => ({
        ...prev,
        [productoId]: { calificacion: nuevaCalificacion }
      }));
      alert("Producto calificado con éxito");
    } catch (error) {
      console.error("Error al calificar producto:", error);
      alert(error.response?.data?.message || "Error al calificar el producto");
    }
  };

  useEffect(() => {
    const fetchCompras = async () => {
      if (!usuario?.usuario?.id) return;

      try {
        const response = await fetch(`${API_BACKEND_URL}/pedidos?usuario_id=${usuario.usuario.id}`)

        const data = await response.json();

        // Agrupar productos por compra
        const comprasAgrupadas = {};

        data.forEach((item) => {
          if (!comprasAgrupadas[item.id]) {
            comprasAgrupadas[item.id] = {
              id: item.id,
              created_at: item.created_at,
              status: item.status,
              total: item.total,
              productos: [],
            };
          }

          comprasAgrupadas[item.id].productos.push({
            titulo: item.titulo,
            imagen: item.imagen,
            cantidad: item.cantidad,
            precio: item.precio_unitario,
            id: item.producto_id,
          });
        });

        setCompras(Object.values(comprasAgrupadas));
      } catch (error) {
        console.error("Error al obtener las compras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, [usuario?.usuario?.id]);

  return (
    <div className="perfil-contenidor">
      <SidebarPerfil />
      <div className="compras-contenido">
        <h2>Mis Compras </h2>

        {loading ? (
          <p>Cargando compras...</p>
        ) : compras.length === 0 ? (
          <div className="sin-compras">
            <p>No has realizado ninguna compra.</p>
            <button
              className="btn-ver-productos"
              onClick={() => navigate("/publicaciones")}
            >
              Revisa nuestros productos aquí
            </button>
          </div>
        ) : (
          compras.map((compra) => (
            <div key={compra.id} className="tarjeta-compra">
              <div className="compra-encabezado">
                <span
                  className={`estado ${
                    compra.status ? compra.status.toLowerCase() : "pendiente"
                  }`}
                >
                  {compra.status || "Pendiente"}
                </span>
              </div>

              <p className="fecha-compra">
                Fecha: {new Date(compra.created_at).toLocaleDateString("es-CL")}
              </p>

              <div className="productos-comprados">
                {compra.productos.map((producto, index) => (
                  <div key={index} className="producto-item">
                    <img
                      src={producto.imagen || "https://via.placeholder.com/80"}
                      alt={producto.titulo}
                      className="producto-imagen"
                    />
                    <div className="producto-detalle">
                      <p><strong>{producto.titulo}</strong></p>
                      <p>Cantidad: {producto.cantidad}</p>
                      <p>Precio: ${Number(producto.precio).toLocaleString("es-CL")}</p>
                      <EstrellasCalificacion 
                        calificacion={calificaciones[producto.id]?.calificacion || 0} 
                        onCalificar={handleCalificar} 
                        productoId={producto.id} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="resumen-total">
                <h4>Total: ${Number(compra.total).toLocaleString("es-CL")}</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MisCompras;
