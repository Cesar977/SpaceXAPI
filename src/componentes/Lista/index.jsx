import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Lista() {
  const [launches, setLaunches] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return new Set(savedFavorites.map(f => f.id)); // Usar Set para almacenar solo los IDs
  });

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then(res => res.json())
      .then(data => setLaunches(data.slice(0, 20))); // Limitar a los primeros 20 lanzamientos
  }, []);

  const toggleFavorite = (launch) => {
    const updated = new Set(favorites);
    if (updated.has(launch.id)) {
      updated.delete(launch.id);
    } else {
      updated.add(launch.id);
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(Array.from(updated))); // Guardar favoritos en localStorage
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formato de fecha amigable
  };

  return (
    <div className="list">
      <h2>Lanzamientos</h2>
      {launches.map(launch => (
        <div key={launch.id} className="item">
          <Link to={`/perfil/${launch.id}`} className="launch-link">
            <strong>{launch.name}</strong>
          </Link>
          <span>{formatDate(launch.date_utc)}</span>
          <button onClick={() => toggleFavorite(launch)}>
            {favorites.has(launch.id) ? '★' : '☆'}
          </button>
        </div>
      ))}
    </div>
  );
}
