import styles from './Forecast.module.css';

const Forecast = ({ forecastData, unit }) => {
  if (!forecastData || forecastData.length === 0) return null;
  
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className={styles.forecastContainer}>
      <h2 className={styles.forecastTitle}>5-Day Forecast</h2>
      <div className={styles.forecastGrid}>
        {forecastData.map((day, index) => (
          <div key={index} className={styles.forecastCard}>
            <div className={styles.forecastDate}>
              {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className={styles.forecastIcon}
            />
            <div className={styles.forecastTemp}>
              {Math.round(day.main.temp)}{unitSymbol}
            </div>
            <div className={styles.forecastDesc}>
              {day.weather[0].description}
            </div>
            <div className={styles.forecastDetails}>
              <span>H: {Math.round(day.main.temp_max)}{unitSymbol}</span>
              <span>L: {Math.round(day.main.temp_min)}{unitSymbol}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast; 