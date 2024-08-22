import { useState, useEffect, useRef } from 'react';
import Button from '../../ui/Button';
import { useUsername } from './usernameContext';

function Username() {
  const { username, updateName } = useUsername();
  const [isExpanded, setIsExpanded] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const popoverRef = useRef(null);

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

  function handleClickOutside(event) {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  }

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <>
      <div className="flex space-x-2">
        <span className="flex items-center">{username}</span>

        {username && (
          <Button
            type="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(); // Add a slight delay to avoid conflict with handleClickOutside
            }}
            popovertarget={'my-popover'}>
            Change
          </Button>
        )}

        {isExpanded && (
          <div ref={popoverRef} className="popover">
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
