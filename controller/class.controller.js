const { student } = require('../models/index.model');
const db = require('../models/index.model')
const myclass = db.myclass;
const mystudent = db.student;

exports.registerClass = async (req, res) => {
    try {

        const { classname, numberofstudent, course ,studentId} = req.body;
        //  console.log("req body", req.body)
        const classdata = await myclass.findOne({
            where: {
                classname: classname
            }

        })


        if (classdata) {
            return res.status(400).json({
                error: "class already there, No need to register again.",
            });
        } else {

            const cls = {
                classname: classname,
                numberofstudent: numberofstudent,
                course: course,
                studentId:studentId
            };

            //console.log("class*****", cls)
            myclass.create(cls)
                .then(data => {
                    res.status(200).send({
                        message: "class added successfully",
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
exports.getallclass = async (req, res) => {
    try {

        const data = await myclass.findAll({

        })
        let response = {
            data: data
        }
        res.status(200).json(response)


    } catch (error) {
        console.log(error)
    }
}




exports.getclassbyid = async (req, res) => {
    try {
        const _classId = req.params.classId
        console.log(_classId)


        const data = await myclass.findOne({
            where: {
                id: _classId
            },
            include: [{
                model: mystudent,
                as: 'studentsDetails',

                where: {
                    id: req.params.studentId
                }
            }]


        })
        let response = {
            data: data
        }
        res.status(200).json(response)


    } catch (error) {
        console.log(error)
    }
}

exports.updateclassinfo = async (req, res) => {
    try {
        const id = req.params.id;


        const data = await myclass.update(req.body, {
            where: {
                id: id
            }
        }).then(num => {
            if (num == 1) {
                res.send({
                    message: "class updated successfully"
                })
            } else {
                res.send({
                    message: `Cannot update class with id=${id}. Maybe class was not found!`
                })
            }
        })
            .catch(err => {
                res.status(500).send({
                    message: "Could not update class with id=" + id
                })


            })

    } catch (e) {
        console.log(e)
    }
}

exports.deleteclass = async (req, res) => {
    try {

        const id = req.params.id;
        const data = await myclass.destroy({
            where: {
                id: id
            }
        }).then(num => {
            if (num == 1) {
                res.status(200).send("class deleted successfully")
            }
            else {
                res.send({
                    message: `Cannot delete class with id=${id}. Maybe class was not found!`
                })
            }
        }).catch(err => {
            res.status(500).send("server error")
        })

    } catch (error) {

    }
}