import { useLocation } from 'react-router-dom';
import SidebarPerfil from "../components/SidebarPerfil";  
import "../assets/css/ResumenCompra.css"

const ResumenCompra = () => {
    const location = useLocation();
    const { carrito, total } = location.state || {};
  
    if (!carrito || carrito.length === 0) {
      return (
        <div className="resumen-compra-container">
          <div className="resumen-compra-main">
            <p>No hay productos en tu compra.</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="resumen-compra-container">
        <SidebarPerfil />
        <div className="resumen-compra-main">
          <h2>¡Compra realizada con éxito!</h2>
          <p className="resumen-mensaje">Gracias por tu compra. Aquí está tu resumen:</p>
          
          <div className="productos-comprados">
            {carrito.map((item) => (
              <div key={item.id} className="producto-item">
                <img src={item.imagen || item.image} alt={item.title || item.titulo} />
                <div className="producto-info">
                  <h4>{item.title || item.titulo}</h4>
                  <p><strong>Talla:</strong> {item.talla || 'S'}</p>
                  <p><strong>Cantidad:</strong> {item.cantidad}</p>
                  <p><strong>Precio:</strong> ${Number(item.precio).toLocaleString("es-CL")}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="resumen-total">
            <h3>Total: ${Number(total).toLocaleString("es-CL")}</h3>
          </div>
        </div>
      </div>
    );
  };
  
  export default ResumenCompra;