const mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    address: {
        type: String,
        required: 'This field is required.'
    },
    mobile: {
        type: String,
        required: 'This field is required.'
    },
    coronaStatus: {
        type: String,
        required: 'This field is required.'
    }
});

mongoose.model('Patient', patientSchema);