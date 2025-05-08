
const jwt = require("jsonwebtoken")
const JWT_SECRET = "Sunbeam@DMCFeb2025";  //process.env.JWT_SECRET

//Create Token
function createToken(user) {
    const payload = {id: user.id, email: user.email};
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return token;
}

//Verify Token
function verifyToken(token) {
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch(err) {
        console.log("Token Verification Failed :", err);
        return null;
    }
}

//JWT Authentication MiddleWare - Verify JWT Token
function jwtAuth(req, resp, next) {
    const nonProtectedUrls = ["/users/signin", "/users/signup"];
    if (nonProtectedUrls.indexOf(req.url) >= 0) {
        next();
        return;
    }

    if (!req.headers.authorization)
        resp.status(403).send("Unauthorized Access");

    const [bearer, token] = req.headers.authorization.split(" ");

    const decoded = verifyToken(token);
    console.log("Incoming User Token : ", decoded);

    if (!decoded)
        resp.status(403).send("Unauthorized Access");
    else{
        req.user = {id: decoded.id, email: decoded.email};
        next();
    }
}


module.exports = {
    createToken,
    jwtAuth
}