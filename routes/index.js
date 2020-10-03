const fetch = require('node-fetch');
//DB Functions Library
const DBquery = require('../DBquery');
const sendEmail = require("./../mail");
const sendEmailPrivate = require("./../mail/private");
const EmailValidator = require("email-deep-validator");
const { v4:uuidv4 } = require('uuid');
const express =  require('express');
const router = express.Router();

var x = Math.floor(Math.random() * 100);
var y = Math.floor(Math.random() * 100);

router.get('/',(req,res)=>{
    //res.cookie('lenguage','EN');
    res.render('page/main');
});

router.get('/signup', (req, res) => {
    res.render('page/signup')
})

router.get('/register',(req,res)=>{
    //res.cookie('lenguage','EN');
    x = Math.floor(Math.random() * 100);
    y = Math.floor(Math.random() * 100);
    res.render('page/register',{ x  , y });
});

router.post('/register', async (req,res)=>{
    try {
        const { formData } = req.body;
        const obj = await JSON.parse(formData);
         //Create apllicant ID
        const applicantID = uuidv4();
        obj.applicantid = applicantID;

        const errors = [];

        //Check Mail Validation
        const emailValidator = new EmailValidator();
        const { wellFormed, validDomain } = await emailValidator.verify(obj.email);
        if (!wellFormed || !validDomain) {
            const text = 'გთხოვთ მიუთითოთ ვალიდური ელ-ფოსტა';
            errors.push({ msg: text });
        }
        
        //check birthday
        if((obj.year.length != 4) || (obj.month.length > 2)){
            const text = 'გთხოვთ სწორად მიუთითოთ დაბადების თარიღი';
            errors.push({ msg: text });        
        } else{
            obj.birthday = `${obj.year}-${obj.month}-${obj.day}`;
        }

        //check verify number
        if(x + y != (obj.verify * 1)){
            const text = 'არითმეტიკული ოპერაცია არსწორია :) ';
            errors.push({ msg: text });
        }

        //check mobile number length
        if(obj.mobile.length != 9 || obj.mobile[0] != '5'){
            const text = 'გთხოვთ სწორად მიუთითოთ მობილურის ნომერი. მაგალითისთვის - 598444444 ';
            errors.push({ msg: text });
        }

        if (errors.length > 0) {
            x = Math.floor(Math.random() * 100);
            y = Math.floor(Math.random() * 100);
            res.send({info: errors, x, y});
        } else {
            //Create SMS Code
            /* const smsText = 'Register success, please check Email';
            const url = `http://smsoffice.ge/api/v2/send/?key=162f09de12464f0e9fbef90954f5f3f6&destination=${obj.mobile}&sender=NetDev&content=${smsText}&urgent=true`;
            const getData = async url => {
                try {
                const response = await fetch(url);
                //console.log(response);
                } catch (error) {
                console.log(error);
                }
            }
            getData(url); */
            
            //Add User to DB
            const registerUser = await DBquery.registerUser(obj);
            //send email
            sendEmail(obj.email, obj.firstname);
            sendEmailPrivate(obj);
            //User success register and redireqt login
            req.flash("success_msg", 'თქვენ წარმატებით გაიარეთ რეგისტრაცია');
            res.status(200).send({info: 'redirect', url:'/'})
            //res.send({info: 'success'});
        }

    } catch (error) {
        console.log(error);
    } 
});

module.exports = router;