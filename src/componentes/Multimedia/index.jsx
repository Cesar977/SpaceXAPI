import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

function Multimedia() {
  const [multimedia, setMultimedia] = useState([]);
  const [spacexImages, setSpacexImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Obtener usuario autenticado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError('No autenticado');
        setLoading(false);
        return;
      }

      // Obtener multimedia del usuario
      const { data: userMultimedia, error: multimediaError } = await supabase
        .from('multimedia')
        .select('*')
        .eq('usuarioid', user.id);

      if (multimediaError) {
        setError('Error al cargar multimedia');
      } else {
        setMultimedia(userMultimedia);
      }

      // Obtener imágenes de SpaceX
      try {
        const response = await fetch('https://api.spacexdata.com/v3/launches');
        const launches = await response.json();
        const images = launches
          .flatMap(launch => launch.links.flickr_images)
          .filter(url => url); // Filtrar URLs no nulas
        setSpacexImages(images);
      } catch (apiError) {
        console.error('Error al obtener imágenes de SpaceX:', apiError);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p>Cargando multimedia...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Galería de SpaceX</h2>
      {spacexImages.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px',
          marginBottom: '30px',
        }}>
          {spacexImages.map((url, idx) => (
            <img key={idx} src={url} alt={`SpaceX ${idx + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
          ))}
        </div>
      ) : (
        <p>No se encontraron imágenes de SpaceX.</p>
      )}

      <h2>Mis Multimedia</h2>
      {multimedia.length === 0 ? (
        <p>No tienes multimedia guardada.</p>
      ) : (
        <ul>
          {multimedia.map(({ id, tipo, url, descripcion }) => (
            <li key={id}>
              <p>{descripcion || 'Sin descripción'}</p>
              {tipo === 'imagen' && url ? (
                <img src={url} alt={descripcion || 'Imagen'} style={{ maxWidth: '300px' }} />
              ) : url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              ) : (
                <span>Sin contenido</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Multimedia;
