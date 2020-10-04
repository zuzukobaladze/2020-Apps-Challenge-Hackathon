const fetch = require('node-fetch');
//DB Functions Library
const DBquery = require('../DBquery');
const sendEmail = require("./../mail");
const sendEmailPrivate = require("./../mail/private");
const EmailValidator = require("email-deep-validator");
const { v4:uuidv4 } = require('uuid');
const passport = require('passport');
const express =  require('express');
const router = express.Router();

const authController =  require('./../controllers/authController');

var x = Math.floor(Math.random() * 100);
var y = Math.floor(Math.random() * 100);

//Home and Login
router.get('/',(req,res)=>{
    //res.cookie('lenguage','EN');
    res.render('page/main');
});

//Login Handle
router.post('/',(req,res, next)=>{
  passport.authenticate('local',{
    successRedirect: '/account',
    failureRedirect: '/',
    failureFlash: true
  })(req,res,next);
});

//Logout Handle
router.get('/logout', (req, res)=>{
  req.logOut();
  req.flash('success_msg','You are Logged out');
  res.redirect('login');
});

router.get('/signup', (req, res) => {
    res.render('page/signup')
})

router.post("/signup", authController.signup);

module.exports = router;