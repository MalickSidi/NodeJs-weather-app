const request = require('request');

const forecast = (lat, long ,callback) => {
    let url = `https://api.darksky.net/forecast/c599873732608a551a8ceee9d772441a/${lat},${long}?units=si`; 
    request({ url: url, json: true }, (err, res) => {
        if (err) callback('No connection', undefined)
        if (res.body.error) callback('res.body.error', undefined)

        callback(undefined, res.body.currently);
    });
}

module.exports = forecast;