'use client';
import React, { useState, useEffect } from 'react';
import PasswordInput from '@/app/components/Auth/passwordInput/passwordInput'; 
import styles from '@/app/components/Auth/newPassword/newPassword.module.css';
import { useSearchParams, useRouter } from 'next/navigation';

export default function NewPassword() {
  const [formData, setFormData] = useState({
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    repeatPassword: '',
    general: '',
  });

  const [token, setToken] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setToken(token);
    }
  }, [searchParams]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      password: '',
      repeatPassword: '',
      general: '',
    };

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!validateForm() || !token) {
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/password_reset/confirm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: formData.password,
          token: token, 
        }),
      });

      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          const errorData = await response.json();
          console.error('Client error (4xx):', errorData);
          setErrors(prev => ({
            ...prev,
            general: errorData.message || 'There was an error with your request. Please check and try again.'
          }));
        } else {
          throw new Error('Password reset failed');
        }
      } else {
        const data = await response.json();
        console.log('Password reset successful', data);
        setSuccessMessage('Your password has been successfully reset! Redirecting to login...'); // Set success message
        setTimeout(() => {
          router.push('/pages/Auth/login'); // Redirect to login page after delay
        }, 2000); // 2-second delay for showing the success message
      }

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
        <h1 className={styles.loginTitle}>Enter new password</h1>

        <div className={styles.inputGroup}>
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter new password"
          />
        </div>

        <div className={styles.inputGroup}>
          <PasswordInput
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            error={errors.repeatPassword}
            placeholder="Repeat new password"
          />
          {errors.repeatPassword && <p className={styles.errorText}>{errors.repeatPassword}</p>}
        </div>

        {successMessage && <p className={styles.successText}>{successMessage}</p>} {/* Display success message */}
        {errors.general && <p className={styles.errorText}>{errors.general}</p>} {/* Display general error if any */}

        <div className={styles.confirmButtonContainer}>
          <button type="submit" className={styles.confirmButton}>Confirm</button>
        </div>
      </form>
    </div>
  );
}
