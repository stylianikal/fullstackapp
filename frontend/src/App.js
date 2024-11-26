import React, { Component } from 'react';
import './app.css';
import { CircularProgress, Typography } from '@mui/material';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            weather: null,
            geodata: null,
            error: null,
            loading: false,
        }
    }

    handleInputChange = (event) => {
        this.setState({ city: event.target.value })
    }

    fetchWeather = async () => {
        const {city} = this.state;

        if (!city) {
            this.setState({ error: 'Please enter a city name.', weather: null })
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/weather?city=${city}`)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json();
            this.setState({ weather: data, error: null })
            this.fetchGeodata()
        } catch (error) {
            console.error('Error fetching weather data:', error.message)
            this.setState({ error: 'City not found or OpenWeather API error.', weather: null })
        }
    }
    fetchGeodata = async () => {
        const {city} = this.state

        if (!city) {
            this.setState({ error: 'Please enter a city name.', weather: null })
            return
        }
        try {
            const response = await fetch(`http://localhost:8000/api/geodata?city=${city}`)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            this.setState({ geodata: data, error: null })
        } catch(error){
            console.error('Error fetching geodata:', error.message)
            this.setState({ error: 'City not found or Geonames API error.', weather: null })
        }
    }

   
    renderLoading() {
        const { loading } = this.state;
    if (!loading) return null;

    return (
        <div className='loading-indicator'>
            <CircularProgress />
        </div>
    );
    }

    // Render weather details
    renderWeatherDetails() {
        const {weather} = this.state
        if (!weather) return null

        return (
            <div className="weather-box">
                <h2>Weather Details:</h2>
                <Typography>City:{weather.name}</Typography>
                <Typography>Temperature: {weather.main.temp}°C</Typography>
                <Typography>Description: {weather.weather[0].description}</Typography>
                {/* <Typography>Longitude: {weather.coord.lon}</Typography>
                <Typography>Latitude: {weather.coord.lat}</Typography> */}
            </div>
        )
    }

    renderGeoNames(){
        const {geodata} = this.state
        console.log('---',geodata)
        if(!geodata){
            return null
        }
        return (
            <div className="weather-box">
                <h2>GeoNames Data:</h2>
                <Typography>City: {geodata.postalCodes[0].placeName}</Typography>
                <Typography>Longitude: {geodata.postalCodes[0]?.lng}</Typography>
                <Typography>Latitude: {geodata.postalCodes[0]?.lat}</Typography>
            </div>
        )

    }

    
    render() {
        const { city, error } = this.state

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
                {/* <button onClick={this.fetchWeather}>Get Weather</button> */}
                <button onClick={ this.fetchWeather}>Get Weather and Geodata</button>
                </div>
                {this.renderLoading()}
                {error && <p className="error-message">{error}</p>}
                {this.renderWeatherDetails()}
                {this.renderGeoNames()}
            </div>
        )
    }
}

export default App;
