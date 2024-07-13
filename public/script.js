// public/app.js

const weatherForm = document.getElementById('weatherForm');
const weatherInfo = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = document.getElementById('cityInput').value.trim();

    try {
        const response = await fetch(`/weather?city=${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

function displayWeather(data) {
    weatherInfo.innerHTML = `
        <h2>${data.city}</h2>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} m/s</p>
        <p>Weather: ${data.weatherDescription}</p>
    `;
}
