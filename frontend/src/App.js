import React, { Component } from 'react';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            weather: null,
            error: null,
        };
    }

    handleInputChange = (event) => {
        this.setState({ city: event.target.value });
    };

    fetchWeather = async () => {
        const { city } = this.state;

        if (!city) {
            this.setState({ error: 'Please enter a city name.', weather: null });
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/data?city=${city}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ weather: data, error: null });
        } catch (error) {
            console.error('Error fetching weather data:', error.message); 
            this.setState({ error: 'City not found or API error.', weather: null });
        }
    };

    // Render weather details
    renderWeatherDetails() {
        const { weather } = this.state;
        if (!weather) return null;

        return (
            <div className="weather-box">
                <h2>Weather Details:</h2>
                <p><strong>City:</strong> {weather.name}</p>
                <p><strong>Country:</strong> {weather.sys.country}</p>
                <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
                <p><strong>Feels Like:</strong> {weather.main.feels_like}°C</p>
                <p><strong>Weather:</strong> {weather.weather[0].main}</p>
                <p><strong>Description:</strong> {weather.weather[0].description}</p>
            </div>
        );
    }

    render() {
        const { city, error } = this.state;

        return (
            <div className="app-container">
                <h1>OpenWeatherMap API Vs GeoNames API</h1>
                <div className="input-container">
                <input
                    style={{ margin: '24px' }}
                    type="text"
                    value={city}
                    onChange={this.handleInputChange}
                    placeholder="Enter city name"
                />
                <button onClick={this.fetchWeather}>Get Weather</button>
                </div>
                {error && <p className="error-message">{error}</p>}
                {this.renderWeatherDetails()}
            </div>
        );
    }
}

export default App;
