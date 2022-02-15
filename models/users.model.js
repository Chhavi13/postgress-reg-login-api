
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            required: true
        },
        email: {

            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING
        },

        phone: {
            type: Sequelize.BIGINT
        }
        // },
        // isdeleted:{
        //     type:Sequelize.BOOLEAN,
        //     defaultValue: false

        // },
        // isActive:{
        //     type:Sequelize.BOOLEAN,
        //     defaultValue: false
        // }

    })
    return User;


}