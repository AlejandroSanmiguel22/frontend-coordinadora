import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ShipmentForm from '../ShipmentForm';
import { BrowserRouter } from 'react-router-dom';

describe('ShipmentForm', () => {
    it('renderiza todos los campos del formulario', () => {
        render(
            <BrowserRouter>
                <ShipmentForm />
            </BrowserRouter>
        );

        // Verificar los labels primero
        expect(screen.getByText(/Peso \(kg\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Alto \(cm\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Ancho \(cm\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Largo \(cm\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Tipo de producto/i)).toBeInTheDocument();
        expect(screen.getByText(/Dirección de destino/i)).toBeInTheDocument();

        // Verificar los inputs por su tipo y required
        const numberInputs = screen.getAllByRole('spinbutton');
        expect(numberInputs.length).toBe(4); // Peso, Alto, Ancho, Largo

        const textInputs = screen.getAllByRole('textbox');
        expect(textInputs.length).toBe(2); // Tipo producto, Dirección

        // Verificar el botón
        expect(screen.getByRole('button', { name: /Registrar envío/i })).toBeInTheDocument();
    });
});