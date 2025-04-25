import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './componentes/BottomNav';
import Home from './componentes/Home';
import Lista from './componentes/Lista';
import Filtro from './componentes/Filtro';
import Busqueda from './componentes/Busqueda';
import Favoritos from './componentes/Favoritos';
import Perfil from './componentes/Perfil'; // Importar el Perfil

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: '60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="/filtro" element={<Filtro />} />
          <Route path="/busqueda" element={<Busqueda />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/perfil/:id" element={<Perfil />} /> {/* Ruta dinámica */}
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
