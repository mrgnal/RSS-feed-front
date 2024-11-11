'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import styles from '@/app/components/landing/navbar/navbar.module.css';

interface User {
  access_token: string;
  email: string;
  groups: string[];
  refresh_token: string;
  status_code: number;
  user_id: string;
  username: string;
}

interface NavbarProps {
  variant?: 'full' | 'minimal'; // The 'full' variant has all nav links, 'minimal' is just logo + menu
}

export default function Navbar({ variant = 'full' }: NavbarProps) {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user data from localStorage on component mount
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData) as User);
    }
  }, []);

  const navlinks = [
    { label: 'About RSS', link: '#reasons' },
    { label: 'Feeds', link: '#generateFeed' },
    { label: 'Reviews', link: '#testimonials' },
    { label: 'Subscription and Price', link: '#plans' },
  ];

  return (
    <main>
      <nav className={styles.navbar}>
        <div className="flex items-center gap-8">
          {/* Logo and Text (Only for minimal variant) */}
          {variant === 'minimal' && (
            <Link href="/my-feeds" className="flex items-center gap-2">
            <Image
              src="/logo-icon.svg"
              alt="RSS icon"
              width={40}
              height={40}
              className={styles.logoIcon}
            />
              <span className={styles.logoText}>RSS Feeder</span>
          </Link>)}
          {variant === 'full' && (<Link href="/pages/main" className="flex items-center gap-2">
            <Image
              src="/logo-icon.svg"
              alt="RSS icon"
              width={40}
              height={40}
              className={styles.logoIcon}
            />            
          </Link>)}

          {/* Desktop Links - Show only if 'full' variant */}
          {variant === 'full' && (
            <div className={styles.navLinks}>
              {navlinks.map((d, i) => (
                <Link key={i} href={d.link} className={styles.link}>
                  {d.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Authentication Links or User Info */}
        
        <div className={styles.authLinks}>
          {user ? (
            <div className={`flex items-center gap-2 ${styles.hideOnMobile}`}>
              <span>{user.username}</span>
              <Link href="/my-feeds">
                <Image
                  src="/defaultProfile-icon.svg"
                  alt="User Icon"
                  width={32}
                  height={32}
                  className={styles.userIcon}
                />
              </Link>
            </div>
          ) : (
            <>
              <Link href="/pages/Auth/login" className={styles.authLink}>
                Log in
              </Link>
              <Link href="/pages/Auth/signup" className={styles.authLink}>
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        {variant === 'full' && (
          <FiMenu onClick={() => setMenu(true)} className={styles.menuIcon} />
        )}

        {/* Sidebar Mobile Menu - Show only if 'full' variant */}
        {variant === 'full' && (
          <div
            className={`${styles.sidebarMenu} ${isSideMenuOpen ? styles.sidebarMenuOpen : ''}`}
          >
            <section className={styles.sidebarContent}>
              <IoCloseOutline onClick={() => setMenu(false)} className={styles.closeIcon} />

              {navlinks.map((d, i) => (
                <Link key={i} href={d.link} className={styles.sidebarLink}>
                  {d.label}
                </Link>
              ))}

              {/* Auth links for mobile */}
              {user ? (
                <Link href="/my-feeds" className={styles.sidebarLink}>
                  {user.username}
                </Link>
              ) : (
                <>
                  <Link href="/pages/Auth/login" className={styles.sidebarLink}>
                    Log in
                  </Link>
                  <Link href="/pages/Auth/signup" className={styles.sidebarLink}>
                    Sign up
                  </Link>
                </>
              )}
            </section>
          </div>
        )}
      </nav>
    </main>
  );
}
