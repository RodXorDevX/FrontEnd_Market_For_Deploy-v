import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BACKEND_URL } from "../config";
import "../assets/css/Login.css";
import loginImg from "../assets/img/Register/LoginPic.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API_BACKEND_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const userData = await response.json();
      
      // Crear objeto con el formato esperado por el contexto
      const datosUsuario = {
        token: userData.token, // ← token real que viene del backend
        usuario: userData.usuario // ← objeto usuario completo
      };
      

      login(datosUsuario);

      localStorage.setItem("token", userData.token);
      localStorage.setItem("userId", userData.usuario.id);

      navigate("/perfil");
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el inicio de sesión');
    }
  };

  return (
    <div className="login-container">
      <div className="box">
        <div className="login-img">
          <img 
            src={loginImg} 
            alt="Promo login" 
            style={{ 
              maxWidth: '80%', 
              height: 'auto',
              marginBottom: '20px'
            }} 
          />
        </div>

        <div className="login-form">
          <h2 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)' }}>INICIO DE SESIÓN</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', fontSize: '16px' }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', fontSize: '16px' }}
            />
            <button 
              type="submit"
              style={{ 
                width: '100%', 
                padding: '12px',
                fontSize: '16px',
                marginTop: '15px'
              }}
            >
              INICIAR SESIÓN
            </button>
          </form>
          <p className="registro-link" style={{ textAlign: 'center', marginTop: '20px' }}>
            ¿No tienes cuenta? <span onClick={() => navigate("/registro")}>Regístrate aquí</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;