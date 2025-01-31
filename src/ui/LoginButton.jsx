import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginButton() {
  const { handleLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/.netlify/functions/check-auth', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => handleLogin(data.user))
      .catch(() => handleLogin(null));
  }, [handleLogin]);

  return (
    <div className="max-w-72">
      <GoogleLogin
        onSuccess={(res) => {
          fetch('/.netlify/functions/auth', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: res.credential }),
          })
            .then((res) => res.json())
            .then((data) => handleLogin(data.user))
            .catch(() => console.error('Login failed, please try again'));
        }}
        onError={() => console.log('Login failed')}
      />
    </div>
  );
}

export default LoginButton;
