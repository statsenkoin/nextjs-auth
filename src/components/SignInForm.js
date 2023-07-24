'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

import styles from '../app/page.module.css';

const SignInForm = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res && !res.error) {
      window.alert('User logged in successfully');
      router.push('/');
    } else {
      console.log('res- :>> ', res);
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
        Sign In
      </button>
    </form>
  );
};

export { SignInForm };
