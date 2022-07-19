"use strict";
const { Sequelize, Op } = require('sequelize');
const modelOrganizacion = require('./Models/Organizacion');
const modelMetric = require('./Models/Metrics');
const modelTribu = require('./Models/Tribu');
const modelRepositorio = require('./Models/Repositorio');
// Connection URI
// const sequelize = new Sequelize('postgresql://cristian:y-0FChLV702jid8C3k1gqw@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Ditchy-owl-3590', {
//  logging: (...msg) => console.log(msg),
//  logging: false
// });
const sequelize = new Sequelize('postgres://postgres:2510@localhost:5432/test', {
    logging: (...msg) => console.log(msg),
    //logging: false
});
//verificacion de conexion con la base de datos
sequelize
    .authenticate().then(() => { console.log('Connection has been established successfully.'); })
    .catch((err) => { console.error('Unable to connect to the database:', err); });
modelOrganizacion(sequelize);
modelMetric(sequelize);
modelTribu(sequelize);
modelRepositorio(sequelize);
const { organizacion, metrics, tribu, repositorio } = sequelize.models;
organizacion.hasMany(tribu, {
    foreignKey: {
        name: 'id_organization',
        allowNull: false
    }
});
tribu.belongsTo(organizacion, {
    foreignKey: {
        name: 'id_organization',
    },
});
tribu.hasMany(repositorio, {
    foreignKey: {
        name: 'id_tribe',
        allowNull: false
    }
});
repositorio.hasOne(metrics, {
    foreignKey: 'id_repository'
});
module.exports = Object.assign(Object.assign({}, sequelize.models), { db: sequelize, Op });
