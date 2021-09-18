const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const veri = jwt.verify(token, "this is Dummy Text");
        next();
    } catch (err) {
        return res.status(401).json({
            msg: "Invalid Token",
        });
    }
};