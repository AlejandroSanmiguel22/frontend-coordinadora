const ProfilePage = () => {
    const email = localStorage.getItem('email'); 
    const role = localStorage.getItem('role');
  
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">¡Bienvenido!</h1>
        <p className="text-lg">Rol: {role}</p>
        <p className="text-lg">Email: {email || 'no disponible'}</p>
      </div>
    );
  };
  
  export default ProfilePage;
  