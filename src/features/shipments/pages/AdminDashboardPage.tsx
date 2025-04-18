import { useEffect, useState } from 'react';
import AuthLayout from '../../auth/components/AuthLayout';
import ShipmentFormTitle from '../components/ShipmentFormTitle';
import { getAllShipments, updateShipmentStatus } from '../services/shipmentService';
import { Link, useNavigate } from 'react-router-dom';
import ShipmentLayout from '../components/ShipmentLayout';

interface Shipment {
  id: number;
  peso: number;
  dimensiones: string;
  tipoProducto: string;
  direccion: string;
  estado: string;
  createdAt: string;
  routeId?: number;
}

const AdminDashboardPage = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filtered, setFiltered] = useState<Shipment[]>([]);
  const [filter, setFilter] = useState('Todos');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllShipments();
        setShipments(data);
        setFiltered(data);
      } catch (error) {
        alert('Error al cargar envíos');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filter === 'Todos') {
      setFiltered(shipments);
    } else {
      setFiltered(shipments.filter((s) => s.estado === filter));
    }
  }, [filter, shipments]);

  return (
    <ShipmentLayout>
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#0057C8] transition z-50"
      >
        Cerrar sesión
      </button>
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
        <ShipmentFormTitle
          title="Dashboard Administrativo"
          subtitle="Gestiona y asigna rutas a los envíos"
        />

        <div className="flex justify-center gap-4">
          {['Todos', 'En espera', 'En tránsito', 'Entregado'].map((estado) => (
            <button
              key={estado}
              onClick={() => setFilter(estado)}
              className={`px-4 py-2 border rounded-lg ${filter === estado
                ? 'bg-white text-[#0057C8]'
                : 'border-white text-white hover:bg-white hover:text-[#0057C8]'
                }`}
            >
              {estado}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-lg border border-white">
          <table className="min-w-full text-white text-sm">
            <thead className="bg-[#0057C8] text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Peso</th>
                <th className="px-4 py-2 text-left">Dimensiones</th>
                <th className="px-4 py-2 text-left">Producto</th>
                <th className="px-4 py-2 text-left">Dirección</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-[#0057C8]">
              {filtered.map((shipment) => (
                <tr key={shipment.id} className="border-t border-white">
                  <td className="px-4 py-2">{shipment.id}</td>
                  <td className="px-4 py-2">{shipment.peso} kg</td>
                  <td className="px-4 py-2">{shipment.dimensiones}</td>
                  <td className="px-4 py-2">{shipment.tipoProducto}</td>
                  <td className="px-4 py-2">{shipment.direccion}</td>
                  <td className="px-4 py-2">{shipment.estado}</td>
                  <td className="px-4 py-2 flex flex-col gap-1">
                    {shipment.estado === 'En espera' && (
                      <Link
                        to={`/shipments/${shipment.id}/assign`}
                        className="underline hover:text-blue-300"
                      >
                        Asignar ruta
                      </Link>
                    )}

                    {shipment.estado === 'En tránsito' && (
                      <button
                        onClick={async () => {
                          try {
                            await updateShipmentStatus(shipment.id, 'Entregado');
                            const updated = await getAllShipments();
                            setShipments(updated);
                          } catch (error) {
                            alert('Error al actualizar a entregado');
                          }
                        }}
                        className="underline hover:text-green-300"
                      >
                        Marcar como entregado
                      </button>
                    )}

                    {shipment.estado === 'Entregado' && (
                      <span className="italic text-gray-200">Envío finalizado</span>
                    )}
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ShipmentLayout>
  );
};

export default AdminDashboardPage;
