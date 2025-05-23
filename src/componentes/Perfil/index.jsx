import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Perfil() {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.spacexdata.com/v4/launches/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
      })
      .then((data) => {
        setLaunch(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando información...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!launch) return <p>No se encontró el lanzamiento.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{launch.name}</h2>
      <p><strong>Fecha:</strong> {new Date(launch.date_utc).toLocaleDateString()}</p>
      <p><strong>Detalles:</strong> {launch.details || 'No hay detalles disponibles.'}</p>
      <p><strong>Éxito:</strong> {launch.success ? 'Sí' : 'No'}</p>
      <p><strong>Fallo:</strong> {launch.failures && launch.failures.length > 0 ? 'Sí' : 'No'}</p>
      {launch.links && launch.links.wikipedia && (
        <p>
          <a href={launch.links.wikipedia} target="_blank" rel="noreferrer">
            Wikipedia
          </a>
        </p>
      )}
      <Link to="/busqueda">Volver a Buscar</Link>
    </div>
  );
}
