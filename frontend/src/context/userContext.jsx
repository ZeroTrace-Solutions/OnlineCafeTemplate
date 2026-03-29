import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      // Logic to fetch more user profile data from internal API
      setProfile({
        ...user,
        // Mock profile data
        centerId: 'center_1',
      });
    } else {
      setProfile(null);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
