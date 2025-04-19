import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ShipmentFormTitle from '../ShipmentFormTitle';

describe('ShipmentFormTitle', () => {
    it('muestra título y subtítulo', () => {
        render(<ShipmentFormTitle title="Mis envíos" subtitle="Subtítulo de prueba" />);
        expect(screen.getByText(/mis envíos/i)).toBeInTheDocument();
        expect(screen.getByText(/subtítulo de prueba/i)).toBeInTheDocument();
    });
});
