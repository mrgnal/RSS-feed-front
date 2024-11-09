'use client';
import { useState } from 'react';
import  Image  from 'next/image';
import { useRouter } from 'next/navigation';
import { login } from '@/app/utils/authService';
import PasswordInput from '@/app/components/Auth/passwordInput/passwordInput';
import styles from '@/app/components/Auth/login/Login.module.css';
import { Link } from '@nextui-org/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const router = useRouter();

  const validateForm = () => {
    const newErrors = { email: '', password: '', general: '' };
    let valid = true;

    if (!email) {
      newErrors.email = 'Please enter your email';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Please enter your password';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(email, password);
      router.push('/pages/main'); 
    } catch (error: any) {
      console.error('Login failed:', error);
      setErrors((prev) => ({
        ...prev,
        general: error.message || 'Invalid credentials. Please try again.',
      }));
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginCard} onSubmit={onSubmit}>
        <h1 className={styles.loginTitle}>Sign in to RSS</h1>

        <button type="button" className={`${styles.socialButton} ${styles.googleButton}`}>
          <Image src="/google-icon.svg" alt="Google icon" width={20} height={20} className={styles.googleIcon} />
          Sign in with Google
        </button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

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

        <div className={styles.inputGroup}>
          <PasswordInput
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder='Password'
          />
          <div className={styles.forgotPasswordContainer}>
            <Link href={`/pages/Auth/restorePassword?email=${encodeURIComponent(email)}`} className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>
        </div>

        <div className={styles.confirmButtonContainer}>
          <button type="submit" className={styles.confirmButton}>
            Confirm
          </button>
        </div>

        <p className={styles.signupText}>
          Don't have an account yet?
          <Link href="/pages/Auth/signup" className={styles.signupLink}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
