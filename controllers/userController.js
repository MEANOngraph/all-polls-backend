var User = require('../models/user');
var userService = require('../services/user');
var validator = require('../helpers/validate');

const userRegistration = async (req, res, next)=>{
    try {
        let { fullname, email, password } = req.body;
        const validationRule = {
            "fullName": "required|string",
            "email": "required|string|email",
            "password": "required|string|min:6"
        };

        await validator(req.body, validationRule, {}, async (err, status) => {
            if (err) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed!',
                        data: err
                    });
            } else {
                
                email = email.toLowerCase();
                let salt = await bcrypt.genSaltSync(10);
                let userPassword = await bcrypt.hashSync(password, salt);
                let user = new User({
                    fullName: fullname,
                    email: email,
                    password: userPassword,
                });
                userService.addUser(user);
            }
        }).catch( err => console.log(err))


    } catch (error) {
        res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in main catch' });
    }
}

const userLogin = async(req, res, next)=>{
    try {
        const { email, password } = req.body;
        const validationRule = {
            "email": "required|string|email",
            "password": "required|string|min:6"
        };

        await validator(req.body, validationRule, {}, async (err, status) => {
            if (err) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed!',
                        data: err
                    });
            } else {
                userService.addUser(email, password);
            }
        }).catch( err => console.log(err))
        
    } catch (error) {
        res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in main catch' });
    }
}

module.exports={
    userRegistration,
    userLogin
}