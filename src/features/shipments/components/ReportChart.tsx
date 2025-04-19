import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
} from 'recharts';

interface Props {
    metrics: {
        carrierNombre: string;
        totalEnvios: number;
        tiempoPromedioSegundos: number;
        tiempoPromedioFormato: string;
    }[];
}

const ReportChart = ({ metrics }: Props) => {
    const hasData = metrics.length > 0;

    return (
        <div className="bg-[#0057C8] p-4 rounded text-white min-h-[200px]">
            <h3 className="text-lg font-semibold mb-4">Tiempo promedio de entrega</h3>

            {!hasData ? (
                <p className="text-center text-sm text-white/80">No hay datos para mostrar</p>
            ) : (
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={metrics} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="carrierNombre" stroke="#fff">
                            <Label
                                value="Transportistas"
                                position="bottom"
                                dy={20}
                                fill="#fff"
                                style={{ fontSize: '14px' }}
                            />
                        </XAxis>
                        <YAxis
                            stroke="#fff"
                            tickFormatter={(value) => Math.round(value / 60).toString()}
                        >
                            <Label
                                value="Tiempo en minutos"
                                angle={-90}
                                position="left"
                                dx={-30}
                                fill="#fff"
                                style={{ textAnchor: 'middle', fontSize: '14px' }}
                            />
                        </YAxis>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length > 0) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white p-2 rounded shadow text-black text-sm">
                                            <p><strong>Transportista:</strong> {data.carrierNombre}</p>
                                            <p><strong>Promedio:</strong> {data.tiempoPromedioFormato}</p>
                                            <p><strong>Envíos:</strong> {data.totalEnvios}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="tiempoPromedioSegundos" fill="#90cdf4" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default ReportChart;
