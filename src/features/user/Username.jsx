import { useState } from 'react';
import Button from '../../ui/Button';
import { useUsername } from './usernameContext';

function Username() {
  const { username, updateName } = useUsername();
  const [isExpanded, setIsExpanded] = useState(false);
  const [newUsername, setNewUsername] = useState('');

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
        <span className="flex items-center ml-2 md:ml-0">{username}</span>

        {username && (
          <Button
            type="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            popovertarget={'my-popover'}>
            Change
          </Button>
        )}

        {isExpanded && (
          <div>
            <input
              type="text"
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
