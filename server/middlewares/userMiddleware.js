const jwt = require('jsonwebtoken');

const userMiddleware = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication token is missing.' });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.userId) {
            req.body.userId = tokenDecode.userId;
        } else {
            return res.status(401).json({ success: false, message: 'Invalid authentication token.' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid authentication token.' });
    }
}

module.exports = userMiddleware;