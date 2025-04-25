import { useEffect, useState } from 'react';
import './style.css';

export default function Favoritos() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  const clearFavorites = () => {
    localStorage.removeItem('favorites');
    setFavorites([]);
  };

  return (
    <div className="favorites">
      <h2>🚀 Favoritos</h2>

      {favorites.length === 0 ? (
        <p>No hay favoritos aún.</p>
      ) : (
        <>
          <button className="clear-btn" onClick={clearFavorites}>
            Limpiar favoritos
          </button>

          {favorites.map(fav =>
            fav && fav.name && fav.date_utc ? (
              <div key={fav.id} className="item">
                <strong>{fav.name}</strong> ({fav.date_utc.split('T')[0]})
              </div>
            ) : null
          )}
        </>
      )}
    </div>
  );
}
