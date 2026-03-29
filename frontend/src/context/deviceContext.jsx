import React, { createContext, useContext, useEffect, useState } from 'react';

const DeviceContext = createContext({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  screenSize: { width: window.innerWidth, height: window.innerHeight },
});

export const DeviceProvider = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
    screenSize: { width: window.innerWidth, height: window.innerHeight },
  });

  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
        screenSize: { width: window.innerWidth, height: window.innerHeight },
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext);
