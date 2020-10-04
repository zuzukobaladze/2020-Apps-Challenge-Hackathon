const LocalStrategy = require('passport-local').Strategy;
const LegalUser = require("./../models/user/User");
const bcrypt = require('bcryptjs');

module.exports = (passport)=>{
    passport.use(new LocalStrategy({usernameField: 'username'}, async (username, password, done) => {
        //Match User
        try {
            const user = await LegalUser.findOne({ where: { mail: username } });
            if(!user){ done(null, false, { message: 'That email is not registered' }) }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){ 
                    return done(null, user); 
                } 
                else{
                    return done(null, false, { message: 'password incorect' });
                } 
            })
        } catch (error) {
            console.log(error);
        }
    }));

    passport.serializeUser((user, done) =>{
        done(null, user.userid);
      });
      
    passport.deserializeUser(async (userid, done) =>{
        try {
           const user = LegalUser.findOne({ where: { userid } });
           done(null, user); 
        } catch (error) {
            console.log(error);   
        }
    });
}