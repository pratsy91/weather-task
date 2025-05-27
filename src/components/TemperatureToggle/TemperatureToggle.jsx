import styles from './TemperatureToggle.module.css';

const TemperatureToggle = ({ unit, onToggle }) => {
  return (
    <div className={styles.toggleContainer}>
      <button 
        className={`${styles.toggleButton} ${unit === 'metric' ? styles.active : ''}`}
        onClick={() => onToggle('metric')}
      >
        °C
      </button>
      <button 
        className={`${styles.toggleButton} ${unit === 'imperial' ? styles.active : ''}`}
        onClick={() => onToggle('imperial')}
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle; 