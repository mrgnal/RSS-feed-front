import React from 'react';
import styles from './userModal.module.css';

interface UserModalProps {
  username: string;
  email: string;
  onLogout: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ username, email, onLogout }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <span className={styles.username}>{username}</span>
        <span className={styles.email}>{email}</span>
      </div>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <a href="/pages/profile" className={styles.menuLink}>
            <i className="fas fa-user"></i> Account
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="/pages/plans" className={styles.menuLink}>
            <i className="fas fa-tags"></i> Subscription
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="/my-colections" className={styles.menuLink}>
            <i className="fas fa-book"></i> Curate Feeds
          </a>
        </li>
      </ul>
      <button className={styles.logoutButton} onClick={onLogout}>
        <i className="fas fa-sign-out-alt"></i> Sign out
      </button>
    </div>
  );
};

export default UserModal;
