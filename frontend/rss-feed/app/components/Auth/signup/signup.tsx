'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import PasswordInput from '@/app/components/Auth/passwordInput/passwordInput'; // Adjust path as needed
import styles from '@/app/components/Auth/signup/signup.module.css';
import {Link} from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
      });
      const router = useRouter();
    
      const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
      });
    
      const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
      
        // Оновлюємо значення полів форми
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      
        // Скидаємо помилку для поля, яке редагується
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      };
      
      const validateForm = () => {
        let isValid = true;
        const newErrors = {
            username: '',
            email: '',
            password: '',
            repeatPassword: ''
          };
    
        if (!formData.username) {
            newErrors.username = 'Please enter your name';
            isValid = false;
         }

        if (!formData.email) {
            newErrors.email = 'Please enter your email';
            isValid = false;
         }

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
    
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        if (!validateForm()) {
          return;
        }
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: formData.username,
              email: formData.email,
              password: formData.password,
              role: 'User',
              is_email_verified: false
            }),
          });
    
          if (!response.ok) {
            if (response.status >= 400 && response.status < 500) {
              const errorData = await response.json(); // Отримуємо деталі помилки
              console.error('Client error (4xx):', errorData);
              setErrors(prev => ({
                ...prev,
                general: errorData.message || 'There was an error with your request. Please check and try again.'
              }));
            } else {
              throw new Error('Registration failed');
            }
          }
    
          const data = await response.json();
          console.log('Registration successful', data);
          router.push('/pages/Auth/login'); 
        } catch (error) {
          console.error('Error:', error);
          setErrors(prev => ({
            ...prev,
            general: 'Registration failed. Please try again.'
          }));
        }
      };

  return (
     <div className={styles.loginContainer}>
        <div className={styles.loginCard}>

            <div className={styles.loginLeft}>
                    <h1 className={styles.loginTitle}>
                        <span className={styles.greenText}>Join</span> thousands who manage their feeds using RSS
                    </h1>
                    <p className={styles.loginSubtitle}>
                        Generate feeds - no coding required<br />
                        Bundle multiple feeds into one feed<br />
                        Embed feeds using awesome widgets
                    </p>
                    <Image 
                        src="/signUp-icon.svg" 
                        alt="RSS icon"
                        className={styles.loginIcon} 
                        width={80}
                        height={80}
                    />
            </div>

            <div className={styles.loginRight}>
                <div className={styles.socialButtons}>
                    <button type="button" className={`${styles.socialButton} ${styles.googleButton}`}>
                        <Image 
                            src="/google-icon.svg" 
                            alt="Google icon"
                            width={20}
                            height={20}
                            className={styles.googleIcon}
                        />
                        Sign in with Google
                    </button>
                </div>
                
                <div className={styles.divider}>
                    <span>or</span>
                </div>

                {/* Input Fields */}
                <div className={styles.inputGroup}>
                    <input
                        id='username'
                        type="text"
                        name="username"
                        placeholder="Login"
                        className={styles.inputField}
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className={styles.errorText}>{errors.username}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        id='email'
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={styles.inputField}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className={styles.errorText}>{errors.email}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <PasswordInput
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder='Password'
                    />
                </div>

                <div className={styles.inputGroup}>
                    <PasswordInput
                        name='repeatPassword'
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        error={errors.repeatPassword}
                        placeholder='Repeat password'
                    />
                    {errors.repeatPassword && <p className={styles.errorText}>{errors.repeatPassword}</p>}
                </div>

                <div className={styles.confirmButtonContainer}>
                    <button type="button" className={styles.confirmButton} onClick={handleSubmit}>Confirm</button>
                </div>

                <p className={styles.signupText}>
                    Have an account?{' '}
                    <Link href="/pages/Auth/login" className={styles.signupLink}>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    </div>
  );
}
