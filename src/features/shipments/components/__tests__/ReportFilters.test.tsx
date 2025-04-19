import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReportFilters from '../ReportFilters';

describe('ReportFilters', () => {
    it('renderiza correctamente todos los inputs y botón', () => {
        render(<ReportFilters onFilter={() => { }} />);

        // Inputs de fecha (usando getByLabelText ya que tienen labels asociados)
        expect(screen.getByLabelText('Fecha desde')).toBeInTheDocument();
        expect(screen.getByLabelText('Fecha hasta')).toBeInTheDocument();

        // Select de estado (usando getByRole para combobox)
        expect(screen.getByRole('combobox', { name: 'Estado' })).toBeInTheDocument();

        // Input de número (usando getByRole para spinbutton)
        expect(screen.getByRole('spinbutton', { name: 'Transportista (ID)' })).toBeInTheDocument();

        // Botón
        expect(screen.getByRole('button', { name: 'Aplicar filtros' })).toBeInTheDocument();
    });
});