const Sequelize = require('sequelize');

const sequelize = require('../config/db')

const Letter = sequelize.define('Letter', {
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

module.exports = Letter;