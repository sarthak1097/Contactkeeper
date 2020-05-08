const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = function (req,res,next) {
    //get token from header
    // const token = req.header('x-auth-token')
    const token = req.headers['x-auth-token']
    //check if not token
    if(!token) {
        return res.status(401).json({mssg: 'no token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'))
        req.user = decoded.user;
        next();

        
    } catch (error) {
        console.error(error.message);
        
        res.status(401).json({mssg:'token is not validdddddd'})
        
    }

}