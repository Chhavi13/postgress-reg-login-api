const userController = require('../controller/users.controller')
const express = require('express')
const router = express.Router();
require('../server')
const { authenticateToken , authenticateRefreshToken } = require('../middleware/auth');
const passport = require('passport');
const google =require('../config/google')
// const googleStretagy = require('passport-google-oauth20')
// passport.use(new googleStretagy({
//   clientID:"525514000319-ff7qvd05d8subocqcovt9mhtmv4s6ven.apps.googleusercontent.com",
//   clientSecret:"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",
//   callbackURL:"/auth/google/callback"
// },(accessToken,refreshToken,profile,done)=>{
//   console.log(accessToken)
//   console.log(refreshToken)
//   console.log(profile)
// }))
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getalluser', authenticateToken, userController.getalluser);
router.get('/getspecificuser/:id', authenticateToken, userController.getSpecificUser);
router.put('/user-profile/:id', authenticateToken, userController.userProfile);

router.put('/changepwd/:id', authenticateToken, userController.changepwd);
router.post('/send_mail', userController.sendMailDemo)
router.post('/refreshaccesstoken', authenticateRefreshToken,userController.refreshAccessToken)

// router.get("/auth/google/",passport.authenticate("google",{
//     scope:["profile","email"]
//   }))
  
//   router.get("/auth/google/callback",passport.authenticate("google"))
  




module.exports = router;