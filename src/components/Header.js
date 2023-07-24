import Link from 'next/link';
import styles from '@/app/page.module.css';
import { Navigation } from './Navigation';
import { User } from './User';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Navigation />
      <User />
    </header>
  );
};

export { Header };
