import styles from './WeatherDisplay.module.css';

const WeatherDisplay = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className={styles.weatherCard}>
      <h2 className={styles.cityName}>{name}</h2>
      <div className={styles.mainInfo}>
        <img 
          src={iconUrl} 
          alt={weather[0].description} 
          className={styles.weatherIcon}
        />
        <div className={styles.temperature}>
          {Math.round(main.temp)}{unitSymbol}
        </div>
      </div>
      <div className={styles.description}>
        {weather[0].description}
      </div>
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span>Feels like:</span> {Math.round(main.feels_like)}{unitSymbol}
        </div>
        <div className={styles.detailItem}>
          <span>Humidity:</span> {main.humidity}%
        </div>
        <div className={styles.detailItem}>
          <span>Wind:</span> {Math.round(wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 