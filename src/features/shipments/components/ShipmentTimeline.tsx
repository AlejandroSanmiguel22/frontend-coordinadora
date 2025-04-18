import { ReactComponent as building } from '../../../assets/building.svg';
import { ReactComponent as car } from '../../../assets/car.svg';
import { ReactComponent as flag } from '../../../assets/flag.svg';

interface Props {
    currentStatus: 'En espera' | 'En tránsito' | 'Entregado';
}

const steps = [
    { label: 'En espera', icon: building },
    { label: 'En tránsito', icon: car },
    { label: 'Entregado', icon: flag }
];

const ShipmentTimeline = ({ currentStatus }: Props) => {
    const statusIndex = steps.findIndex((s) => s.label === currentStatus);

    return (
        <div className="w-full px-8 py-8 bg-white rounded-xl shadow-md mx-auto">
            <div className="flex justify-between items-center relative max-w-4xl mx-auto">
                {/* Línea base gris - ahora correctamente posicionada entre íconos */}
                <div
                    className="absolute top-6 h-0.5 bg-gray-200 z-0"
                    style={{
                        left: 'calc(50% / 3)',
                        right: 'calc(50% / 3)',
                    }}
                ></div>

                {/* Línea azul de progreso - CORRECCIÓN APLICADA AQUÍ */}
                <div
                    className="absolute top-6 h-0.5 bg-[#0057C8] z-0 transition-all duration-500"
                    style={{
                        left: 'calc(50% / 3)',
                        width: statusIndex === steps.length - 1
                            ? 'calc(100% - (50% / 3 * 2))'  // Llega hasta el final cuando es "Entregado"
                            : `${(statusIndex / (steps.length - 1)) * 100}%`,
                    }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index < statusIndex;
                    const isActive = index === statusIndex;
                    const Icon = step.icon;

                    return (
                        <div key={step.label} className="flex flex-col items-center z-10 flex-1">
                            {/* Círculo con ícono */}
                            <div
                                className={`relative w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300
                                    ${isActive ? 'bg-[#0057C8] border-[#0057C8]' :
                                        isCompleted ? 'bg-white border-[#0057C8]' : 'bg-white border-gray-300'}`}
                            >
                                <Icon
                                    className={`w-6 h-6 transition-all duration-300 
                                        ${isActive ? 'text-white' : isCompleted ? 'text-[#0057C8]' : 'text-gray-400'}`}
                                />
                            </div>

                            {/* Texto */}
                            <span
                                className={`mt-3 text-sm font-medium text-center ${isActive ? 'text-[#0057C8] font-semibold' : isCompleted ? 'text-[#0057C8]' : 'text-gray-400'}`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShipmentTimeline;