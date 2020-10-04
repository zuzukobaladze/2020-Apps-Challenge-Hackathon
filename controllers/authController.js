const LegalUser = require('../models/user/User');
const sendEmail = require("./../mail");

const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {

        const { formData } = req.body;
        const obj = await JSON.parse(formData);
        
        const newUser = await LegalUser.create({
            username: obj.username,
            mail: obj.email,
            password: obj.password,
            confirmPassword: obj.confirmPassword
        }); 
    
        console.log(newUser);
        //sendEmail(obj.email, 'activate',userID);
        req.flash("success_msg", 'User Success Register');
        res.status(200).send({info: 'redirect', url:'/'});
});