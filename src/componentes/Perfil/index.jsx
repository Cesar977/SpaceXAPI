import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

export default function Perfil() {
  const { id } = useParams(); // Obtener el ID desde la URL
  const [launch, setLaunch] = useState(null);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v4/launches/${id}`)
      .then((res) => res.json())
      .then((data) => setLaunch(data))
      .catch((error) => console.error('Error fetching launch details:', error));
  }, [id]);

  if (!launch) {
    return <div>Loading...</div>; // Mientras se cargan los detalles del lanzamiento
  }

  return (
    <div className="profile">
      <h2>{launch.name}</h2>
      
      {/* Mostrar imagen del lanzamiento si está disponible */}
      {launch.links && launch.links.flickr_images && launch.links.flickr_images[0] && (
        <img src={launch.links.flickr_images[0]} alt={launch.name} />
      )}
      
      <div className="details">
        <strong>Fecha del lanzamiento:</strong>
        <p>{new Date(launch.date_utc).toLocaleString()}</p>

        <strong>Descripción:</strong>
        <p>{launch.details || 'No hay descripción disponible.'}</p>

        <strong>Misión:</strong>
        <p>{launch.mission_id ? launch.mission_id : 'Sin misión asociada'}</p>
      </div>

      <div className="status">
        <strong>Estado del lanzamiento:</strong>
        <p className={launch.success ? 'success' : 'failure'}>
          {launch.success ? 'Éxito ✅' : 'Fallido ❌'}
        </p>
      </div>
    </div>
  );
}
