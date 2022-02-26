import * as Sequelize from 'sequelize';
import { sequelize } from "../config/db.config";
export class User extends Sequelize.Model {}
User.init(
  {
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
  },
  {
    sequelize,
    tableName: "users",
    underscored: true,
    paranoid: true,
  }


);
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