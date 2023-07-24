import Link from 'next/link';
import styles from '@/app/page.module.css';

export const Navigation = () => {
  return (
    <div>
      <Link href="/" className={styles.links}>
        Home
      </Link>
      <Link href="/about" className={styles.links}>
        About
      </Link>
    </div>
  );
};
