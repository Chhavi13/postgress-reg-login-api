const dbconfig = require('../config/db.config')
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {

    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    logging:false,
    pool: {

        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle


    }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize

db.users = require('./users.model')(sequelize, Sequelize)
db.myclass = require('./class.model ')(sequelize,Sequelize)
db.student = require('./students.model')(sequelize,Sequelize)
db.teachers = require('./teachers.models')(sequelize,Sequelize)

db.myclass.hasMany(db.student, { as: "studentsDetails" });
db.student.belongsTo(db.myclass, {
  foreignKey: "classId",
  as: "classdetails",
});




module.exports = db;