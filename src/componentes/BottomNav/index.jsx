import { Link } from "react-router-dom";
import "./style.css";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/">Inicio</Link>
      <Link to="/lista">Lanzamientos</Link>
      <Link to="/filtro">Filtro</Link>
      <Link to="/busqueda">Buscar</Link>
      <Link to="/favoritos">Favoritos</Link>
    </nav>
  );
}
