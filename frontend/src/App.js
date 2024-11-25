import React, { Component } from 'react';

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
            console.error('Error fetching weather data:', error.message); // Debugging log
            this.setState({ error: 'City not found or API error.', weather: null });
        }
    };

    // Render weather details
    renderWeatherDetails() {
        const { weather } = this.state;
        if (!weather) return null;

        return (
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <h2 style={{ color: 'pink' }}>Weather Details:</h2>
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
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>OpenWeatherMap API</h1>
                <input
                    style={{ margin: '24px' }}
                    type="text"
                    value={city}
                    onChange={this.handleInputChange}
                    placeholder="Enter city name"
                />
                <button onClick={this.fetchWeather}>Get Weather</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {this.renderWeatherDetails()}
            </div>
        );
    }
}

export default App;
