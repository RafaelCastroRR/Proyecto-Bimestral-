

const jwt = require('jsonwebtoken');

const generateToken = (name, role) => {
    const payload = { name, role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

module.exports = { generateToken };
