const Letter = require("./models/letter");

async function query() {
    const users = await Letter.findAll();
    // console.log(users.every(user => user instanceof User)); // true
    console.log(users.length, "All users:", JSON.stringify(users, null, 2));
}

module.exports = query;