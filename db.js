const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql', 'root', 'hilleladel', {
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
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

module.exports = sequelize;