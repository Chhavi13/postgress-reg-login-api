const studentController = require('../controller/student.controller')
const express = require('express');
const router = express.Router();
const  {authenticateToken} = require('../middleware/auth')
const classRoutes = require('../routers/classRoutes')

router.post('/myclass/addstudent',authenticateToken, studentController.addStudents);
router.get('/myclass/:myclassId/getstudentinfo',studentController.getstudentdetails);
router.get('/myclass/getstudentinfobyid/:studentId',studentController.getstudentById);
router.put('/myclass/:myclassId/updateStudent/:studentId',studentController.updateStudentInfo)
router.delete('/myclass/:myclassId/deleteStudent/:studentId',studentController.deleteStudent)
module.exports =router;