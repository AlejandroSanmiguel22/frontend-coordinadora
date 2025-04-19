import { useState } from 'react';

interface Props {
    onFilter: (filters: {
        fechaDesde?: string;
        fechaHasta?: string;
        estado?: string;
        transportistaId?: number;
    }) => void;
}

const estados = ['Todos', 'En espera', 'En tránsito', 'Entregado'];

const ReportFilters = ({ onFilter }: Props) => {
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [estado, setEstado] = useState('');
    const [transportistaId, setTransportistaId] = useState('');

    return (
        <div className="bg-[#0057C8] text-white p-4 rounded-lg flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label className="block mb-1">Fecha desde</label>
                    <input
                        type="date"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                        className="text-black w-full px-2 py-1 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Fecha hasta</label>
                    <input
                        type="date"
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                        className="text-black w-full px-2 py-1 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Estado</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="text-black w-full px-2 py-1 rounded"
                    >
                        {estados.map((e) => (
                            <option key={e} value={e === 'Todos' ? '' : e}>
                                {e}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Transportista (ID)</label>
                    <input
                        type="number"
                        value={transportistaId}
                        onChange={(e) => setTransportistaId(e.target.value)}
                        className="text-black w-full px-2 py-1 rounded"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() =>
                        onFilter({
                            fechaDesde: fechaDesde || undefined,
                            fechaHasta: fechaHasta || undefined,
                            estado: estado || undefined,
                            transportistaId: transportistaId ? Number(transportistaId) : undefined,
                        })
                    }
                    className="px-4 py-2 border border-white rounded hover:bg-white hover:text-[#0057C8] transition"
                >
                    Aplicar filtros
                </button>
            </div>
        </div>
    );
};

export default ReportFilters;
