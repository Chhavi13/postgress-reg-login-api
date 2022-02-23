const jwt = require('jsonwebtoken');
const refreshTokenList = [];

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).send("Unauthorized request!")
    //console.log("token",token)
    // console.log("req",req)

    jwt.verify(token, "chhavi_chourasiya", (err, user) => {
        //console.log(err)
        // console.log("token===",token)

        if (err) return res.status(401).send({ message: "invalid token" })

        req.user = user;
        //  console.log("req user",req.user)
        next();

    })

}


function authenticateRefreshToken(req, res, next) {

    const Token = req.body.refreshtoken
    if (Token == null) return res.status(401).send("Unauthorized request!")

    // console.log("token", Token)
    // console.log("req",req)

    try {
        jwt.verify(Token, "chhavi_chourasiya_dec", (err, user) => {
            //console.log(err)
        //   console.log("token===",Token)
            // console.log("req user", user)
            // console.log("req user", user.data)

            if (err) return res.status(401).send({ message: "invalid token" })

            req.user = user;
            // console.log("user***", user)
            // console.log("userdata", user.data)
            // console.log(refreshTokenList)
            const storedRefreshToken = refreshTokenList.find(x => x.email === user.data)

              console.log("store",storedRefreshToken.refreshToken)

            if (storedRefreshToken === undefined) return res.status(401).send("invalid request and token is not in store")
            if (storedRefreshToken.refreshToken != Token) return res.status(401).send("invalid request and token is not same in store")
            next();

        })
    } catch (error) {
        console.log(error)
    }
}
// testing paagapanti
// chhavi




function generateAccessToken(email) {
    return jwt.sign({ data: email }, "chhavi_chourasiya", { expiresIn: '1m' });     //, { expiresIn: '2h' }
}
function generateAccessRefreshToken(email) {
    const refreshToken = jwt.sign({ data: email }, "chhavi_chourasiya_dec", { expiresIn: '1d' });     //, { expiresIn: '2h' }

    let storedRefreshToken = refreshTokenList.find(x => x.email === email);
    if (storedRefreshToken === undefined) {
        refreshTokenList.push({
            email: email,
            refreshToken: refreshToken
        })

    } else {
        refreshTokenList[refreshTokenList.findIndex(x => x.email === email)].token = refreshToken;
    }

    return refreshToken;


}


module.exports = {
    authenticateToken,
    generateAccessToken,
    generateAccessRefreshToken,
    authenticateRefreshToken

}