
module.exports = (sequelize, Sequelize) => {
    const myclass = sequelize.define("class", {

        // id: {
        //     type: Sequelize.UUID,
        //     allowNull: false,
        //     defaultValue: Sequelize.UUIDV4,
        //     primaryKey: true
        // },


        classname: {
            type: Sequelize.STRING,

        },
        numberofstudent: {

            type: Sequelize.STRING,


        },
        course: {
            type: Sequelize.STRING
        },
        studentId: {
            type: Sequelize.INTEGER,
            foreignKey: true
        }

    })
    return myclass;


}