const db = require('../models/index.model')
const student = db.student;
const myclass = db.myclass;



exports.addStudents = async (req, res) => {
    try {

        const { fullname, email, phone, classId } = req.body;
        //  console.log("req body", req.body)
        const studdata = await student.findOne({
            where: {
                email: email
            }

        })


        if (studdata) {
            return res.status(400).json({
                error: "student already there, No need to register again.",
            });
        } else {

            const studDetail = {
                fullname: fullname,
                email: email,
                phone: phone,
                classId: classId
            };

            //console.log("class*****", cls)
            student.create(studDetail)
                .then(data => {
                    res.status(200).send({
                        message: "student added successfully",
                        data: data
                    })
                    //console.log("data", data)
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while registation."
                    });
                });


        }

    }
    catch (error) {
        console.log(error)
    }
}


exports.getstudentdetails = async (req, res) => {
    try {
        const _classId = req.params.myclassId;
        console.log(_classId)
        await student.findAll({
            where: {
                classId: _classId
            },
            attributes: ['fullname', 'email']
        })
            .then((students => {
                res.status(200).json({
                    message: `students details  `,
                    data: students
                })
            })).catch((error) =>
                console.log(error))

    } catch (error) {
        console.log(error)
    }
}




exports.getstudentById = async (req, res) => {
    try {
        const _id = req.params.studentId;
        console.log(req.params)
        await student.findByPk(_id, {
            attributes: ['fullname', 'email'],
            //  include: ["classdetails"]
            include: [{
                model: myclass,
                as: 'classdetails',
                attributes: ['course','numberofstudent']
            }]
        })
            .then((student) => {
                res.status(200).json(student)
            })
            .catch((err) => {
                console.log(">> Error while finding student: ", err);
            });

    } catch (error) {

        console.log(error)

    }
}


exports.updateStudentInfo = async (req, res) => {
    try {

        const _id = req.params.studentId;
        console.log(_id)
        const _classId = req.params.myclassId
        console.log(_classId)
        await student.update(req.body, {
            where: {
                id: _id,
                classId: _classId

            }

        })
            //console.log(student.fullname)
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "student updated successfully",

                    })
                } else {
                    res.send({
                        message: `Cannot update student with id=${_id}. Maybe student not found!`
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not update student with id=" + _id
                })


            })



    } catch (error) {
        console.log(error)

    }
}



exports.deleteStudent = async (req, res) => {
    try {

        const _id = req.params.studentId;
        console.log(_id)
        const _classId = req.params.myclassId
        console.log(_classId)

        await student.destroy({
            where: {
                id: _id,
                classId: _classId
            }
        })
            .then((data => {
                if (data == true) {
                    res.status(200).json({
                        message: "student delete successfully"
                    })
                }
            })).catch(err => {
                res.status(400).send('data not found')
            })



    } catch (error) {
        console.log(error)

    }
}
