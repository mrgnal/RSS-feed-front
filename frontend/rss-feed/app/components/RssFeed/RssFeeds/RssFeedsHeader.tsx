'use client';

import TypeButton from '../../TypeButton'
import style from './RssFeedsHeader.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import styles from '@/app/components/landing/navbar/navbar.module.css';
import UserModal from '@/app/components/modals/userModal/userModal';

interface User {
  access_token: string;
  email: string;
  groups: string[];
  refresh_token: string;
  status_code: number;
  user_id: string;
  username: string;
}

const RssFeedsHeader = ({children} : {children: React.ReactNode}) => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData) as User);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setModalOpen(false);
    router.push('/pages/main'); 
  };

  return (
    <div className={style.header}>
        {children}
        <div className={style.user}>
            <TypeButton image='/Plus.svg' text='New Feed' style='activeButton' onClick={()=>{
              router.push('/rss-feed');
            }}/>
            <div className="flex items-center gap-2">
          {user ? (
            <div className={`flex items-center gap-2 ${styles.hideOnMobile}`} ref={modalRef}>
              <Image
                src="/defaultProfile-icon.svg"
                alt="User Icon"
                width={50}
                height={50}
                className={styles.userIcon}
                onClick={() => setModalOpen(!isModalOpen)}
              />
              {isModalOpen && (
                <UserModal
                  username={user.username}
                  email={user.email}
                  onLogout={handleLogout}
                />
              )}
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
        </div>
    </div>
  )
}

export default RssFeedsHeader