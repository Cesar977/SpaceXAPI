import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Busqueda() {
  const [launches, setLaunches] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then((res) => res.json())
      .then((data) => setLaunches(data));
  }, []);

  const filteredLaunches = launches.filter((launch) =>
    launch.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search">
      <h2>Buscar Lanzamientos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre de lanzamiento..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="results">
        {filteredLaunches.length > 0 ? (
          filteredLaunches.map((launch) => (
            <div key={launch.id} className="item">
              <Link to={`/perfil/${launch.id}`}>
                <strong>{launch.name}</strong>
              </Link>
            </div>
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}
