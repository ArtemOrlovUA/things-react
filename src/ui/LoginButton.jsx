import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function LoginButton() {
  return (
    <div className="max-w-72">
      <GoogleLogin
        onSuccess={async (credentialResponse) =>
          console.log(jwtDecode(credentialResponse.credential))
        }
        onError={() => console.log('Login failed')}
      />
    </div>
  );
}

export default LoginButton;
