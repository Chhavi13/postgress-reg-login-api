
module.exports = (sequelize, Sequelize) => {
    const teachers = sequelize.define("teachers", {
        fullname: {
            type: Sequelize.STRING,

        },
        email: {

            type: Sequelize.STRING,


        },
        phone: {
            type: Sequelize.STRING
        }
    })
    return  teachers ;


}