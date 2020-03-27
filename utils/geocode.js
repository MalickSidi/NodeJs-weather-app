const request = require('request');

const get_geoCode = (address, callback) => {
    const access_token = 'pk.eyJ1IjoibWFsaWNrOTUiLCJhIjoiY2s4Mm1vcmE3MHp0cTNscGdrYTY4djE5eiJ9.QQBMzE-b6D6wiVO0vpCK5Q';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=${access_token}&limit=1`;

    request({ url , json: true }, (err, res) => {
        if (err) {
            callback('No connection', undefined)
        }
        if (res.body.features[0] == '') {
            callback("error: incorect address", undefined);
        }
        const latitude = res.body.features[0].center[1] || 21.4885;
        const longitude = res.body.features[0].center[0] || 39.1873;
        const location = res.body.features[0].place_name || 'error';
        callback(undefined, {
            latitude,
            longitude,
            location
        })
    });

}

module.exports = get_geoCode;