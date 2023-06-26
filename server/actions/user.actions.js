const knex = require('./../db');

const getUserByEmail = async email => {
    return await knex('user').where({ email });
};

module.exports = {
    getUserByEmail
}