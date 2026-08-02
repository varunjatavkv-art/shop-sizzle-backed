// authenticating users for performing different actions

const dotenv = require("dotenv");
dotenv.config
const authenticateToken = (req, res, next) => {
    // getting token from cookies
    const token = req.cookies.token;
    // checking if token present or not
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    // verifiying user with token
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next;
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
};
module.exports = authenticateToken;