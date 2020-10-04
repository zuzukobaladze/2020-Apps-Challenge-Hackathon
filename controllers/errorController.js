const sendErrorDev = (err, req, res) => {
    let errorMessage = {};

    errorMessage.statusCode = err.statusCode;
    errorMessage.status = err.status;
    errorMessage.err = err;
    errorMessage.message = err.message;
    errorMessage.stack = err.stack;

    switch (req.cookies.lenguage) {
        case 'EN':
            res.render('page/error', { errorMessage });
            break;
        case 'GE':
            res.render('GE/error', { errorMessage });
            break;
    }  
};

const sendErrorProd = (err, req, res) => {
    let errorMessage = {};
    //Operational error 
    if (err.isOperational) {
        errorMessage.statusCode = err.statusCode;
        errorMessage.status = err.status;
        errorMessage.message = err.message;
    //Programming error
    }else{
        // 1) Log Eroor
        console.error('Error - ', err);

        // 2) Send generic message
        errorMessage.statusCode = 500;
        errorMessage.status = 'Error';
        errorMessage.message = 'Something went very wrong!';
    }

    switch (req.cookies.lenguage) {
        case 'EN':
            res.render('page/error', { errorMessage });
            break;
        case 'GE':
            res.render('GE/error', { errorMessage });
            break;
    } 
}

const handleConstraintError = (err, req, res) => {
    const errors = []; 
    err.forEach(el => {
        errors.push({ msg: `Constraint Error - ${el.message}` });
    });

    res.status(203).send({info: errors});
};

const handleValidationError = (err, req, res) => {
    const errors = []; 
    err.forEach(el => {
        errors.push({ msg: `Validation Error - ${el.message}` });
    });
    

    res.send({info: errors});
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV == 'development') {
        if (err.name === 'SequelizeUniqueConstraintError') return handleConstraintError(err.errors, req, res);
        if (err.name === 'SequelizeValidationError') return handleValidationError(err.errors, req, res);
        if (err.name === 'ReferenceError') return sendErrorProd(err, req, res);
        sendErrorDev(err, req, res);
    }else if (process.env.NODE_ENV == 'production') {
        //if (err.name === 'SequelizeUniqueConstraintError') handleConstraintError(err.errors, req, res);
        sendErrorProd(err, req, res);
    } 
    
    //console.log(err.name);
};