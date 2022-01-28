var jwt = require('jsonwebtoken');

const userIdFromJWT = async (token) => {
    var authorization = await token, decoded;
    try {
        return decoded = await jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (e) {
        return e;
    }
}

module.exports = userIdFromJWT