const path = require('path');
const express = require('express');
const hbs = require('hbs');

const get_geocode = require('../utils/geocode');
const forcest = require('../utils/forecast');

const app = express();

const public_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partials_path);

app.use(express.static(public_path));
app.set('view engine', 'hbs')
app.set('views', views_path);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        id: 23449839
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        id: 78749839
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please add address query!"
        });
    }
    const address = req.query.address;
    get_geocode(address, (err, { location, latitude = 21.4885, longitude = 39.1873}) => {
        if (err) return err;
        forcest(latitude, longitude, (err, { precipProbability, temperature, humidity } = {}) => {
            if (err) return res.send({err});
            res.send({
                precipProbability,
                temperature,
                humidity,
                location,
                address
            });
        })
    });
    
});

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'please add search term'
        });
    }
    const pr = req.query.search;
    res.send({
        product: [
            'A3',
            'D2',
            'Y0',
            pr
        ]
    });
});

app.listen(8080, console.log('listing on port 8080'));

// get_geocode(process.argv[2], (err, {location, latitude, longitude}) => {
//     if (process.argv[2] == undefined) return console.log('No address provided');
//     if (err) return err;
//     forcest(latitude, longitude, (err, {precipProbability, temperature, humidity}) => {
//         if (err) return err;
//         console.log(location, latitude, longitude);
//         console.log(`${precipProbability * 100}% ${temperature}C | ${humidity * 100} %`);
//     })
// });

//'21.4885,39.1873'