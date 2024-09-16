const mongoose  = require('mongoose')
const axios = require('axios');
const TickerSchema = new mongoose.Schema({
    name: String,
    last: Number,
    buy: Number,
    sell: Number,
    volume: String,
    base_unit: String
});

module.exports = mongoose.model('Ticker', TickerSchema);