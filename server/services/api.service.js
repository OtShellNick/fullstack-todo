const ApiGateway = require("moleculer-web");
const cors = require("cors");

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
        routes: [
            {
                path: "/",
                autoAliases: true,
                bodyParser: {
                    json: true,
                    urlencoded: { extended: true },
                },
            },
        ],
    },
};

