const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const db = require('./config/database');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();


//sequelize
db.authenticate()
.then(()=> console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

db.sync();

//passport config
require('./config/passport')(passport);

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended: false}));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect to Flash
app.use(flash());

//Global Vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Rendering Deafult Folder
app.use(express.static('public'));

//Cookie-Parser
app.use(cookieParser());

//Routes
app.use('/',require('./routes/index'));

app.all('*', (req,res,next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler);

const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on port - ${PORT}`));