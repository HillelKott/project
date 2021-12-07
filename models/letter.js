const Sequelize = require('sequelize');

const sequelize = require('../db')

const Letter = sequelize.define('Letter', {
  // Model attributes are defined here
  letterID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  letterType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  insureId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  destributionType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

// `sequelize.define` also returns the model
console.log(Letter === sequelize.models.Letter); // true
module.exports = Letter;