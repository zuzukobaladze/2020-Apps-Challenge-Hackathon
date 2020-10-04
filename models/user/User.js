const Sequelize = require('sequelize');
const db = require('../../config/database');
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const User = db.define('User',{
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
        },
        unique: { 
            args: true,
            msg: 'You are already registered !!' 
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
    useractivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
},
{
    timestamps: false
});

User.addHook('beforeCreate', async (user, options) => {
    var hashPassword = await bcrypt.hash(user.password,10);
    user.password = hashPassword;
    var MY_NAMESPACE = "16b71a64-491e-da01ff1f3341";
    const userID = uuidv4(MY_NAMESPACE);
    user.userid = userID;
    console.log(user);
});

module.exports = User;