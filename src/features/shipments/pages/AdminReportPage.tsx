import { useState } from 'react';
import ShipmentLayout from '../components/ShipmentLayout';
import ShipmentFormTitle from '../components/ShipmentFormTitle';
import { getReport } from '../services/shipmentService';
import ReportFilters from '../components/ReportFilters';
import ReportTable from '../components/ReportTable';
import ReportChart from '../components/ReportChart';

const AdminReportPage = () => {
    const [shipments, setShipments] = useState([]);
    const [metrics, setMetrics] = useState([]);

    const handleFilter = async (filters: any) => {
        try {
            const data = await getReport({ ...filters, page: 1, pageSize: 50 });
            setShipments(data.shipments);
            setMetrics(data.metrics);
        } catch (error) {
            alert('Error al cargar el reporte logístico');
        }
    };

    return (
        <ShipmentLayout>
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
                <ShipmentFormTitle
                    title="Reporte Logístico"
                    subtitle="Consulta avanzada de envíos y desempeño por transportista"
                />
                <ReportFilters onFilter={handleFilter} />
                <ReportTable shipments={shipments} />
                <ReportChart metrics={metrics} />
            </div>
        </ShipmentLayout>
    );
};

export default AdminReportPage;
