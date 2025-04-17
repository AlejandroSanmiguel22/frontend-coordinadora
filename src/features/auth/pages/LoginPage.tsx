import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';
import leftSvg from '../../../assets/Ellipse-left.svg';
import rightSvg from '../../../assets/Ellipse-right.svg';
import topSvg from '../../../assets/Ellipse-top.svg';
import logo from '../../../assets/logo.png';
import { ReactComponent as UserIcon } from '../../../assets/user.svg';
import { ReactComponent as LockIcon } from '../../../assets/lock.svg';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeSvg } from '../../../assets/eye.svg';
import { ReactComponent as EyeSlashSvg } from '../../../assets/eye-closed.svg';



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { token, role } = await loginUser({ email, password });

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            alert('Inicio de sesión exitoso');
            navigate('/users/profile');
        } catch (error: any) {
            alert(error.message);
        }
    };


    return (
        <div className="relative min-h-screen bg-[#0057C8] flex items-center justify-center overflow-hidden">
            {/* Burbujas decorativas */}
            <img
                src={leftSvg}
                alt="decoración izquierda inferior"
                className="absolute bottom-0 left-0 w-[200px] sm:w-[200px] lg:w-[400px]"
            />

            <img
                src={topSvg}
                alt="decoración superior izquierda"
                className="absolute top-0 left-0 w-[300px] hidden sm:block"
            />

            <img
                src={rightSvg}
                alt="decoración derecha inferior"
                className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] lg:w-[600px]"
            />

            {/* Formulario */}
            <form
                onSubmit={handleSubmit}
                className="relative z-10 bg-transparent text-white w-full max-w-sm px-6 py-8"
            >
                <h2 className="text-3xl font-bold text-center mb-4">Iniciar Sesión</h2>
                <p className="text-sm text-center text-white mb-6">
                    Por favor, introduzca su nombre de usuario y su contraseña
                </p>

                <Input
                    label="Correo Electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    icon={<UserIcon className="w-5 h-5" style={{ color: '#005DB3' }} />}
                />

                <Input
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    icon={<LockIcon className="w-5 h-5 text-[#005DB3]" />}
                    rightIcon={showPassword ? <EyeSlashSvg className="w-5 h-5 text-[#005DB3]" /> : <EyeSvg className="w-5 h-5 text-[#005DB3]" />}
                    onRightIconClick={() => setShowPassword((prev) => !prev)}
                />




                <Button type="submit">Iniciar Sesión</Button>

                <p className="text-sm text-center mt-4">
                    No tienes cuenta aún?{' '}
                    <Link to="/register" className="underline text-white font-semibold">
                        Regístrate !
                    </Link>
                </p>
            </form>

            {/* Logo */}
            <img src={logo} alt="Logo Coordinadora" className="absolute bottom-1 right-4 w-70" />
        </div>
    );
};

export default LoginPage;
