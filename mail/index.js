const nodemailer = require('nodemailer');
const ejs = require('ejs');

module.exports = (userEmail,applicantName) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        //port: '587',
        //secure: false,
        auth: {
            user: '2020spaceappsNASA@gmail.com',
            pass: 'nonadatagabrieli'
        }
    });

    const htmlEmail = ejs.renderFile(`${__dirname}/../views/mail/noreplay.ejs`, { applicantName },(err,str)=>{
        //console.log(str);

        const mailOptions = {
            from: '2020spaceappsNASA@gmail.com',
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
    