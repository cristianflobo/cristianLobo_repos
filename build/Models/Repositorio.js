"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('repositorio', {
        id_repository: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.CHAR(50),
            allowNull: false,
            unique: true,
        },
        state: {
            type: sequelize_1.DataTypes.CHAR(1),
            allowNull: false,
        },
        create_time: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.CHAR(1),
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};
