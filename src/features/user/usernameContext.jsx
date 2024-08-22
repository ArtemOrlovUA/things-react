/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

const UsernameContext = createContext();

function UsernameProvider({ children }) {
  const [username, setUsername] = useState(() => {
    // Спроба отримати збережене ім'я користувача з localStorage при ініціалізації
    const savedUsername = localStorage.getItem('username');
    return savedUsername || '';
  });

  useEffect(() => {
    // Зберігаємо ім'я користувача в localStorage щоразу, коли воно змінюється
    localStorage.setItem('username', username);
  }, [username]);

  function updateName(newName) {
    setUsername(newName);
  }

  const contextValue = {
    username,
    updateName,
    clearUsername: () => {
      setUsername('');
      localStorage.removeItem('username');
    },
  };

  return <UsernameContext.Provider value={contextValue}>{children}</UsernameContext.Provider>;
}

function useUsername() {
  const context = useContext(UsernameContext);
  if (!context) {
    throw new Error('useUsername must be used within a UsernameProvider');
  }
  return context;
}

export { UsernameProvider, useUsername };
