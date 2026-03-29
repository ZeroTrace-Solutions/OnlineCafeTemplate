import React, { createContext, useContext, useEffect, useState } from 'react';

const GuestContext = createContext(null);

export const GuestProvider = ({ children }) => {
  const [guestId, setGuestId] = useState(localStorage.getItem('guest_id') || null);
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('guest_profile');
    return saved ? JSON.parse(saved) : { address: '', phone: '', lastVisited: null };
  });

  const generateFingerprint = () => {
    const raw = `${navigator.userAgent}|${navigator.language}|${window.screen.width}x${window.screen.height}`;
    // Simple hash function for mock purposes
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = ((hash << 5) - hash) + raw.charCodeAt(i);
      hash |= 0;
    }
    return `GUEST_${Math.abs(hash).toString(16).toUpperCase()}`;
  };

  useEffect(() => {
    if (!guestId) {
      const newId = generateFingerprint();
      setGuestId(newId);
      localStorage.setItem('guest_id', newId);
    }
    updateVisitTime();
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('guest_profile', JSON.stringify(profile));
    }
  }, [profile]);

  const updateVisitTime = () => {
    setProfile(prev => ({ ...prev, lastVisited: new Date().toISOString() }));
  };

  const updateProfile = (data) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const clearGuest = () => {
    localStorage.removeItem('guest_id');
    localStorage.removeItem('guest_profile');
    setGuestId(null);
    setProfile(null);
  };

  return (
    <GuestContext.Provider value={{ guestId, profile, updateProfile, clearGuest }}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuest = () => useContext(GuestContext);
