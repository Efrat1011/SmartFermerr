require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
     GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};
