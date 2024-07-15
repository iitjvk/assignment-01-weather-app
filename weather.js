// app.js

const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).send("City parameter is required");
  }

  const apiKey = process.env.API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    const weatherData = {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      weatherDescription: data.weather[0].description,
    };
    res.json(weatherData);
  } catch (error) {
    // console.error("Error fetching weather:", error.message);
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: "Error fetching weather data" });
  }
});

module.exports = app;


