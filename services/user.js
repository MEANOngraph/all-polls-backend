var userModel = require('../models/user');
const bcrypt = require('bcrypt');

const addUser = async(user, res)=>{
    const response = await userModel.findOne({email: user.email});
    if(response){
        return res.status(200).json({ success: false, msg: 'User email is already exist.'});
    }
    await user.save().then(async (registerUser) => {
        if (registerUser) {
            await JwtSign({ email: registerUser.email }, async (err, token) => {
                if (err) {
                    return res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in token error' });
                }
                return res.status(200).json({ success: true, msg: 'User registration successfully.', token: token });
            })
        }
    }).catch((error) => {
        console.log(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in save user info', error: error });
    })        
}

const verifyUser = async(email, password, res)=>{
    await userModel.findOne({ email: email }).then(async (user) => {
        if (user) {
            await bcrypt.compare(password, user.password).then((isMatch) => {
                console.log(isMatch, 'uismatch uismatch uismatch uismatch ');
                if (isMatch) {
                    JwtSign({ email: email, id: user._id, }, async (err, token) => {
                        if (err) {
                            res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in token error' });
                        } else {
                            res.status(200).json({ success: true, msg: 'User login successfully.', type: 'User credentails match', token: token });
                        }
                    })
                } else {
                    res.status(200).json({ success: false, msg: 'Your credentails could be wrong!', type: 'no password match' });
                }
            }).catch((error) => {
                res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'compare password match catch' });
            });
        } else {
            res.status(200).json({ success: false, msg: 'Your credentails could be wrong!', type: 'no amin email match' });
        }
    }).catch((error) => {
        console.log(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in find user catch', error: error });
    });
}

module.exports={
    addUser,
    verifyUser
}