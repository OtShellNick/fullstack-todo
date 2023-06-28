const { Errors: { MoleculerError } } = require('moleculer');
const { getUserByEmail, createUser, loginUser, hash, getUserById } = require('./../actions/user.actions');
const { sendLoginMessage } = require('./../actions/mail.actions');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

module.exports = {
    name: 'auth',
    version: 1,
    actions: {
        register: {
            rest: "POST /register",
            params: {
                email: { type: 'string', optional: false },
                password: { type: 'string', optional: false },
            },
            handler: async ({ params }) => {
                const { email, password } = params;
                let user = null;

                try {
                    [user] = await getUserByEmail(email);


                    if (!user) {
                        user = await createUser({ email, password });

                        return { confirmLink: await sendLoginMessage(user, user.confirm) };
                    }

                    throw new MoleculerError('User already exists', 409, 'ALREADY_EXISTS', { error: 'User already exists' });
                } catch (err) {
                    console.error(err);
                    throw new MoleculerError(
                        err.message || 'Internal server error',
                        err.code || 500,
                        err.type || 'INTERNAL_SERVER_ERROR',
                        err.data || { error: 'Internal server' }
                    );
                }
            }
        },
        confirm: {
            rest: "GET /confirm",
            params: {
                code: { type: 'string', optional: false },
            },
            handler: async ({ params }) => {
                const { code } = params;
                let user = null;

                if (code === 'undefined') return;

                try {
                    const codeData = await jwt.verify(code, secret);

                    [user] = await getUserById(codeData.userId);

                    if (!user) {
                        throw new MoleculerError('User not found', 404, 'NOT_FOUND', { error: 'User not found' });
                    }

                    return { token: await loginUser(user) };
                } catch (err) {
                    console.error(err);
                    throw new MoleculerError(
                        err.message || 'Internal server error',
                        err.code || 500,
                        err.type || 'INTERNAL_SERVER_ERROR',
                        err.data || { error: 'Internal server' }
                    );
                }
            }
        },
        login: {
            rest: "POST /login",
            params: {
                email: { type: 'string', optional: false },
                password: { type: 'string', optional: false }
            },
            handler: async ({ params }) => {
                const { email, password } = params;

                try {
                    const [user] = await getUserByEmail(email);

                    if (!user) throw new MoleculerError('User not Found', 404, 'NOT_FOUND', { error: 'User not found' });

                    if (hash(password) !== user.password) throw new MoleculerError('Wrong password', 400, 'WRONG_PASSWORD', { error: 'Wrong password' });

                    if (!user.confirmed) throw new MoleculerError('Confirm email!', 400, 'CONFIRM_EMAIL', { error: 'Confirm email' });

                    return { token: await loginUser(user) };
                } catch (err) {
                    console.error(err);
                    throw new MoleculerError(
                        err.message || 'Internal server error',
                        err.code || 500,
                        err.type || 'INTERNAL_SERVER_ERROR',
                        err.data || { error: 'Internal server' }
                    );
                }
            }
        }
    }
}