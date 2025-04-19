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

export const getAllShipments = async () => {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('Usuario no autenticado');

  const response = await fetch('http://localhost:3000/api/shipments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener todos los envíos');
  }

  return data;
};

export const getShipmentStatus = async (id: number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Usuario no autenticado');

  const response = await fetch(`http://localhost:3000/api/shipments/${id}/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al obtener estado del envío');
  return data;
};

export const getShipmentHistory = async (id: number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Usuario no autenticado');

  const response = await fetch(`http://localhost:3000/api/shipments/${id}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al obtener historial');
  return data;
};

export const updateShipmentStatus = async (shipmentId: number, estado: 'En espera' | 'En tránsito' | 'Entregado') => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Usuario no autenticado');

  const res = await fetch(`http://localhost:3000/api/shipments/${shipmentId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ estado }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al actualizar estado');
  return data;
};

interface ReportFilters {
  fechaDesde?: string;
  fechaHasta?: string;
  estado?: string;
  transportistaId?: number;
  page?: number;
  pageSize?: number;
}

export const getReport = async (filters: ReportFilters = {}) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Usuario no autenticado');

  const query = new URLSearchParams();

  if (filters.fechaDesde) query.append('fechaDesde', filters.fechaDesde);
  if (filters.fechaHasta) query.append('fechaHasta', filters.fechaHasta);
  if (filters.estado) query.append('estado', filters.estado);
  if (filters.transportistaId !== undefined) query.append('transportistaId', String(filters.transportistaId));
  if (filters.page) query.append('page', String(filters.page));
  if (filters.pageSize) query.append('pageSize', String(filters.pageSize));

  const response = await fetch(`http://localhost:3000/api/shipments/report?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener reporte');
  }

  return data;
};



