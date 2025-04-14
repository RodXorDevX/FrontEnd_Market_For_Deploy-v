import "../assets/css/FormularioPublicacion.css";
import axios from "axios";
import { useState } from "react";
import { API_BACKEND_URL } from "../config";

function FormularioPublicacion() {
  const [imagen, setImagen] = useState("");
  const [urlImagen, setUrlImagen] = useState("");

  const [formData, setFormData] = useState({
    titulo: "",
    precio: "",
    categoria: "",     
    descripcion: "",
    stock: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUrlChange = (e) => {
    setUrlImagen(e.target.value);
  };

  const agregarImagen = () => {
    if (!urlImagen.trim()) return;
    setImagen(urlImagen);
    setUrlImagen("");
  };

  const eliminarImagen = () => {
    setImagen("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   // console.log('Datos del formulario:', formData);
   // console.log('URL de la imagen:', imagen);
  
    const token = localStorage.getItem("token"); 
    const userId = localStorage.getItem("userId"); 
    
    //console.log('Token:', token ? 'Presente' : 'Ausente');
   // console.log('User ID:', userId);
  
    const mapCategoria = {
      hombre: 1,
      mujer: 2,
      accesorios: 3,
      tecnologia: 4,
    };
  
    const productoFinal = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      categoria_id: mapCategoria[formData.categoria],      
      stock: parseInt(formData.stock),
      imagen: imagen || null,
      vendedor_id: parseInt(userId),
    };
    
   // console.log('Producto a enviar:', productoFinal);
  
    axios
      .post(`${API_BACKEND_URL}/productos`, productoFinal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
      //  console.log('Respuesta del servidor:', response.data);
        alert("¡Publicación creada!");
      })
      .catch((err) => {
       // console.error('Error al publicar:', err);
      //  console.error('Detalles del error:', err.response?.data);
        alert("Error al publicar.");
      });
  };

  return (
    <div className="formulario-publicacion-container">
      <div className="imagenes-publicacion">
        <div className="imagen-y-miniaturas">
          <div className="zona-principal">
            {imagen ? (
              <>
                <img src={imagen} alt="Principal" />
                <button
                  className="boton-eliminar"
                  onClick={eliminarImagen}
                >
                  ×
                </button>
              </>
            ) : (
              <div className="texto-overlay">AÑADIR FOTO</div>
            )}
          </div>
        </div>

        <p className="titulo-imagenes">Añadir imagen mediante URL</p>
        <div className="url-input-container">
          <input
            type="url"
            value={urlImagen}
            onChange={handleUrlChange}
            placeholder="Pega aquí la URL de la imagen"
            className="url-input"
          />
          <button onClick={agregarImagen} className="agregar-url-btn">
            Añadir
          </button>
        </div>
        <p className="texto-info">
          Añade 1 imagen usando URL de internet
        </p>
      </div>

      <div className="formulario-container">
        <h2>FORMULARIO DE PUBLICACIÓN</h2>
        <form onSubmit={handleSubmit}>
          <div className="grupo-input">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Título del producto"
              value={formData.titulo}
              onChange={handleChange}
            />
          </div>

          <div className="grupo-input">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </div>

          <div className="grupo-input">
            <label htmlFor="stock">Cantidad de Productos</label>
            <select
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            >
              {[...Array(55).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="grupo-input">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="">Selecciona categoría</option>
              <option value="hombre">Ropa de Hombre</option>
              <option value="mujer">Ropa de Mujer</option>
              <option value="accesorios">Accesorios</option>
              <option value="tecnologia">Tecnología</option>
            </select>
          </div>

          <div className="grupo-input">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="boton-publicar">
            PUBLICAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioPublicacion;