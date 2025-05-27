import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WiDayCloudy } from 'react-icons/wi';
import { signIn, selectAuthLoading, selectAuthError, clearError } from '../../store/slices/authSlice';
import styles from './Auth.module.css';

const Login = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    // Clear any existing errors when component mounts or unmounts
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signIn({ username, password }));
  };

  return (
    <>
      <div className={styles.iconContainer}>
        <WiDayCloudy className={styles.icon} />
      </div>
      <h2 className={styles.title}>Login</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={styles.input}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className={styles.toggle}>
        Don't have an account?{' '}
        <button onClick={onToggleForm} className={styles.toggleButton}>
          Sign Up
        </button>
      </p>
    </>
  );
};

export default Login; 