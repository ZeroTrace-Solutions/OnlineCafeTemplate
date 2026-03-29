import React, { StrictMode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster } from 'sonner';

import { AuthProvider } from '../context/authContext';
import { UserProvider } from '../context/userContext';
import { DeviceProvider } from '../context/deviceContext';
import { GuestProvider } from '../context/guestContext';
import { CartProvider } from '../context/cartContext';
import { ThemeProvider } from '../context/themeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const Providers = ({ children }) => {
  return (
    <StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy'}>
        <QueryClientProvider client={queryClient}>
          {/* Guest and Device info are independent baseline contexts */}
          <DeviceProvider>
            <GuestProvider>
              {/* Auth depends on Guest for data transfer/cleanup */}
              <AuthProvider>
                <UserProvider>
                  {/* Cart and Theme depend on global settings but not necessarily auth */}
                  <CartProvider>
                    <TooltipProvider>
                      <ThemeProvider>
                        {children}
                        <Toaster position="top-right" richColors closeButton />
                      </ThemeProvider>
                    </TooltipProvider>
                  </CartProvider>
                </UserProvider>
              </AuthProvider>
            </GuestProvider>
          </DeviceProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </StrictMode>
  );
};

export default Providers;
