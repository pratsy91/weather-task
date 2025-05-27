import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import styles from './Auth.module.css';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authContainer}>
        {isLogin ? (
          <Login onToggleForm={toggleForm} />
        ) : (
          <SignUp onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default AuthContainer; 