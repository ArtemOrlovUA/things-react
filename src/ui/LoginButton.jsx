import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const { handleLogin } = useUser();
  const navigate = useNavigate();

  return (
    <div className="max-w-72">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          handleLogin(jwtDecode(credentialResponse.credential));
          navigate('/notes');
        }}
        onError={() => console.log('Login failed')}
      />
    </div>
  );
}

export default LoginButton;
