import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

export default function Perfil() {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);
  const [rocket, setRocket] = useState(null); // Para almacenar los detalles del cohete
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v4/launches/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLaunch(data);
        // Obtener los detalles del cohete utilizando el id del cohete
        if (data.cores[0]?.rocket) {
          fetch(`https://api.spacexdata.com/v4/rockets/${data.cores[0].rocket}`)
            .then((res) => res.json())
            .then((rocketData) => setRocket(rocketData));
        }
      });
  }, [id]);

  if (!launch) return <p>Cargando detalles...</p>;
  if (!rocket) return <p>Cargando información de la nave...</p>;

  const handleGoBack = () => {
    navigate('/busqueda');
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2 className="perfil-title">{launch.name}</h2>
        <div className="perfil-info">
          <p><strong>Fecha:</strong> {new Date(launch.date_utc).toLocaleString()}</p>
          <p><strong>Éxito:</strong> {launch.success ? 'Exitoso' : 'Fallido'}</p>
          <p><strong>Detalles:</strong> {launch.details || 'Sin detalles disponibles.'}</p>
          <h3>Cohete: {rocket.name}</h3>
          <p><strong>Tipo de cohete:</strong> {rocket.type}</p>
          <p><strong>Descripción del cohete:</strong> {rocket.description || 'Sin descripción del cohete.'}</p>
        </div>

        <div className="perfil-actions">
          <button className="btn-back" onClick={handleGoBack}>Volver a la Búsqueda</button>
        </div>
      </div>
    </div>
  );
}
