const sequelizer = require('sequelize');
const db = require('../config/database');

const applicant = db.define('applicants',{
    applicantid: {
        type:sequelizer.STRING
    },
    firstname: {
        type: sequelizer.STRING
    },
    lastname: {
        type: sequelizer.STRING
    },
    birthday: {
        type: sequelizer.DATEONLY
    },
    gender: {
        type: sequelizer.STRING
    },
    email: {
        type: sequelizer.STRING
    },
    course: {
        type: sequelizer.STRING
    },
    courseType: {
        type: sequelizer.STRING
    },
    mobile: {
        type: sequelizer.STRING
    },
},
{
    timestamps: false
});


module.exports = applicant;