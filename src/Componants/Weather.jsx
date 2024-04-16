import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';


const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (cityName) {
          setLoading(true);
          const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`;
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'c1742548b5msh758b7b081d583f2p1e3a93jsn3e27a39a2465',
              'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
            },
          };

          const response = await fetch(url, options);
          const data = await response.json();
          setWeatherData(data);
        } else {
          setWeatherData(null);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  const handleCityChange = (event) => {
    setCityName(event.target.value);
  };

  return (

    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} > </IconButton>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Weather App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className='container mx-auto py-8'>

        {/* <h1 className='text-3xl font-semibold mb-4 text-center'>Weather App</h1> */}

        <div className='grid items-center'>
        <input
            type='text'
            value={cityName}
            onChange={handleCityChange}
            className='border border-gray-300 px-4 py-2 mx-auto rounded-lg focus:outline-none focus:border-blue-500 w-full md:max-w-sm'
            placeholder='Enter city name...'
          />
        </div>

        {loading && (
          <div className='border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-8'>
            <div className='animate-pulse flex space-x-4'>
              <div className='rounded-lg bg-gray-200 h-10 w-10'></div>
              <div className='flex-1 space-y-6 py-1'>
                <div className='h-2 bg-gray-200 rounded'></div>
                <div className='space-y-3'>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='h-2 bg-gray-200 rounded col-span-2'></div>
                    <div className='h-2 bg-gray-200 rounded col-span-1'></div>
                  </div>
                  <div className='h-2 bg-gray-200 rounded'></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {weatherData && !loading && (

          <>
            <div className='mt-8 p-4 rounded-lg grid md:grid-cols-2 grid-cols-1 items-start gap-4 max-w-[800px] mx-auto'>
              <div className='flex flex-wrap gap-4 p-5 rounded-xl bg-slate-100 shadow-md'>
                <div>
                  <h2 className='text-2xl font-semibold uppercase'>{cityName}</h2>
                  <h3 className='text-4xl my-3'>{weatherData.temp}°C</h3>
                </div>
                <div className='flex flex-col items-start'>
                  <p className='text-lg'>Sunrise: {new Date(weatherData.sunrise * 1000).toLocaleTimeString()}</p>
                  <p className='text-lg'>Sunset: {new Date(weatherData.sunset * 1000).toLocaleTimeString()}</p>
                  <p className='text-lg'>Humidity: {weatherData.humidity}%</p>
                </div>
              </div>
              <div className='rounded-xl p-3 flex flex-col items-start  rounded-xl bg-slate-100 shadow-md'>
                <p className='text-lg'>Feels Like: {weatherData.feels_like}°C</p>
                <p className='text-lg'>Max Temperature: {weatherData.max_temp}°C</p>
                <p className='text-lg'>Min Temperature: {weatherData.min_temp}°C</p>
                <p className='text-lg'>Cloud Percentage: {weatherData.cloud_pct}%</p>
                <p className='text-lg'>Wind Speed: {weatherData.wind_speed} m/s</p>
                <p className='text-lg'>Wind Degrees: {weatherData.wind_degrees}°</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Weather;
