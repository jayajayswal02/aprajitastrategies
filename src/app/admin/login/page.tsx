'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { loginAdmin } from '@/lib/supabase';
import styles from './login.module.css';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await loginAdmin(username, password);
      
      if (result.success) {
        setSuccess(true);
        // Redirect to admin dashboard after 1 second
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Login failed');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <Image
            src="/logoORANGE.png"
            alt="Aprajita Strategies Logo"
            width={80}
            height={80}
            className={styles.logo}
            priority
          />
          <h1>Admin Portal</h1>
          <p className={styles.subtitle}>Manage Your Submissions</p>
        </div>

        {success ? (
          <div className={styles.successMessage}>
            <CheckCircleIcon className={styles.successIcon} />
            <h2>Login Successful!</h2>
            <p>Redirecting to dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className={styles.form}>
            {error && (
              <div className={styles.errorAlert}>
                <ErrorIcon className={styles.errorIcon} />
                <span>{error}</span>
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
