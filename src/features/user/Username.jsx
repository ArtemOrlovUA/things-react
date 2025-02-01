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

  console.log(currentUser?.picture);

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
    console.log('User picture updated:', currentUser?.picture);
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
    <div className="relative group" ref={menuRef}>
      <button onClick={toggleExpand} className="flex items-center space-x-2 focus:outline-none">
        <img
          src={userPicture || '/default-avatar.png'}
          alt="User avatar"
          className="w-9 h-9 rounded-full border-2 border-white/30 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md"
          onError={(e) => {
            e.target.src = '/default-avatar.png';
            setUserPicture('/default-avatar.png'); // Додано примусове оновлення
          }}
        />
        <span className="text-gray-700 font-medium hidden md:inline-block">{username}</span>
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 rounded-xl bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl ${
          isExpanded ? 'block' : 'hidden'
        }`}>
        <div className="p-4 space-y-3">
          <button
            onClick={handleLogoutClick}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/50 rounded-lg transition-all duration-200">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Username;
