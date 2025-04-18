import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../../auth/components/AuthLayout';
import ShipmentFormTitle from '../components/ShipmentFormTitle';

interface Route {
  id: number;
  origen: string;
  destino: string;
  carrier: {
    nombre: string;
  };
  capacidad: number;
}

const AssignShipmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutes = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/shipments/routes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setRoutes(data);
    };
    fetchRoutes();
  }, []);
  if (!id) return null;
  const handleAssign = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/shipments/${id}/assign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ routeId: parseInt(selectedRoute) }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || 'Error');

      setMessage('Ruta asignada correctamente');
      setMessageType('success');

      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (error: any) {
      setMessage(error.message);
      setMessageType('error');
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
        <ShipmentFormTitle
          title="Asignar Ruta"
          subtitle="Selecciona una ruta para este envío"
        />

        {message && (
          <div
            className={`px-4 py-2 text-center rounded-lg font-medium ${messageType === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
              }`}
          >
            {message}
          </div>
        )}

        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="px-4 py-2 border rounded-lg text-black"
        >
          <option value="">Seleccionar ruta</option>
          {routes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.origen} → {r.destino} ({r.carrier.nombre})
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          disabled={!selectedRoute}
          className="px-4 py-2 rounded-lg bg-white text-[#0057C8] font-semibold border hover:bg-[#0057C8] hover:text-white transition"
        >
          Asignar ruta
        </button>
      </div>
    </AuthLayout>
  );
};

export default AssignShipmentPage;
