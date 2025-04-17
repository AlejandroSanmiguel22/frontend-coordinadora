interface CreateShipmentPayload {
  peso: number;
  dimensiones: string;
  tipoProducto: string;
  direccion: string;
}

export const createShipment = async (data: CreateShipmentPayload) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Usuario no autenticado');
  }

  const response = await fetch('http://localhost:3000/api/shipments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error al registrar envío');
  }

  return result;
};

export const getMyShipments = async () => {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('Usuario no autenticado');

  const response = await fetch('http://localhost:3000/api/shipments/mine', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener envíos');
  }

  return data;
};

