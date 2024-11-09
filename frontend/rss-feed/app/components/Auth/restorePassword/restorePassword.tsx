'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { user } from '@/app/interfaces/user';
import styles from '@/app/components/Auth/restorePassword/restorePassword.module.css';
import { Link } from '@nextui-org/react';

export default function RestorePassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || ''; 
  const [email, setEmail] = useState(initialEmail);
  const [errors, setErrors] = useState({ email: '' });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '' };

    if (!email) {
      newErrors.email = 'Please enter your email';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/password_reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          const errorData = await response.json(); // Get error details
          console.error('Client error (4xx):', errorData);
          setErrors(prev => ({
            ...prev,
            general: errorData.message || 'There was an error with your request. Please check and try again.'
          }));
        } else {
          throw new Error('Password reset failed');
        }
      }

      const data: user = await response.json();
      console.log('Password reset successful', data);

      await router.push('/pages/Auth/waitRestore');
    } catch (error) {
      console.error('Error:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Password reset failed. Please try again.'
      }));
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginCard} onSubmit={onSubmit}>
        <h1 className={styles.loginTitle}>Restore password</h1>

        <div className={styles.inputGroup}>
          <input
            id="email"
            type="email"
            className={styles.inputField}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

        <div className={styles.confirmButtonContainer}>
          <button type="submit" className={styles.confirmButton}>
            Confirm
          </button>
        </div>

        <p className={styles.signupText}>
          Remembered your password?
          <Link href="/pages/Auth/login" className={styles.signupLink}>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
