import { DataTypes } from 'sequelize'

module.exports = (sequelize:any) => {
  sequelize.define('repositorio', {
    id_repository:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        unique: true,
      },
    state: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    
  }, {
    timestamps: false,
  });
}