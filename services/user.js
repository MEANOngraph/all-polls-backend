var userModel = require('../models/user');

const addUser = async(user)=>{
    await user.save().then(async (registerUser) => {
        if (registerUser) {
            JwtSign({ email: registerUser.email }, async (err, token) => {
                if (err) {
                    res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in token error' });
                } else {
                    res.status(200).json({ success: true, msg: 'User registration successfully.', token: token });
                }
            })
        } else {
            res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'error in User Registration' });
        }
    }).catch((error) => {
        res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in save user info' });
    })
}

const findUser = async(email, password)=>{
    await User.findOne({ email: email }).then(async (user) => {
        if (user) {
            await bcrypt.compare(password, user.password).then((isMatch) => {
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
        res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in find user catch' });
    });
}

module.exports={
    addUser,
    findUser
}