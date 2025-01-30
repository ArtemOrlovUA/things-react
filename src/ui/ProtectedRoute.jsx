import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === undefined) navigate('/');
  }, [currentUser, navigate]);

  return children;
}

export default ProtectedRoute;
