// src/componentes/Agregar.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

function Agregar() {
  const [usuario, setUsuario] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [nuevaUrl, setNuevaUrl] = useState('');

  useEffect(() => {
    async function cargarUsuarioYMultimedia() {
      const { data: { user } } = await supabase.auth.getUser();
      setUsuario(user);

      if (user) {
        const { data, error } = await supabase
          .from('multimedia')
          .select('*')
          .eq('usuarioid', user.id);

        if (!error) {
          setImagenes(data);
        }
      }
    }

    cargarUsuarioYMultimedia();
  }, []);

  const handleAgregarUrl = async () => {
    if (!nuevaUrl.trim() || !usuario) return;

    const { data, error } = await supabase.from('multimedia').insert([{
      url: nuevaUrl,
      tipo: 'imagen',
      descripcion: 'Agregada manualmente',
      usuarioid: usuario.id,
    }]);

    if (!error && data) {
      setImagenes((prev) => [...prev, ...data]);
      setNuevaUrl('');
    } else {
      alert('Error al guardar la imagen');
    }
  };

  const handleEliminarImagen = async (id) => {
    const { error } = await supabase.from('multimedia').delete().eq('id', id);
    if (!error) {
      setImagenes(imagenes.filter((img) => img.id !== id));
    } else {
      alert('No se pudo eliminar');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Agregar Imagen</h2>
      <input
        type="text"
        placeholder="URL de la imagen"
        value={nuevaUrl}
        onChange={(e) => setNuevaUrl(e.target.value)}
      />
      <button onClick={handleAgregarUrl}>Agregar</button>

      <h3>Imágenes guardadas</h3>
      <ul>
        {imagenes.map((img) => (
          <li key={img.id}>
            <img src={img.url} alt="Imagen" width="150" />
            <br />
            <button onClick={() => handleEliminarImagen(img.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Agregar;
