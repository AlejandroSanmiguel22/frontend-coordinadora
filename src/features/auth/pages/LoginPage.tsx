import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';
import { ReactComponent as UserIcon } from '../../../assets/user.svg';
import { ReactComponent as LockIcon } from '../../../assets/lock.svg';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EyeSvg } from '../../../assets/eye.svg';
import { ReactComponent as EyeSlashSvg } from '../../../assets/eye-closed.svg';
import AuthLayout from '../components/AuthLayout';
import AuthFormTitle from '../components/AuthFormTitle';



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { token, role } = await loginUser({ email, password });

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            setMessage('Inicio de sesión exitoso');
            setMessageType('success');

            setTimeout(() => {
                navigate('/shipments');
            }, 1000);
        } catch (error: any) {
            setMessage(error.message || 'Error al iniciar sesión');
            setMessageType('error');
        }

    };

    return (
        <AuthLayout>
            {
                message && (
                    <div
                        className={`mb-4 text-center px-4 py-2 rounded-lg font-medium transition ${messageType === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {message}
                    </div>
                )
            }

            <form onSubmit={handleSubmit}>
                <AuthFormTitle
                    title="Iniciar Sesión"
                    subtitle="Por favor, introduzca su nombre de usuario y su contraseña"
                />

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
                    rightIcon={
                        showPassword ? (
                            <EyeSlashSvg className="w-5 h-5 text-[#005DB3]" />
                        ) : (
                            <EyeSvg className="w-5 h-5 text-[#005DB3]" />
                        )
                    }
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
        </AuthLayout>
    );

};

export default LoginPage;
