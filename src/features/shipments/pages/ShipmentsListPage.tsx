import { useEffect, useState } from 'react';
import AuthLayout from '../../auth/components/AuthLayout';
import ShipmentFormTitle from '../components/ShipmentFormTitle';
import { getMyShipments } from '../services/shipmentService';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import ShipmentLayout from '../components/ShipmentLayout';
import { useNavigate } from 'react-router-dom';

interface Shipment {
  id: number;
  peso: number;
  dimensiones: string;
  tipoProducto: string;
  direccion: string;
  estado: string;
  createdAt: string;
}

const ShipmentsListPage = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const data = await getMyShipments();
        setShipments(data);
      } catch (error) {
        alert('Error al cargar los envíos');
      }
    };

    fetchShipments();
  }, []);

  return (
    <ShipmentLayout>
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#0057C8] transition z-50"
      >
        Cerrar sesión
      </button>

      <div className="w-full max-w-6xl mx-auto px-1 flex flex-col gap-6 pt-12">
        <ShipmentFormTitle
          title="Mis envíos"
          subtitle="Consulta el historial de tus órdenes registradas"
        />

        <div className="overflow-x-auto rounded-lg border border-white">
          <table className="min-w-full text-white text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Peso</th>
                <th className="px-4 py-2 text-left">Dimensiones</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Dirección</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Seguimiento</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="border-t border-white">
                  <td className="px-4 py-2">{shipment.peso} kg</td>
                  <td className="px-4 py-2">{shipment.dimensiones}</td>
                  <td className="px-4 py-2">{shipment.tipoProducto}</td>
                  <td className="px-4 py-2">{shipment.direccion}</td>
                  <td className="px-4 py-2">{shipment.estado}</td>
                  <td className="px-4 py-2">{new Date(shipment.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <Link to={`/shipments/${shipment.id}/track`} className="underline hover:text-blue-300">
                      Ver estado
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-6">
          <Link
            to="/shipments/create"
            className="inline-block px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#0057C8] transition"
          >
            Crear nuevo envío
          </Link>
        </div>
      </div>
      <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-full">
        <div className="bg-white w-48 h-28 rounded-t-full flex justify-center items-end pb-3 shadow-md mx-auto">
          <img src={logo} alt="Logo Coordinadora" className="w-45 translate-x-[-10px]" />
        </div>
      </div>
    </ShipmentLayout>
  );
};

export default ShipmentsListPage;