import styles from '@/app/page.module.css';
import { Navigation } from '@/components/Navigation';
import { User } from '@/components/User';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Navigation />
      <User />
    </header>
  );
};

export { Header };
