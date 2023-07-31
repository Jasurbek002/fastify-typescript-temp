"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const postgres_js_1 = require("../../lib/postgres.js");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, { sequelize: postgres_js_1.sequelize, modelName: "user" });
User.sync();
