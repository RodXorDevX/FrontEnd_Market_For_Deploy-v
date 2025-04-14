import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function RutaProtegida({ children }) {
  const { usuario } = useContext(AuthContext);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCargando(false);
    }, 100); // Tiempo breve para permitir que se cargue el usuario desde localStorage
  }, []);

  if (cargando) return null;

  return usuario ? children : <Navigate to="/login" />;
}

export default RutaProtegida;
