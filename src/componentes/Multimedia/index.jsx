import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';


function Multimedia() {
  const [multimedia, setMultimedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMultimedia() {
      setLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError('No autenticado');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('multimedia')
        .select('*')
        .eq('usuarioid', user.id);

      if (error) {
        setError('Error al cargar multimedia');
      } else {
        setMultimedia(data);
      }
      setLoading(false);
    }
    fetchMultimedia();
  }, []);

  if (loading) return <p>Cargando multimedia...</p>;
  if (error) return <p>{error}</p>;
  if (multimedia.length === 0) return <p>No tienes multimedia guardada.</p>;

  return (
    <div>
      <h2>Mis Multimedia</h2>
      <ul>
        {multimedia.map(({ id, tipo, url, descripcion }) => (
          <li key={id}>
            <p>{descripcion}</p>
            {tipo === 'imagen' ? (
              <img src={url} alt={descripcion} style={{ maxWidth: '300px' }} />
            ) : (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Multimedia;
