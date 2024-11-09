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
        <li className={styles.menuItem}><i className="fas fa-user"></i> Account</li>
        <li className={styles.menuItem}><i className="fas fa-wallet"></i> Billing</li>
        <li className={styles.menuItem}><i className="fas fa-tags"></i> Subscription</li>
        <li className={styles.menuItem}><i className="fas fa-briefcase"></i> Manage Workspace</li>
        <li className={styles.menuItem}><i className="fas fa-book"></i> Curate Feeds</li>
        <li className={styles.menuItem}><i className="fas fa-code"></i> API</li>
        <li className={styles.menuItem}><i className="fas fa-upload"></i> Import</li>
        <li className={styles.menuItem}><i className="fas fa-download"></i> Export</li>
      </ul>
      <button className={styles.logoutButton} onClick={onLogout}>
        <i className="fas fa-sign-out-alt"></i> Sign out
      </button>
    </div>
  );
};

export default UserModal;
