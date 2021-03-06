const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req , res , next){

    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg : 'Token not found!'})
    }
    try {
        const decoded = jwt.verify(token , config.get('JWTSecret'))
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({msg : 'Invalid token!'})
    }


}