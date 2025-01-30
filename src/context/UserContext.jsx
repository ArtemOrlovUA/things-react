/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(undefined);

  function handleLogin(userObject) {
    setCurrentUser(() => userObject);
  }

  function handleLogout() {
    setCurrentUser(undefined);
  }

  return (
    <UserContext.Provider value={{ currentUser, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export { UserProvider, useUser };
