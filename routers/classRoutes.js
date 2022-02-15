const classController = require('../controller/class.controller')
const express = require('express');
const router = express.Router();
const  {authenticateToken} = require('../middleware/auth')



router.post('/myclass',authenticateToken, classController.registerClass);
router.get('/getallclass', classController.getallclass);
router.get('/getclass/:classId/:studentId', classController.getclassbyid);

router.put('/updateclassinfo/:id',authenticateToken,classController.updateclassinfo);
router.delete('/deleteclass/:id',classController.deleteclass);

module.exports =router;