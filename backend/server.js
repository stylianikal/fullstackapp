const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get('/api/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid:  process.env.API_KEY_OPENWEATHERMAP,
                units: 'metric', 
            },
        });
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message); // Debug: Log errors
        res.status(500).json({
            error: error.response?.data?.message || 'Internal Server Error',
        });
    }
});

app.get('/api/geodata', async(req, res) =>{
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }
    try {
        const response = await axios.get('http://api.geonames.org/postalCodeSearchJSON', {
            params: {
                username:  process.env.GEONAMES_USERNAME,
                placename: city,
                maxRows: 1
            },
        });
        res.json(response.data);
        console.log(response.data);
    } catch(error){
        console.error('Error fetching geo data:', error.message); // Debug: Log errors
        res.status(500).json({
            error: error.response?.data?.message || 'Internal Server Error',
        });
    }

});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
