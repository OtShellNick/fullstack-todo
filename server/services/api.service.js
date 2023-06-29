const ApiGateway = require("moleculer-web");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const { secret } = require('./../config/jwt');
const { Errors } = require("moleculer");

const { getUserById } = require('./../actions/user.actions');

module.exports = {
    name: "api",
    version: 1,
    mixins: [ApiGateway],
    settings: {
        origin: "*",
        methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
        use: [
            cors({
                exposedHeaders: "Authorization",
            }),
        ],
        port: 4465,
        optimizeOrder: true,
        routes: [
            {
                name: 'api',
                path: '/',
                autoAliases: true,
                bodyParser: {
                    json: true,
                    urlencoded: { extended: true },
                },
                whitelist: [
                    "$node.*",
                    "v1.api.*",
                    "v1.auth.*",
                ],
            },
            {
                name: 'todo',
                path: "/",
                authorization: true,
                autoAliases: true,
                bodyParser: {
                    json: true,
                    urlencoded: { extended: true },
                },
                whitelist: [
                    "v1.todo.*",
                ],
            },
        ],
    },
    methods: {
        authorize: async (ctx, route, req, res) => {
            let { authorization } = req.headers;

            if (!authorization) throw new Errors.MoleculerError('Unauthorized user', 401, 'UNAUTHORIZED', { message: 'Unauthorized user' });

            try {
                const decodedJWT = await jwt.decode(authorization, secret);

                const verifiedAccessToken = await jwt.verify(decodedJWT.access, secret);

                const [user] = await getUserById(verifiedAccessToken.userId);

                if (!user) throw new Errors.MoleculerError('Unregistered user', 401, 'UNREGISTERED', { message: 'Unregistered user' });

                ctx.meta.user = user;

                return Promise.resolve(ctx);
            } catch (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    throw new Errors.MoleculerError('Token expired!', 401, 'TOKEN_EXPIRED', { message: 'Token expired!' })
                }

                if (err instanceof jwt.JsonWebTokenError) {
                    throw new Errors.MoleculerError('Invalid Token', 401, 'INVALID_TOKEN', { message: 'Invalid Token' });
                }

                throw new Errors.MoleculerError(
                    err.message || 'Internal server error',
                    err.code || 500,
                    err.type || 'INTERNAL_SERVER_ERROR',
                    err.data || { error: 'Internal server' }
                );
            }
        }
    },
};

