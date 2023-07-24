import Link from 'next/link';
import styles from '@/app/page.module.css';
import { GoogleButton } from '@/components/GoogleButton';
import { RegisterForm } from '@/components/RegisterForm';

export default async function Register() {
  return (
    <div className={styles.loginPage}>
      <h1>Register</h1>
      <p className={styles.text}>
        Allready have an account? Go to
        <Link href="/auth/login" className={styles.links}>
          Login
        </Link>
      </p>
      <RegisterForm />
      <div className={styles.divider}>OR</div>
      <GoogleButton />
    </div>
  );
}
