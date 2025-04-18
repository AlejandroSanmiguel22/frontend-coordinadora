import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface Props {
    metrics: {
        carrierNombre: string;
        totalEnvios: number;
        tiempoPromedioFormato: string;
    }[];
}

const ReportChart = ({ metrics }: Props) => {
    return (
        <div className="bg-[#0057C8] p-4 rounded text-white">
            <h3 className="text-lg font-semibold mb-4">Tiempo promedio de entrega</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="carrierNombre" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#333', borderRadius: '8px' }}
                        formatter={(value: any, name: string) => {
                            if (name === 'tiempoPromedioSegundos') {
                                return [`${Math.round(value / 60)} min`, 'Tiempo promedio'];
                            }
                            return [value, name];
                        }}
                    />
                    <Bar dataKey="tiempoPromedioSegundos" fill="#90cdf4" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ReportChart;
