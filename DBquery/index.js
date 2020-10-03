const db = require('../config/database');
const applicant = require('../models/applicant');

exports.registerUser = async (obj) => {
    db.sync();
    try {
        var result = await applicant.create({
            applicantid: obj.applicantid,
            firstname: obj.firstname,
            lastname: obj.lastname,
            birthday: obj.birthday,
            gender: obj.gender,
            email: obj.email,
            course: obj.course,
            courseType: obj.courseType,
            mobile: obj.mobile,
        });
        return result;
    } catch (error) {
        return error;
    }  
}