const Sequelize = require("sequelize");

const sequelize = new Sequelize('ins_db', 'root', 'hilleladel', {
    host: 'localhost',
    dialect: 'mysql'
});
function init() {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}
init();

module.exports = sequelize;
// before init run this
// CREATE DATABASE ins_db;
// USE ins_db;