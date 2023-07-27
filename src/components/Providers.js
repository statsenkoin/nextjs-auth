'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export const Providers = ({ children }) => {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
};
