'use client';

// import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import styles from '@/app/page.module.css';

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const user = await res.json();

      if (user && !user.error) {
        console.log('user+ :>> ', user);
        toast.success('User logged in successfully');

        router.push('/');
      } else {
        console.log('user- :>> ', user.error);
        toast.error(user.error);
      }
    } catch (error) {
      console.log('error :>> ', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <input
        type="email"
        name="email"
        placeholder="example@mail.com"
        required
        className={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        required
        className={styles.input}
      />
      <button type="submit" className={styles.loginButton}>
        {loading ? 'Processing...' : 'Login'}
      </button>
    </form>
  );
};
