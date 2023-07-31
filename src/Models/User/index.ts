import {DataTypes, Model} from "sequelize"
import { sequelize } from "../../lib/postgres.js";

// User modelini tuzish
interface UserAttributes {
    firstName: string;
    lastName: string;
    age: number;
  }

class User extends Model<UserAttributes> {}
User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" }
);

User.sync()


export {User}