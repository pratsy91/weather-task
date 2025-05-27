import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city, unit = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: unit
      }
    });
    return response.data;
  } catch (error) {
    if (error?.response?.data?.message === "city not found") {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
};

export const getForecastByCity = async (city, unit = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: unit
      }
    });
    
    // Process the forecast data to get one reading per day
    const dailyForecasts = response.data.list.reduce((acc, forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = forecast;
      }
      return acc;
    }, {});

    return Object.values(dailyForecasts).slice(0, 5);
  } catch (error) {
    if (error?.response?.data?.message === "city not found") {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
}; 