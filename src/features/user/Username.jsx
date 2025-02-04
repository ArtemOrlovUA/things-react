import { useEffect, useRef, useState } from 'react';
import Button from '../../ui/Button';
import { useUsername } from './usernameContext';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Username() {
  const { updateName } = useUsername();
  const [userPicture, setUserPicture] = useState('');
  const { currentUser, handleLogout } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const username = currentUser?.name || 'Guest';

  function toggleExpand() {
    if (username === 'Guest') return;
    setIsExpanded((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && username !== 'Guest') {
        setIsExpanded(false);
      }
    };

    if (isExpanded && username !== 'Guest') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, username]);

  useEffect(() => {
    if (currentUser?.picture) {
      setUserPicture(() => currentUser.picture);
    }
  }, [currentUser?.picture]);

  const handleLogoutClick = () => {
    fetch('/.netlify/functions/logout', { credentials: 'include' })
      .then(() => {
        handleLogout();
        setUserPicture('/default-avatar.png'); // Скидуємо аватар
        setIsExpanded(false); // Закриваємо меню
      })
      .then(() => navigate('/'));
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <img
          src={userPicture || '/default-avatar.png'}
          alt="User avatar"
          className="w-9 h-9 rounded-full border-2 border-white/30 shadow-sm"
          onError={(e) => {
            e.target.src = '/default-avatar.png';
            setUserPicture('/default-avatar.png');
          }}
        />
        <span className="text-gray-700 font-medium hidden md:inline-block">{username}</span>
      </div>

      {username !== 'Guest' && (
        <button
          onClick={handleLogoutClick}
          className="p-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-200">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Username;
