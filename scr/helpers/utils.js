const jwt = require('jsonwebtoken');

const generateToken = ( name, role) => {
    const payload = { name, role }; 
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateToken };
