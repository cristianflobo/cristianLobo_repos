"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//import express  from 'express'
module.exports = (sequelize) => {
    sequelize.define('organizacion', {
        id_organizacion: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.CHAR(50),
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};
