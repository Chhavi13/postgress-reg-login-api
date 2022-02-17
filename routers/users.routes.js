const userController = require('../controller/users.controller')
const express = require('express')
const router = express.Router();
const { authenticateToken , authenticateRefreshToken } = require('../middleware/auth')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getalluser', authenticateToken, userController.getalluser);
router.get('/getspecificuser/:id', authenticateToken, userController.getSpecificUser);
router.put('/user-profile/:id', authenticateToken, userController.userProfile);

router.put('/changepwd/:id', authenticateToken, userController.changepwd);
router.post('/send_mail', userController.sendMailDemo)
router.post('/refreshaccesstoken', authenticateRefreshToken,userController.refreshAccessToken)








module.exports = router;