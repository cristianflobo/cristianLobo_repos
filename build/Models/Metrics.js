"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('metrics', {
        id_repository: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        coverage: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false,
        },
        bugs: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        vulnerabilities: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        hostpot: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        code_smells: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};
