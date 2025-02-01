import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';

function LoginButton() {
  const { handleLogin } = useUser();

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
