import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReportTable from '../ReportTable';

describe('ReportTable', () => {
    it('muestra "No hay envíos" si está vacío', () => {
        render(<ReportTable shipments={[]} />);

        // Verificar el mensaje directamente
        const emptyMessage = screen.getByText(/no hay envíos para mostrar/i);
        expect(emptyMessage).toBeInTheDocument();
        expect(emptyMessage).toHaveClass('text-center');
    });

    it('renderiza las filas correctamente', () => {
        const shipments = [
            {
                id: 1,
                peso: 10,
                tipoProducto: 'Ropa',
                direccion: 'Calle Falsa 123',
                estado: 'Entregado',
                createdAt: new Date().toISOString(),
                route: { carrier: { nombre: 'Pedro' } }
            }
        ];
        render(<ReportTable shipments={shipments} />);

        // Verificar que los datos se renderizan
        expect(screen.getByText(/Ropa/)).toBeInTheDocument();
        expect(screen.getByText(/Pedro/)).toBeInTheDocument();
        expect(screen.getByText(/Entregado/)).toBeInTheDocument();
    });
});