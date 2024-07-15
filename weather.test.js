// __tests__/weather.test.js

const request = require('supertest');
const app = require('./weather'); // Assuming your app.js exports the Express app object
const axios = require('axios');

jest.mock('axios');

describe('Weather API', () => {
    it('should fetch weather data for a valid city', async () => {
        const mockData = {
            name: 'New York',
            main: { temp: 15, humidity: 60 },
            wind: { speed: 5 },
            weather: [{ description: 'Cloudy' }]
        };

        axios.get.mockResolvedValue({ data: mockData });

        const response = await request(app).get('/weather?city=New%20York');

        expect(response.status).toBe(200);
        expect(response.body.city).toBe('New York');
        expect(response.body.temperature).toBe(15);
        expect(response.body.humidity).toBe(60);
        expect(response.body.windSpeed).toBe(5);
        expect(response.body.weatherDescription).toBe('Cloudy');
    });

    it('should handle error when city is not provided', async () => {
        const response = await request(app)
            .get('/weather');

        expect(response.status).toBe(400);
        expect(response.text).toBe('City parameter is required');
    });

    it('should handle error when city is not found', async () => {
        axios.get.mockRejectedValue({ response: { status: 404 } });

        const response = await request(app)
            .get('/weather?city=InvalidCity');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Error fetching weather data');
    });

    it('should handle server error', async () => {
        axios.get.mockRejectedValue(new Error('Network error'));

        const response = await request(app)
            .get('/weather?city=New%20York');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error fetching weather data');
    });
});
