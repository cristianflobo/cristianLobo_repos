import { DataTypes } from 'sequelize'

module.exports = (sequelize:any) => {
  sequelize.define('metrics', {
    id_repository:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    coverage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    bugs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vulnerabilities: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    hostpot: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    code_smells: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }, {
    timestamps: false,
  });
}