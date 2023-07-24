'use client';

import Link from 'next/link';
import styles from '@/app/page.module.css';
// import { signOut, useSession } from 'next-auth/react';
// import axios from '@/configs/axios';

export const User = () => {
  // const session = useSession();
  // console.log('session :>> ', session);

  const handleSignOut = async () => {
    // await axios.post('/api/auth/logout');
    // signOut({ callbackUrl: '/signin' });
  };

  return (
    <div>
      <Link href="/profile" className={styles.links}>
        Profile
      </Link>
      <Link href="/" className={styles.links} onClick={handleSignOut}>
        Sign Out
      </Link>
    </div>
  );
};
