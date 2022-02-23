const db = require('../models/index.model')

const teachers = db.teachers;
const sequelize = db.sequelize;
const myclass = db.myclass;

exports.registerTeacher = async (req, res) => {

    let transaction;
    try {

        transaction = await sequelize.transaction();
        const { fullname, email, phone, classname, numberofstudent, course, studentId } = req.body;
        console.log("req body", req.body)
        const teacherData = await teachers.findOne({
            where: {
                email: email
            }

        })

        if (teacherData) {
            return res.status(400).json({
                error: "teacher already there, No need to register again.",
            });
        }

        const teachersDetail = {
            fullname: fullname,
            email: email,
            phone: phone,

        };

        //console.log("class*****", cls)
        const teachersInfo = await teachers.create(
            teachersDetail, { transaction: transaction })


        const classdata = await myclass.findOne({
            where: {
                classname: classname
            }
        })
        if (classdata) {
            return res.status(400).json({
                error: "class already there, No need to register again.",
            });
        }

        const cls = {
            classname: classname,
            numberofstudent: numberofstudent,
            course: course,
            studentId: studentId
        };

        //console.log("class*****", cls)
        const classInfo = await myclass.create(cls, { transaction: transaction })


        if (!teachersInfo || !classInfo) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while registation."
            })
        }
        res.status(200).send({
            data: [teachersInfo, classInfo],
            message: "data saved successfully"
        })

        console.log("success")
        await transaction.commit()


    }
    catch (error) {
        if (transaction) {
            console.log("rollback")
            await transaction.rollback()


        }
        console.log(error)

    }

}







// .then(data => {
        //    // console.log(transaction)
        //     res.status(200).send({
        //         message: "teachers added successfully",
        //         data: data
        //     })

        // })
        // .catch(err => {
        //     res.status(500).send({
        //         message:
        //             err.message || "Some error occurred while registation."
        //     });

        // });



         // .then(data => {
        //     res.status(200).send({
        //         message: "class added successfully",
        //         data: data
        //     })
        //     //console.log("data", data)
        // })
        // .catch(err => {
        //     res.status(500).send({
        //         message:
        //             err.message || "Some error occurred while registation."
        //     });

        // });