const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
 
let JwtSign = (payload, cb) => {
 jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1d' }, cb);
}
 
module.exports = JwtSign;