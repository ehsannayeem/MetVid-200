const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/patientDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error occured while  connecting database : ' + err) }
});

require('./patient.model');