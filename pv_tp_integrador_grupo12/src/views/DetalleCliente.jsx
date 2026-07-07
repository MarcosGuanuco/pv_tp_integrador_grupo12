import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

export default function DetalleCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/${id}`)
      .then(res => res.json())
      .then(data => setCliente(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleEliminar = () => {
    const confirmar = window.confirm(`¿Seguro que deseas eliminar a ${cliente.name.firstname}?`);
    if (!confirmar) return;

    fetch(`https://fakestoreapi.com/users/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          alert('Cliente eliminado con éxito (Simulación DELETE realizada)');
          navigate('/clientes');
        }
      })
      .catch(err => console.error(err));
  };

  if (!cliente) return <p>Cargando datos detallados...</p>;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <button onClick={() => navigate('/clientes')} style={{ marginBottom: '20px', cursor: 'pointer' }}>
        ← Volver a la Lista
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ textTransform: 'capitalize', color: '#1976d2', margin: 0 }}>
          {cliente.name?.firstname} {cliente.name?.lastname}
        </h1>
        
        {admin?.sector === 'Gerencia' && (
          <button 
            onClick={handleEliminar} style={{ backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            ❌ Eliminar Cliente de la Base de Datos
          </button>
        )}
      </div>

      <p><strong>ID de Cliente:</strong> {cliente.id}</p>
      
      <hr />

      <h3>📞 Información de Contacto</h3>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Teléfono:</strong> {cliente.phone}</p>

      <h3>🔑 Credenciales de Acceso (Base de Datos)</h3>
      <p><strong>Usuario (Username):</strong> {cliente.username}</p>
      <p><strong>Contraseña (Password):</strong> {cliente.password}</p>

      <h3>🏠 Dirección Completa</h3>
      <p style={{ textTransform: 'capitalize' }}>
        <strong>Calle y Número:</strong> {cliente.address?.street} N° {cliente.address?.number}
      </p>
      <p style={{ textTransform: 'capitalize' }}>
        <strong>Ciudad:</strong> {cliente.address?.city}
      </p>
      <p>
        <strong>Código Postal (Zipcode):</strong> {cliente.address?.zipcode}
      </p>
    </div>
  );
}