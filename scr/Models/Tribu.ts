import { DataTypes } from 'sequelize'

module.exports = (sequelize:any) => {
  sequelize.define('tribu', {
    id_tribe:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.CHAR(50),
        allowNull: false,
      },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
}