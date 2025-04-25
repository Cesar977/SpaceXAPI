import { useEffect, useState } from 'react';
import './style.css';

export default function Filtro() {
  const [launches, setLaunches] = useState([]);
  const [successOnly, setSuccessOnly] = useState(false); // Mostrar exitosos
  const [failureOnly, setFailureOnly] = useState(false); // Mostrar fallidos

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then((res) => res.json())
      .then((data) => setLaunches(data));
  }, []);

  // Filtrar lanzamientos según las casillas de verificación
  const filtered = launches.filter((l) => {
    if (successOnly && failureOnly) {
      return false; // No mostrar nada si ambos filtros están seleccionados
    } 
    if (successOnly) {
      return l.success === true; // Solo lanzamientos exitosos
    }
    if (failureOnly) {
      return l.success === false; // Solo lanzamientos fallidos
    }
    return true; // Mostrar todos si no se selecciona ninguno
  });

  return (
    <div className="filter">
      <h2>Filtrar Lanzamientos</h2>

      {/* Filtro para lanzamientos exitosos */}
      <label>
        <input
          type="checkbox"
          checked={successOnly}
          onChange={() => setSuccessOnly(!successOnly)}
        />
        Mostrar solo exitosos
      </label>

      {/* Filtro para lanzamientos fallidos */}
      <label>
        <input
          type="checkbox"
          checked={failureOnly}
          onChange={() => setFailureOnly(!failureOnly)}
        />
        Mostrar solo fallidos
      </label>

      {/* Mostrar los lanzamientos filtrados */}
      {filtered.map((launch) => (
        <div key={launch.id} className="item">
          <strong>{launch.name}</strong> - {launch.success ? '✅' : '❌'}
        </div>
      ))}

      {/* Mensaje si no hay lanzamientos */}
      {filtered.length === 0 && <p>No hay lanzamientos para mostrar.</p>}
    </div>
  );
}
