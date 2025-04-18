import { useState } from 'react';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';
import { createShipment } from '../services/shipmentService';
import { useNavigate } from 'react-router-dom';


const ShipmentForm = () => {
  const [peso, setPeso] = useState('');
  const [alto, setAlto] = useState('');
  const [ancho, setAncho] = useState('');
  const [largo, setLargo] = useState('');
  const [tipoProducto, setTipoProducto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dimensiones = `${alto}x${ancho}x${largo}`;

    try {
      await createShipment({ peso: parseFloat(peso), dimensiones, tipoProducto, direccion });

      setMessage('Envío registrado exitosamente');
      setMessageType('success');

      // Limpiar campos
      setPeso('');
      setAlto('');
      setAncho('');
      setLargo('');
      setTipoProducto('');
      setDireccion('');

      setTimeout(() => {
        navigate('/shipments');
      }, 1000);
    } catch (error: any) {
      setMessage(error.message || 'Error al registrar el envío');
      setMessageType('error');
    }
  };


  return (
    <>
      {message && (
        <div
          className={`mb-4 text-center px-4 py-2 rounded-lg font-medium transition ${messageType === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
            }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Peso (kg)"
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          required
        />

        <div className="grid grid-cols-3 gap-2">
          <Input label="Alto (cm)" type="number" value={alto} onChange={(e) => setAlto(e.target.value)} required />
          <Input label="Ancho (cm)" type="number" value={ancho} onChange={(e) => setAncho(e.target.value)} required />
          <Input label="Largo (cm)" type="number" value={largo} onChange={(e) => setLargo(e.target.value)} required />
        </div>

        <Input
          label="Tipo de producto"
          type="text"
          value={tipoProducto}
          onChange={(e) => setTipoProducto(e.target.value)}
          required
        />

        <Input
          label="Dirección de destino"
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />

        <Button type="submit">Registrar envío</Button>
      </form>
    </>
  );

};

export default ShipmentForm;
