'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import styles from '@/app/page.module.css';
import { authFetch } from '@/helpers/authFetch';

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

      const user = await authFetch('login', userData);
      if (!user || user.error) throw new Error(user.error);
      toast.success('User logged in successfully');

      await signIn('credentials', { ...user, redirect: false });

      router.push('/');

      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });
      // const user = await response.json();

      // if (!user || user.error) {
      //   console.log('logForm userLogin.error:>> ', user.error);
      //   throw new Error(user.error);
      // }

      // await signIn('credentials', { ...user, redirect: false });

      // console.log('logForm userLogin+:>> ', user);
      // toast.success('User logged in successfully');
      // router.push('/');
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
