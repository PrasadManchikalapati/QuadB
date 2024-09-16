const express = require('express')
const app = express()
const connect = require('./connectdb')
const Ticker=require('./models/schema')
const axios = require('axios');
const cors = require('cors'); 
const port = 3000
app.use(cors());
connect

Ticker
app.get('/fetch-tickers', async (req, res) => {
    try {
        // Fetch data from the API
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = response.data;
  
        // Extract the top 10 tickers
        const top10Tickers = Object.values(tickers).slice(0, 10);
  
        // Prepare data for saving to MongoDB
        const tickerData = top10Tickers.map(ticker => ({
            name: ticker.name,
            last: ticker.last,
            buy: ticker.buy,
            sell: ticker.sell,
            volume: ticker.volume,
            base_unit: ticker.base_unit
        }));
  
        // Insert data into MongoDB
        await Ticker.insertMany(tickerData);
  
        res.status(200).send('Top 10 tickers saved to the database');
    } catch (error) {
        console.error('Error fetching or saving tickers:', error);
        res.status(500).send('Server error');
    }
  });
  app.get('/tickers', async (req, res) => {
    try {
        // Fetch all tickers from the MongoDB collection
        const tickers = await Ticker.find().limit(10);

        // Send the tickers as a response
        res.status(200).json(tickers);
    } catch (error) {
        console.error('Error fetching tickers:', error);
        res.status(500).send('Server error');
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})