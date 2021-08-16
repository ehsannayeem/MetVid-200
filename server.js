require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const patientController = require('./controllers/patientController');

var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

let resourcePath = path.join(__dirname, 'assets');
console.log(resourcePath);

app.use('/assets', express.static(resourcePath));

app.listen(3000, () => {
    console.log('Server started at port : 3000');
});

app.use('/patient', patientController);