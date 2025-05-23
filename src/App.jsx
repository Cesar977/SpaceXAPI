import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from './supabase';

import BottomNav from './componentes/BottomNav';
import Home from './componentes/Home';
import Lista from './componentes/Lista';
import Filtro from './componentes/Filtro';
import Busqueda from './componentes/Busqueda';
import Favoritos from './componentes/Favoritos';
import Perfil from './componentes/Perfil';
import Usuarios from './componentes/Usuarios';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import Multimedia from './componentes/Multimedia';
import Administrador from './componentes/Administrador';
import Agregar from './componentes/Agregar';
// Componente para rutas protegidas
function RutaPrivada({ usuario, children }) {
  return usuario ? children : <Navigate to="/login" />;
}

function AppContent() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }

    verificarSesion();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  if (cargando) return <p>Cargando...</p>;

  const ocultarBottomNav = ['/login', '/registro'].includes(location.pathname);

  return (
    <div style={{ paddingBottom: '60px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bottomnav" element={<BottomNav />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/agregar" element={usuario ? <Agregar /> : <Navigate to="/login" />} />
        <Route path="/perfil/:id" element={<Perfil />} />

        <Route path="/lista" element={<RutaPrivada usuario={usuario}><Lista /></RutaPrivada>} />
        <Route path="/filtro" element={<RutaPrivada usuario={usuario}><Filtro /></RutaPrivada>} />
        <Route path="/busqueda" element={<RutaPrivada usuario={usuario}><Busqueda /></RutaPrivada>} />
        <Route path="/favoritos" element={<RutaPrivada usuario={usuario}><Favoritos /></RutaPrivada>} />
        <Route path="/usuarios" element={<RutaPrivada usuario={usuario}><Usuarios /></RutaPrivada>} />
        <Route path="/multimedia" element={<RutaPrivada usuario={usuario}><Multimedia /></RutaPrivada>} />
        <Route path="/administrador" element={<RutaPrivada usuario={usuario}><Administrador /></RutaPrivada>} />
    
      </Routes>

      {!ocultarBottomNav && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
