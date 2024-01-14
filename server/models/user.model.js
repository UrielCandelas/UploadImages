import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.CHAR(20),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: false,
    }
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
export default Users;