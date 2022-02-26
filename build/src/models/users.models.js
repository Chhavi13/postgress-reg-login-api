"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Sequelize = __importStar(require("sequelize"));
const db_config_1 = require("../config/db.config");
class User extends Sequelize.Model {
}
exports.User = User;
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: new Sequelize.STRING(128),
        allowNull: false,
    },
    email: {
        type: new Sequelize.STRING(128),
        allowNull: false,
    },
    password: {
        type: new Sequelize.STRING(128),
        allowNull: false,
    },
}, {
    sequelize: db_config_1.sequelize,
    tableName: "users",
    underscored: true,
    paranoid: true,
});
User.sync();
// export const UserMap = (sequelize: Sequelize) => {
//   User.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     fullname: {
//       type: DataTypes.STRING(255),
//       allowNull:true
//     },
//   //   birthdate: {
//   //     type: DataTypes.DATE,
//   //     allowNull: true
//   //   }
//   email: {
//       type: DataTypes.STRING(255),
//       allowNull:true
//     },
//     password: {
//       type: DataTypes.STRING(100),
//       allowNull: true
//     }
//   }, {
//     sequelize,
//     tableName: 'users',
//     timestamps: true
//   });
//   User.sync();
// }
