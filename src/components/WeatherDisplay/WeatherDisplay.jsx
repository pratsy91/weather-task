import styles from './WeatherDisplay.module.css';

const WeatherDisplay = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className={styles.weatherCard}>
      <div className={styles.weatherMain}>
        <div className={styles.mainInfo}>
          <div className={styles.weatherInfo}>
            <div className={styles.temperature}>
              {Math.round(main.temp)}
              <span className={styles.tempUnit}>{unitSymbol}</span>
            </div>
            <h2 className={styles.cityName}>{name}</h2>
            <p className={styles.description}>{weather[0].description}</p>
          </div>
          <div className={styles.weatherDisplay}>
            <img 
              src={iconUrl} 
              alt={weather[0].description} 
              className={styles.weatherIcon}
            />
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Feels like</span>
          <span className={styles.detailValue}>{Math.round(main.feels_like)}{unitSymbol}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Humidity</span>
          <span className={styles.detailValue}>{main.humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Wind</span>
          <span className={styles.detailValue}>{Math.round(wind.speed)} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 