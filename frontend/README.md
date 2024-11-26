#1.     Setup Instractions:

Sign up at OpenWeatherMap to get an API key.
Sign up at GeoNames to get an API key.

#install dependencies

#Backend
cd backend
npm i
npm install express axios dotenv cors

#FrontEnd
cd frontend
npm i
npm install @mui/material @emotion/react @emotion/styled

Create .env file in the backend for variables:

API_KEY_OPENWEATHERMAP=your_openweathermap_api_key
GEONAMES_USERNAME=your_geonames_username
[For safety on github I add my .env on .gitignore file, so my keys don't get stolen]

Start the backend server with this: 
node server.js
Verify the backend is running on http://localhost:8000

View the application frontend with this :
npm start
Open http://localhost:3000 to view my application

#2.     Application Overview:

The application fetches weather and geo-data for a city using OpenWeatherMap and GeoNames APIs.
Data displayed:

    City Name
    Temperature
    Weather Description
    Latitude
    Longitude

I used 2 endpoints:

1--> /api/geodata for geonames API call
2--> /api/weather , for the weather API call
We need only the city to fetch the data, validations for city

GitHub Repository: 
https://github.com/stylianikal/fullstackapp

#3.     Potential Improvements:

Add more styling and animations.
Add more API endpoints and fetch more data .
Implement unit tests for APIs and components.