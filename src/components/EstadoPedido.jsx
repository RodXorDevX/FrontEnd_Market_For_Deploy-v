import { useEffect, useState, useContext } from "react";
import SidebarPerfil from "../components/SidebarPerfil";
import { AuthContext } from "../context/AuthContext";
import { API_BACKEND_URL } from "../config";
import "../assets/css/pedidos.css";

export default function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useContext(AuthContext);
  const [pedidoAbierto, setPedidoAbierto] = useState(null); // para mostrar opciones de estado solo en 1

  useEffect(() => {
    if (!usuario) return;
    const vendedorId = usuario.usuario.id;

    fetch(`${API_BACKEND_URL}/pedidos?vendedor_id=${vendedorId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPedidos(data);
        } else {
          setError(data.error || "Error desconocido");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los pedidos:", error);
        setError("Hubo un problema al obtener los pedidos.");
      })
      .finally(() => setLoading(false));
  }, [usuario]);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      const response = await fetch(`${API_BACKEND_URL}/pedidos/${id}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!response.ok) throw new Error("Error al actualizar estado");

      const data = await response.json();

      // Actualiza el pedido localmente
      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === id ? { ...pedido, status: data.pedido.status } : pedido
        )
      );
      setPedidoAbierto(null); // Oculta las opciones después de cambiar
    } catch (err) {
      console.error("Error actualizando estado:", err);
      alert("Error actualizando el estado del pedido");
    }
  };

  if (loading) return <div>Cargando pedidos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pedidos-container">
      <SidebarPerfil />
      <div className="pedidos-content">
        <h1>LISTADO DE PEDIDOS</h1>

        {pedidos.length === 0 ? (
          <p>No tienes pedidos.</p>
        ) : (
          <div className="pedidos-list">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="pedido-box">
                <img
                  className="pedido-img"
                  src={pedido.imagen}
                  alt={pedido.titulo}
                />
                <div className="pedido-info">
                  <div className="pedido-texto">
                    <h4>{pedido.titulo}</h4>
                    {pedido.size && <p className="talla">Talla {pedido.size}</p>}
                    <p>Comprado por: {pedido.usuario_nombre}</p>
                    <p>{pedido.cantidad} unidades</p>
                    <p>{new Date(pedido.created_at).toLocaleDateString("es-CL")}</p>
                    <p className="precio">
                      ${Number(pedido.total).toLocaleString("es-CL")}
                    </p>
                  </div>

                  <div className="pedido-estado">
                    <button
                      className={`estado-btn ${pedido.status.toLowerCase()}`}
                      onClick={() =>
                        setPedidoAbierto(
                          pedidoAbierto === pedido.id ? null : pedido.id
                        )
                      }
                    >
                      {pedido.status}
                    </button>

                    {pedidoAbierto === pedido.id && (
                      <div className="estado-opciones">
                        <button
                          className="estado-btn entregado"
                          onClick={() => cambiarEstado(pedido.id, "Entregado")}
                        >
                          Entregado
                        </button>
                        <button
                          className="estado-btn cancelado"
                          onClick={() => cambiarEstado(pedido.id, "Cancelado")}
                        >
                          Cancelado
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
