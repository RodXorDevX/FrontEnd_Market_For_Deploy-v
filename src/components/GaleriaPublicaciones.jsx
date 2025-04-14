import { useEffect, useState } from "react";
import axios from "axios";
import CardProducto from "./CardProducto";
import MenuCategorias from "./MenuCategorias";
import { API_BACKEND_URL } from "../config";
import "../assets/css/GaleriaPublicaciones.css";

function GaleriaPublicaciones({ search }) {
  const [productos, setProductos] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState("all");

  const mapCategoriaIdToNombre = {
    1: "hombre",
    2: "mujer",
    3: "accesorios",
    4: "tecnología"
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const backendRes = await axios.get(`${API_BACKEND_URL}/productos`);
        // console.log('Datos recibidos del backend:', backendRes.data); 
        const productosBackend = backendRes.data.data || backendRes.data;
        setProductos(productosBackend);
      } catch (err) {
        console.error("Error al obtener productos", err);
      }
    };
  
    fetchProductos();
  }, []);
  const productosFiltrados = productos.filter((item) => {
    const titulo = item.titulo || "";
    const categoriaTexto = mapCategoriaIdToNombre[item.categoria_id] || "";
    const matchesSearch = titulo.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoriaActual === "all" || categoriaTexto === categoriaActual;
  
    return matchesSearch && matchesCategory;
  });
  
  // console.log("Productos filtrados:", productosFiltrados);

  return (
    <div className="galeria-container">
      <MenuCategorias onSelectCategory={setCategoriaActual} />
      <div className="galeria-publicaciones">
        {productosFiltrados.map((item, index) => (
         <CardProducto key={item.id || index} producto={item} />
        ))}
      </div>
    </div>
  );
}

export default GaleriaPublicaciones;
