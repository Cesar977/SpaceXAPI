import { useEffect, useState } from 'react';
import './style.css';

export default function Lista() {
  const [launches, setLaunches] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then(res => res.json())
      .then(data => setLaunches(data.slice(0, 20))); // solo los primeros 20 lanzamientos
  }, []);

  const toggleFavorite = (launch) => {
    const isFavorite = favorites.some(f => f.id === launch.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(f => f.id !== launch.id);
    } else {
      updatedFavorites = [...favorites, launch];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id) => {
    return favorites.some(f => f.id === id);
  };

  return (
    <div className="list">
      <h2>🚀 Lanzamientos</h2>
      {launches.map(launch => (
        <div key={launch.id} className="item">
          <div>
            <strong>{launch.name}</strong>
            <p>{launch.date_utc.split('T')[0]}</p>
          </div>
          <button onClick={() => toggleFavorite(launch)}>
            {isFavorite(launch.id) ? '★' : '☆'}
          </button>
        </div>
      ))}
    </div>
  );
}
