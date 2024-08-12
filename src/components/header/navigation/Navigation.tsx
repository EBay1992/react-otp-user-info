import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import { removeItemFromLocalStorage } from '@utils/storage/localStorage';
import { ACCESS_TOKEN_KEY } from '@utils/constants';

function logout() {
  removeItemFromLocalStorage(ACCESS_TOKEN_KEY);
  history.go();
}

const Navigation: React.FC = () => {
  const location = useLocation();

  const renderLink = (to: string, label: string) => (
    <li className={styles.listItem}>
      <Link
        to={to}
        onClick={() => {
          return to === '/logout' ? logout() : undefined;
        }}
        className={`${styles.link} ${
          location.pathname === to ? styles.activeLink : ''
        }`}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {renderLink('/login', 'Login')}
        {renderLink('/admin', 'Admin')}
        {renderLink('/logout', 'Logout')}
      </ul>
    </nav>
  );
};

export default Navigation;
