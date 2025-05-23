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

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <div style={{ paddingBottom: '60px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bottomnav" element={<BottomNav />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/lista" element={usuario ? <Lista /> : <Navigate to="/login" />} />
        <Route path="/filtro" element={usuario ? <Filtro /> : <Navigate to="/login" />} />
        <Route path="/busqueda" element={usuario ? <Busqueda /> : <Navigate to="/login" />} />
        <Route path="/favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
        <Route path="/perfil/" element={usuario ? <Perfil /> : <Navigate to="/login" />} />
        <Route path="/usuarios" element={usuario ? <Usuarios /> : <Navigate to="/login" />} />
        <Route path="/multimedia" element={usuario ? <Multimedia /> : <Navigate to="/login" />} />  
        <Route path="/administrador" element={usuario ? <Administrador /> : <Navigate to="/login" />} />
      </Routes>

      {!['/login', '/registro'].includes(location.pathname) && <BottomNav />}
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