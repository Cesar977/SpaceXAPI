import { useEffect, useState } from 'react';
import './style.css';

export default function Busqueda() {
  const [search, setSearch] = useState('');
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then(res => res.json())
      .then(data => setLaunches(data));
  }, []);

  const results = launches.filter(launch =>
    launch.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search">
      <h2>Buscar Lanzamiento</h2>
      <input
        type="text"
        placeholder="Escribe un nombre..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {results.map(launch => (
          <li key={launch.id}>{launch.name}</li>
        ))}
      </ul>
    </div>
  );
}
