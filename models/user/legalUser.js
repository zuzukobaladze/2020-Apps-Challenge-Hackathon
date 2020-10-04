const Sequelize = require('sequelize');
const db = require('../../config/database');
const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid");

const LegalUser = db.define('legalUser',{
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: 'please insert correct email address'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    confirmPassword: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          checkPassword: function(value) {
                if (value !== this.password) {
                throw new Error('password Mismatch');
                }
            }  
        }   
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    userid: {
        type: Sequelize.STRING
    },
    smscode: {
        type: Sequelize.STRING
    },
    useractivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
},
{
    timestamps: false
});

LegalUser.addHook('beforeCreate', async (user, options) => {
    var hashPassword = await bcrypt.hash(user.password,10);
    user.password = hashPassword;
    var MY_NAMESPACE = "16b71a64-491e-da01ff1f3341";
    const userID = uuidv4(MY_NAMESPACE);
    user.userid = userID;
    const generate = require("nanoid/generate");
    smsCode = generate("1234567890abcdef", 5);
    user.smscode = smsCode;
});

module.exports = LegalUser;