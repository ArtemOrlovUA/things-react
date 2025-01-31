import { useEffect, useState } from 'react';
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
  const navigate = useNavigate();

  const username = currentUser?.name || 'Guest';

  console.log(currentUser?.picture);

  function toggleExpand() {
    setIsExpanded((prev) => !prev);
  }

  function handleSave(e) {
    e.preventDefault();
    if (newUsername.trim() === '') {
      alert('Please enter a username');
      return;
    }

    updateName(newUsername);
    toggleExpand();
  }

  useEffect(() => {
    console.log('User picture updated:', currentUser?.picture);
    if (currentUser?.picture) {
      setUserPicture(() => currentUser.picture);
    }
  }, [currentUser?.picture]);

  return (
    <>
      <div className="flex space-x-2 mt-2 md:mt-0">
        {username !== 'Guest' && (
          <span className="flex items-center ml-2 md:ml-0">
            <img
              src={userPicture || '/default-avatar.png'}
              alt="User avatar"
              className="w-10 h-10 mr-2 rounded-full"
              onError={(e) => (e.target.src = '/default-avatar.png')}
            />

            {username !== 'Guest' ? username : ''}
          </span>
        )}

        {/* {username !== 'Guest' && !isExpanded && (
          <Button
            type="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}>
            Change
          </Button>
        )} */}

        {username !== 'Guest' && !isExpanded && (
          <Button
            type="small"
            onClick={() => {
              fetch('/.netlify/functions/logout', { credentials: 'include' }).then(() =>
                handleLogout(),
              );
              navigate('/');
            }}>
            Log out
          </Button>
        )}

        {isExpanded && (
          <div>
            <input
              type="text"
              defaultValue={username}
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter your username"
              className="p-2 rounded-lg input_small bg-stone-50 mr-2"
            />
            <Button type="small" onClick={handleSave}>
              Save
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Username;
