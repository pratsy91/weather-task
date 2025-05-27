import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ weatherError, forecastError }) => {
  if (!weatherError && !forecastError) return null;

  // If both APIs failed, show the weather API error
  if (weatherError && forecastError) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>
          {weatherError.message}
        </p>
      </div>
    );
  }

  // If only one API failed, show that specific error
  return (
    <div className={styles.errorContainer}>
      {weatherError && (
        <p className={styles.errorText}>
          {weatherError.message}
        </p>
      )}
      {forecastError && (
        <p className={styles.errorText}>
          {forecastError.message}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage; 