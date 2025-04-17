import { ReactNode } from 'react';
import leftSvg from '../../../assets/Ellipse-left.svg';
import rightSvg from '../../../assets/Ellipse-right.svg';
import topSvg from '../../../assets/Ellipse-top.svg';
import logo from '../../../assets/logo.png';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="relative min-h-screen bg-[#0057C8] flex items-center justify-center overflow-hidden">
    <img src={leftSvg} alt="decoración izquierda inferior" className="absolute bottom-0 left-0 w-[200px] sm:w-[200px] lg:w-[400px]" />
    <img src={topSvg} alt="decoración superior izquierda" className="absolute top-0 left-0 w-[300px] hidden sm:block" />
    <img src={rightSvg} alt="decoración derecha inferior" className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] lg:w-[600px]" />
    <img src={logo} alt="Logo Coordinadora" className="absolute bottom-1 right-4 w-70" />
    <div className="relative z-10 w-full max-w-sm px-6 py-8 text-white bg-transparent">
      {children}
    </div>
  </div>
);

export default AuthLayout;
