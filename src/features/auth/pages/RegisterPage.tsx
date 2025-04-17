import { Link } from 'react-router-dom';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';
import { ReactComponent as UserIcon } from '../../../assets/user.svg';
import { ReactComponent as MailIcon } from '../../../assets/mail.svg';
import { ReactComponent as LockIcon } from '../../../assets/lock.svg';
import { useState } from 'react';
import { ReactComponent as EyeSvg } from '../../../assets/eye.svg';
import { ReactComponent as EyeSlashSvg } from '../../../assets/eye-closed.svg';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import AuthFormTitle from '../components/AuthFormTitle';


const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage('Las contraseñas no coinciden');
      setMessageType('error');
      return;
    }

    try {
      await registerUser({
        username,
        email,
        password,
        userName: username,
      });

      setMessage('Usuario registrado con éxito');
      setMessageType('success');

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error: any) {
      setMessage(error.message || 'Error al registrarse');
      setMessageType('error');
    }
  };


  return (
    <AuthLayout>
      {message && (
        <div
          className={`mb-4 text-center px-4 py-2 rounded-lg font-medium transition ${messageType === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
            }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <AuthFormTitle
          title="Crear Cuenta"
          subtitle="Por favor, complete los siguientes campos para registrarse"
        />

        <Input
          label="Nombre de usuario"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          icon={<UserIcon className="w-5 h-5 text-[#005DB3]" />}
        />

        <Input
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          icon={<MailIcon className="w-5 h-5 text-[#005DB3]" />}
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

        <Input
          label="Confirmar contraseña"
          type={showConfirm ? 'text' : 'password'}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          icon={<LockIcon className="w-5 h-5 text-[#005DB3]" />}
          rightIcon={
            showConfirm ? (
              <EyeSlashSvg className="w-5 h-5 text-[#005DB3]" />
            ) : (
              <EyeSvg className="w-5 h-5 text-[#005DB3]" />
            )
          }
          onRightIconClick={() => setShowConfirm((prev) => !prev)}
        />

        <Button type="submit">Registrarse</Button>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="underline text-white font-semibold">
            Inicia sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
