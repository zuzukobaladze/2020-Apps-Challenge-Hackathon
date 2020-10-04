const LegalUser = require('../models/user/legalUser');
const sendEmail = require("./../mail");

exports.signup = async (req, res) => {
    try {
        const { formData } = req.body;
        const obj = await JSON.parse(formData);
        console.log(obj)
        const newUser = await LegalUser.create({
            username: obj.username,
            mail: obj.email,
            password: obj.password,
            confirmPassword: obj.confirmPassword
        }); 
    
        //sendEmail(obj.email, 'activate',userID);
        req.flash("success_msg", 'User Success Register');
        res.status(200).send({info: 'redirect', url:'/'});
    } catch (error) {
        //text = registrationFunction.generateErorr(req.cookies.lenguage,'userIsRegistered');
        const errors = error.errors.map((el) => {
            return { msg: `Field ${el.path} not correct - ${el.message}` }
        });
        //errors.push({ msg: error.dataValues });
        res.send({info: errors});
    }

}