import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import Forecast from '../Forecast/Forecast';
import styles from './WeatherContainer.module.css';

const WeatherContainer = ({ weatherData, forecastData, unit }) => {
  if (!weatherData || !forecastData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.currentWeather}>
        <WeatherDisplay weatherData={weatherData} unit={unit} />
      </div>
      <div className={styles.forecast}>
        <Forecast forecastData={forecastData} unit={unit} />
      </div>
    </div>
  );
};

export default WeatherContainer; 