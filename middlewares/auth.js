const jwt = require('jsonwebtoken');
require("dotenv").config();


// Middleware function to check the JWT token in cookies
const authenticateToken = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    // Verify the token
           const decode = jwt.verify(token,process.env.JWT_SECRET)
           
        // Attach user information to the request object
        req.user = decode;

        // Call the next middleware function
        next();
    };


module.exports = authenticateToken;
