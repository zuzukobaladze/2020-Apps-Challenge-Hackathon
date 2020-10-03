const nodemailer = require('nodemailer');
const ejs = require('ejs');

module.exports = (userEmail,applicantName) =>{
    const transporter = nodemailer.createTransport({
        host: 'mail.airnav.ge',
        port: '25',
        secure: false,
        auth: {
            user: 'ts.margvelashvili@airnav.ge',
            pass: 'tsotne1214'
        },
        tls: {
            rejectUnauthorized: false //do not fail on invalid certs
        }
    });

    const htmlEmail = ejs.renderFile(`${__dirname}/../views/mail/noreplay.ejs`, { applicantName },(err,str)=>{
        //console.log(str);

        const mailOptions = {
            from: 'ts.margvelashvili@airnav.ge',
            to: userEmail,
            subject: 'NetDev - Registration Page',
            html: str
        }

        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err);
            }else{
                console.log(`Email sent: ${info.response}`);
            }
        });
    });

    
}
    