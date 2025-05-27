import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { WiDayCloudy } from 'react-icons/wi';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherContainer from './components/WeatherContainer/WeatherContainer';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import TemperatureToggle from './components/TemperatureToggle/TemperatureToggle';
import AuthContainer from './components/Auth/AuthContainer';
import Loader from './components/Loader/Loader';
import { getWeatherByCity, getForecastByCity } from './services/weatherApi';
import { selectUser, clearUser } from './store/slices/authSlice';
import { authService } from './services/authService';
import store from './store/store';
import styles from './App.module.css';

// Configure the query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetch on window focus
      retry: 1, // Only retry failed requests once
    },
  },
});

function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  // Load user's last city when they log in
  useEffect(() => {
    if (user) {
      if (user.last_city) {
        setCity(user.last_city);
      }
      if (user.last_unit) {
        setUnit(user.last_unit);
      }
    }
  }, [user]);

  const { data: weatherData, error: weatherError, isLoading: weatherLoading } = useQuery({
    queryKey: ['weather', city, unit],
    queryFn: () => getWeatherByCity(city, unit),
    enabled: !!city,
    staleTime: 30000, 
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: false, 
  });

  const { data: forecastData, error: forecastError, isLoading: forecastLoading } = useQuery({
    queryKey: ['forecast', city, unit],
    queryFn: () => getForecastByCity(city, unit),
    enabled: !!city,
    staleTime: 30000,
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: false, 
  });

  const handleSearch = async (searchCity) => {
    setCity(searchCity);
    if (user?.id) {
      await authService.updateLastCity(user.id, searchCity);
    }
  };

  const handleUnitToggle = async (newUnit) => {
    setUnit(newUnit);
    if (user?.id) {
      await authService.updateLastUnit(user.id, newUnit);
    }
  };

  const handleSignOut = () => {
    dispatch(clearUser());
    setCity('');
    setUnit('metric');
  };

  const isLoading = weatherLoading || forecastLoading;
  const hasError = weatherError || forecastError;
  const hasData = weatherData && forecastData;

  return (
    <div className={styles.container}>
      {!user ? (
        <AuthContainer />
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.headerRow}>
              <WiDayCloudy className={styles.headerIcon} />
              <h1 className={styles.title}>WeatherWatch</h1>
            </div>
            <button onClick={handleSignOut} className={styles.signOutButton}>
              Sign Out
            </button>
          </div>
          <SearchBar onSearch={handleSearch} />
          <TemperatureToggle unit={unit} onToggle={handleUnitToggle} />
          {isLoading && <Loader />}
          {hasError && (
            <ErrorMessage
              weatherError={weatherError}
              forecastError={forecastError}
            />
          )}
          {hasData && (
            <WeatherContainer
              weatherData={weatherData}
              forecastData={forecastData}
              unit={unit}
            />
          )}
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WeatherDashboard />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
