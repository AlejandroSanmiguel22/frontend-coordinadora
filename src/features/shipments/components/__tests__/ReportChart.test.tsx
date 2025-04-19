import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReportChart from '../ReportChart';

beforeAll(() => {
    global.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');

    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children, width, height }: any) => (
            <div>
                {children}
            </div>
        ),
        BarChart: ({ children }: any) => <div data-testid="barchart">{children}</div>,
        Bar: ({ dataKey }: any) => <div data-testid={`bar-${dataKey}`} />,
        XAxis: ({ dataKey }: any) => <div data-testid={`xaxis-${dataKey}`} />,
        YAxis: ({ dataKey }: any) => <div data-testid={`yaxis-${dataKey}`} />,
        Tooltip: () => <div data-testid="tooltip" />,
        Legend: () => <div data-testid="legend" />,
        CartesianGrid: () => <div data-testid="grid" />,
    };
});

describe('ReportChart', () => {
    it('muestra mensaje si no hay métricas', () => {
        render(<ReportChart metrics={[]} />);
        expect(screen.getByText(/no hay datos para mostrar/i)).toBeInTheDocument();
    });

    it('renderiza el gráfico con métricas válidas', () => {
        const mockMetrics = [
            {
                carrierNombre: 'Pedro Martínez',
                totalEnvios: 2,
                tiempoPromedioSegundos: 900,
                tiempoPromedioFormato: '0h 15min',
            },
        ];

        render(<ReportChart metrics={mockMetrics} />);

        // Verifica que se renderiza el título del gráfico
        expect(screen.getByText(/Tiempo promedio de entrega/i)).toBeInTheDocument();

        // Verifica que se renderiza el gráfico
        expect(screen.getByTestId('barchart')).toBeInTheDocument();

        // Opcional: verifica que los elementos del gráfico se renderizan
        expect(screen.getByTestId('xaxis-carrierNombre')).toBeInTheDocument();
        expect(screen.getByTestId('bar-tiempoPromedioSegundos')).toBeInTheDocument();
    });
});