interface RegisterPayload {
    userName: string;
    email: string;
    password: string;
    username: string;
  }
  
  export const registerUser = async (data: RegisterPayload) => {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
  
    if (!response.ok) {
      throw new Error(result.message || 'Error al registrar usuario');
    }
  
    return result;
  };
  