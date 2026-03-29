import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGuest } from './guestContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { guestId, clearGuest } = useGuest();

  // Load mock user from localStorage on init
  useEffect(() => {
    const savedUser = localStorage.getItem('mockCoffeeUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Sync state to local storage and handle guest transition
  useEffect(() => {
    if (user) {
      localStorage.setItem('mockCoffeeUser', JSON.stringify(user));
      if (guestId) clearGuest();
    } else {
      localStorage.removeItem('mockCoffeeUser');
    }
  }, [user, guestId]);

  const loginWithGoogle = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: 'google-test-123',
          email: 'google.guest@example.com',
          displayName: 'Demo Member',
          role: 'USER',
          photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
        };
        setUser(mockUser);
        resolve(mockUser);
      }, 800);
    });
  };
  
  const signupWithEmail = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: `local-${Math.random().toString(36).substr(2, 9)}`,
          email: email,
          displayName: email.split('@')[0].toUpperCase(),
          role: 'USER',
        };
        setUser(mockUser);
        resolve(mockUser);
      }, 1000);
    });
  };

  const loginWithEmail = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For testing, only one test account works, or any password works
        const mockUser = {
          uid: 'local-test-456',
          email: email,
          displayName: 'Returning Member',
          role: 'USER',
        };
        setUser(mockUser);
        resolve(mockUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, signupWithEmail, loginWithEmail, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
