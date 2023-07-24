'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import styles from '../app/page.module.css';

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <button
      className={styles.loginButton}
      onClick={() => signIn('google', { callbackUrl })}>
      Continue with Google
    </button>
  );
};

export { GoogleButton };
