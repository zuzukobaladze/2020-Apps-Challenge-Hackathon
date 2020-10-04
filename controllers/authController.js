const LegalUser = require('../models/user/legalUser');
const sendEmail = require("./../mail");

exports.signup = async (req, res) => {
    try {
        const { formData } = req.body;
        const obj = await JSON.parse(formData);
        console.log(formData)
        const newUser = await LegalUser.create({
            userid: obj.userid,
            name: obj.firstname,
            lastname: obj.lastname,
            privateid: obj.privateID,
            mail: obj.email,
            birthdate: obj.birthDate,
            password: obj.password,
            confirmPassword: obj.confirmPassword,
            mobile: obj.mobile,
            gender: obj.gender,
            city: obj.city,
            address: obj.address,
            smscode: obj.smscode,
            useractivate: obj.userActivate
        }); 
    
        //sendEmail(obj.email, 'activate',userID);
        req.flash("success_msg", 'User Success Register');
        res.status(200).send({info: 'redirect', url:'/users/login'});
    } catch (error) {
        //text = registrationFunction.generateErorr(req.cookies.lenguage,'userIsRegistered');
        const errors = error.errors.map((el) => {
            return { msg: `Field ${el.path} not correct - ${el.message}` }
        });
        //errors.push({ msg: error.dataValues });
        res.send({info: errors});
    }

}