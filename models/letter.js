const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Letter = sequelize.define('Letter', {
  // Model attributes are defined here
  letterID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  letterType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  insureId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  destributionType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

// `sequelize.define` also returns the model
console.log(Letter === sequelize.models.Letter); // true
module.exports = Letter;