
module.exports = (sequelize, Sequelize) => {
    const student = sequelize.define("student", {
        fullname: {
            type: Sequelize.STRING,

        },
        email: {

            type: Sequelize.STRING,


        },
        phone: {
            type: Sequelize.STRING
        },
        classId: {
            type: Sequelize.INTEGER,
            foreignKey: true
        }

    })
    return student;


}