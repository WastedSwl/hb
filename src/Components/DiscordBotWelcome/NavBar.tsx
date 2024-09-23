import React from 'react';
import styles from './DiscordBotWelcome.module.css';
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="#features" className={styles.navLink}>Функции</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/blog" className={styles.navLink}>Blog</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
