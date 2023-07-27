import Link from 'next/link';
import styles from '@/app/page.module.css';
import { GoogleButton } from '@/components/GoogleButton';
import { LoginForm } from '@/components/LoginForm';

export default async function Login() {
  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <p className={styles.text}>
        Do not have an account? Go to
        <Link href="/auth/register" className={styles.links}>
          Register
        </Link>
      </p>
      <LoginForm />
      <div className={styles.divider}>OR</div>
      <GoogleButton />
    </div>
  );
}
