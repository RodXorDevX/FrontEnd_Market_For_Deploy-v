import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import FormularioPublicacion from './pages/FormularioPublicacion';
import Register from './pages/Register';
import MiPerfil from './pages/MiPerfil';
import DetallePublicacion from './pages/DetallePublicacion';
import Navbar from './components/Navbar';
import RutaProtegida from './components/RutaProtegida';
import Carrito from './pages/Carrito';
import Footer from './components/Footer';
import Publicaciones from './pages/Publicaciones';
import Pedidos from './pages/Pedidos';
import ResumenCompra from './components/ResumenCompra';  // Esto se añade en tu versión
import CardProducto from './components/CardProducto';  // Esto se añade en la versión remota
import EditarProducto from './components/EditarProducto';  // Esto se añade en la versión remota
import MisCompras from './pages/MisCompras';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/resumen-compra" element={<ResumenCompra />} />
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <MiPerfil />
            </RutaProtegida>
          }
        />
        <Route path="/publicacion/:id" element={<DetallePublicacion />} />
        <Route
          path="/carrito"
          element={
            <RutaProtegida>
              <Carrito />
            </RutaProtegida>
          }
        />
        <Route
          path="/publicar"
          element={
            <RutaProtegida>
              <FormularioPublicacion />
            </RutaProtegida>
          }
        />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route
          path="/pedidos"
          element={
            <RutaProtegida>
              <Pedidos />
            </RutaProtegida>
          }
        />
        <Route path="/productos/:id" element={<CardProducto />} />
        <Route path="/productos/:id/editar" element={<EditarProducto />} />
        <Route path="/compras" element={<MisCompras />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
