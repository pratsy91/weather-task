import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import Forecast from '../Forecast/Forecast';
import styles from './WeatherContainer.module.css';

const WeatherContainer = ({ weatherData, forecastData, unit }) => {
  if (!weatherData || !forecastData) return null;

  return (
    <div className={styles.container}>
      <WeatherDisplay weatherData={weatherData} unit={unit} />
      <Forecast forecastData={forecastData} unit={unit} />
    </div>
  );
};

export default WeatherContainer; 