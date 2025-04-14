import { createContext, useState, useEffect } from "react";

// Creamos el contexto
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id && item.talla === producto.talla
      );

      if (productoExistente) {
        // Check if we have enough stock
        if (productoExistente.cantidad >= (producto.stock || producto.cantidad_disponible || Infinity)) {
          alert('No hay suficiente stock disponible');
          return prevCarrito;
        }
        return prevCarrito.map((item) =>
          item.id === producto.id && item.talla === producto.talla
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para disminuir la cantidad de productos en el carrito
  const disminuirCantidad = (productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0) // Elimina si queda en 0
    );
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);  // Vacía el carrito
    localStorage.removeItem('carrito'); // Limpia el localStorage
  };

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + parseFloat(item.price || item.precio) * item.cantidad,
      0
    );
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, disminuirCantidad, vaciarCarrito, calcularTotal }}>
      {children}
    </CarritoContext.Provider>
  );
};
