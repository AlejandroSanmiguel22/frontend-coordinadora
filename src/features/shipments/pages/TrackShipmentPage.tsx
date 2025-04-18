import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShipmentLayout from '../components/ShipmentLayout';
import ShipmentFormTitle from '../components/ShipmentFormTitle';
import { getShipmentStatus, getShipmentHistory } from '../services/shipmentService';
import ShipmentTimeline from '../components/ShipmentTimeline';

const POLLING_INTERVAL = 5000;

interface HistoryItem {
    id: number;
    estado: string;
    timestamp: string;
}

const TrackShipmentPage = () => {
    const { id } = useParams<{ id: string }>();
    const [status, setStatus] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchStatusAndHistory = async () => {
        if (!id) return;
        try {
            setLoading(true);
            const statusData = await getShipmentStatus(+id);
            setStatus(statusData.status);

            const historyData = await getShipmentHistory(+id);
            setHistory(historyData);
        } catch (error) {
            console.error('Error al obtener seguimiento', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatusAndHistory();
        const interval = setInterval(fetchStatusAndHistory, POLLING_INTERVAL);
        return () => clearInterval(interval);
    }, [id]);

    return (
        <ShipmentLayout>
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 pt-12">
                <ShipmentFormTitle
                    title={`Seguimiento de envío #${id}`}
                    subtitle="Consulta el estado en tiempo real"
                />

                {/* Timeline visual con íconos */}
                <ShipmentTimeline currentStatus={status as any} />

                

                {/* Historial */}
                <div className="mt-6">
                    <h3 className="text-white text-lg font-semibold mb-2">Historial de estados</h3>
                    <ul className="space-y-2">
                        {history.map((h) => (
                            <li
                                key={h.id}
                                className="bg-[#0057C8] text-white px-4 py-2 rounded-lg border border-white"
                            >
                                <span className="font-bold">{h.estado}</span> —{' '}
                                {new Date(h.timestamp).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ShipmentLayout>
    );
};

export default TrackShipmentPage;
