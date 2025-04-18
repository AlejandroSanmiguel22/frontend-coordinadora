import { ReactNode } from 'react';
import leftSvg from '../../../assets/Ellipse-left.svg';
import rightSvg from '../../../assets/Ellipse-right.svg';
import topSvg from '../../../assets/Ellipse-top.svg';
import logo from '../../../assets/logo.png';

interface ShipmentLayoutProps {
  children: ReactNode;
}

const ShipmentLayout = ({ children }: ShipmentLayoutProps) => (
  <div className="relative min-h-screen bg-[#0057C8] overflow-hidden">
    <img
      src={rightSvg}
      alt="decoración derecha inferior"
      className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] lg:w-[600px]"
    />

    <div className="absolute bottom-3 right-1 w-[140px] sm:w-[200px] md:w-[290px] lg:w-[300px] xl:w-[360px]">
      <img src={logo} alt="Logo Coordinadora" className="w-full" />
    </div>


    <div className="relative z-10 min-h-[calc(100vh-100px)] mx-auto max-w-6xl rounded-lg mt-8 mb-16 p-6 text-white">
      {children}
    </div>
  </div>
);

export default ShipmentLayout;
