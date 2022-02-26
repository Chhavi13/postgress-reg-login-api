"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.default = User;
const UserMap = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullname: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        //   birthdate: {
        //     type: DataTypes.DATE,
        //     allowNull: true
        //   }
        email: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        country: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: true
    });
    User.sync();
};
exports.UserMap = UserMap;
