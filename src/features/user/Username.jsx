import { useState } from 'react';
import Button from '../../ui/Button';
import { useUsername } from './usernameContext';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

function Username() {
  const { updateName } = useUsername();
  const { currentUser, handleLogout } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const navigate = useNavigate();

  const username = currentUser?.name || 'Guest';

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

  return (
    <>
      <div className="flex space-x-2 mt-2 md:mt-0">
        <span className="flex items-center ml-2 md:ml-0">
          <img
            src={currentUser?.picture}
            alt="User avatar"
            className="w-10 h-10 mr-2 rounded-full"
          />
          {username !== 'Guest' ? username : ''}
        </span>

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
              googleLogout();
              handleLogout();
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
