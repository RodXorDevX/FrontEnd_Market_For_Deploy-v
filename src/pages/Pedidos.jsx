import { useEffect, useState, useContext } from "react";
import SidebarPerfil from "../components/SidebarPerfil";
import { AuthContext } from "../context/AuthContext";
import { API_BACKEND_URL } from "../config";
import "../assets/css/Pedidos.css";

export default function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mostrarOpciones, setMostrarOpciones] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (!usuario) return;
    const vendedorId = usuario.usuario.id;

    fetch(`${API_BACKEND_URL}/pedidos?vendedor_id=${vendedorId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPedidos(data);
        } else {
          setError(data.error || "Error desconocido");
        }
      })
      .catch((err) => {
        console.error("Error al obtener los pedidos:", err);
        setError("Error al obtener los pedidos.");
      })
      .finally(() => setLoading(false));
  }, [usuario]);

  const toggleOpciones = (pedidoId) => {
    setMostrarOpciones((prev) => ({
      ...prev,
      [pedidoId]: !prev[pedidoId],
    }));
  };

  const handleStatusChange = async (pedidoId, nuevoEstado) => {
    try {
      const res = await fetch(`${API_BACKEND_URL}/pedidos/${pedidoId}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Error al actualizar estado");
      }
  
      // Actualiza el estado en frontend
      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === pedidoId ? { ...pedido, status: data.status } : pedido
        )
      );
  
      // Oculta opciones luego del cambio
      setMostrarOpciones((prev) => ({ ...prev, [pedidoId]: false }));
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  if (loading) return <div>Cargando pedidos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pedidos-container">
      <SidebarPerfil />
      <div className="pedidos-content">
        <h1>LISTADO DE PEDIDOS</h1>
        <div className="pedidos-list">
          {pedidos.map((pedido) => {
            const estadoActual = pedido.status || "Pendiente";
            const opciones = ["Pendiente", "Entregado", "Cancelado"].filter(
              (estado) => estado !== estadoActual
            );

            return (
              <div key={pedido.id} className="pedido-box">
                <img className="pedido-img" src={pedido.imagen} alt={pedido.titulo} />
                <div className="pedido-info">
                  <div className="pedido-texto">
                    <h4>{pedido.titulo}</h4>
                    {pedido.size && <p className="talla">Talla {pedido.size}</p>}
                    <p>Comprado por: {pedido.usuario_nombre}</p>
                    <p>{pedido.cantidad} unidades</p>
                    <p>{new Date(pedido.created_at).toLocaleDateString("es-CL")}</p>
                    <p className="precio">${Number(pedido.total).toLocaleString("es-CL")}</p>
                  </div>
                  <div className="pedido-estado">
                    <button
                      className={`estado-btn ${estadoActual.toLowerCase()}`}
                      onClick={() => toggleOpciones(pedido.id)}
                    >
                      {estadoActual}
                    </button>

                    {mostrarOpciones[pedido.id] && (
                      <div className="estado-opciones">
                        {opciones.map((opcion) => (
                          <button
                            key={opcion}
                            className={`estado-btn ${opcion.toLowerCase()}`}
                            onClick={() => handleStatusChange(pedido.id, opcion)}
                          >
                            {opcion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
