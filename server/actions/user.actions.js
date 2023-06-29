const knex = require('./../db');
const { tokens, secret } = require('./../config/jwt');
const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');

const hash = password => createHash('sha256').update(password).digest('hex');

const generateToken = (userId, tokenType) => {
    const payload = {
        userId,
        type: tokens[tokenType].type
    };

    const options = {
        expiresIn: tokens[tokenType].expiresIn
    };

    return jwt.sign(payload, secret, options);
};

const getUserByEmail = async email => await knex('user').where({ email });

const getUserById = async id => await knex('user').where({ id });

const createUser = async user => {
    const hashPassword = hash(user.password);

    const newUser = {
        ...user,
        password: hashPassword,
        confirmed: false,
    }
    const [{ id }] = await knex('user').insert(newUser).returning('id');
    return { ...newUser, id, confirm: jwt.sign({ userId: id, type: 'CONFIRM' }, secret, { expiresIn: '1d' }) }
};

const updateUser = async (user, data) => {
    return await knex('user').where('id', '=', user.id).update(data, ['id', 'email', 'refresh', 'confirmed']);
}

const loginUser = async user => {
    const accessToken = generateToken(user.id, 'access');
    const refreshToken = generateToken(user.id, 'refresh');

    try {
        await updateUser(user, { refresh: refreshToken, confirmed: true });

        return jwt.sign({ access: accessToken, refresh: refreshToken }, secret);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    loginUser,
    hash
}