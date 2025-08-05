const axios = require('axios');
const { WEATHER_API_KEY } = require('../config/env');

const cities = ['Astana', 'Almaty', 'Shymkent', 'Aqtobe', 'Kyzylorda', 'Oral', 'Oskemen', 'Pavlodar', 'Karaganda', 'Kostanay'];

const getWeather = async (req, res) => {
  try {
    const weatherData = await Promise.all(
      cities.map(async (city) => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},KZ&appid=${WEATHER_API_KEY}&units=metric`
        );

        return {
          city: city,
          temperature: response.data.main.temp,
          description: response.data.weather[0].description,
        };
      })
    );

    res.json(weatherData);
  } catch (error) {
    console.error('Weather error:', error.message);
    res.status(500).json({ message: 'Ауа райын жүктеу кезінде қате болды' });
  }
};

module.exports = { getWeather };
