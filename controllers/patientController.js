const express = require('express');
const mongoose = require('mongoose')
var router = express.Router();

const Patient = mongoose.model('Patient');

router.get('/', (req, res) => {
    res.render('patient/addOrEdit', {
        viewTitle : "Insert Patients Data"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var patient = new Patient();
    patient.fullName = req.body.fullName;
    patient.address = req.body.address;
    patient.mobile = req.body.mobile;
    patient.coronaStatus = req.body.coronaStatus;
    patient.save((err, doc) => {
        if (!err)
            res.redirect('patient/records');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("patient/addOrEdit", {
                    viewTitle: "Insert Patient Details",
                    patient: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Patient.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('patient/records'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("patient/addOrEdit", {
                    viewTitle: 'Update Patient Details',
                    patient: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/records', (req, res) => {
    Patient.find((err, docs) => {
        if (!err) {
            res.render("patient/records", {
                records: docs
            });
        }
        else {
            console.log('Error in retrieving employee records :' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'address':
                body['addressError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
            case 'coronaStatus':
                body['coronaStatusError'] = err.errors[field].message;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Patient.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("patient/addOrEdit", {
                viewTitle: "Update Patient Details",
                patient: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Patient.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/patient/records');
        }
        else { console.log('Error in deleting patient data :' + err); }
    });
});

module.exports = router;