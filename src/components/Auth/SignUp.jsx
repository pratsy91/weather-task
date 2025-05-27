import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WiDayCloudy } from 'react-icons/wi';
import { signUp, selectAuthLoading, selectAuthError, clearError } from '../../store/slices/authSlice';
import styles from './Auth.module.css';

const SignUp = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!username.trim() || !password || !confirmPassword) {
      setLocalError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    dispatch(signUp({ username, password }));
  };

  return (
    <>
      <div className={styles.iconContainer}>
        <WiDayCloudy className={styles.icon} />
      </div>
      <h2 className={styles.title}>Sign Up</h2>
      {(localError || error) && <div className={styles.error}>{localError || error}</div>}
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
        <div className={styles.inputGroup}>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className={styles.input}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className={styles.button}
        >
          {loading ? <span className={styles.buttonLoader} /> : 'Sign Up'}
        </button>
      </form>
      <p className={styles.toggle}>
        Already have an account?{' '}
        <button onClick={onToggleForm} className={styles.toggleButton}>
          Login
        </button>
      </p>
    </>
  );
};

export default SignUp; 