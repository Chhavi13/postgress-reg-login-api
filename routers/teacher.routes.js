const teacherController = require('../controller/teacher.controller')
const express = require('express')
const router = express.Router()

router.post('/registerteacher',teacherController.registerTeacher)




module.exports =router;