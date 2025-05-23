import './style.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const noticias = [
    {
      titulo: 'SpaceX lanza 60 satélites Starlink',
      fecha: '22 de mayo, 2025',
      resumen: 'SpaceX lanzó con éxito 60 satélites para su constelación Starlink desde Cabo Cañaveral.',
    },
    {
      titulo: 'Nuevo vuelo tripulado a la EEI',
      fecha: '18 de mayo, 2025',
      resumen: 'La misión Crew-9 transportó a 4 astronautas a la Estación Espacial Internacional.',
    },
  ];

  return (
    <div className="home-container">
      <div className="overlay">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg"
          alt="SpaceX Logo"
          className="spacex-logo"
        />
        <h1 className="title">Bienvenido a SpaceX Explorer 🚀</h1>
        <p className="subtitle">
          Tu portal para explorar el universo SpaceX: lanzamientos, misiones, multimedia exclusiva y más.
        </p>
        <div className="button-group">
          <button onClick={() => navigate('/multimedia')}>Galería</button>
          <button onClick={() => navigate('/agregar')} className="outline">Agregar imagen</button>
          <button onClick={() => navigate('/login')} className="secondary">Iniciar sesión</button>
        </div>
      </div>

      <section className="noticias">
        <h2>📰 Últimas noticias</h2>
        <ul>
          {noticias.map((n, i) => (
            <li key={i}>
              <h3>{n.titulo}</h3>
              <p><strong>{n.fecha}</strong></p>
              <p>{n.resumen}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
