"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const fastify_1 = __importDefault(require("fastify"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const path_1 = require("path");
const pino_1 = __importDefault(require("pino"));
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogs';
const createApp = (opts) => {
    const defaultOptions = {
        logger: (0, pino_1.default)({ level: 'info' })
    };
    const app = (0, fastify_1.default)(Object.assign(Object.assign({}, defaultOptions), opts));
    app.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, 'routes'),
        options: { prefix: '/api' },
    });
    app.listen(3000, (err, address) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
        console.log(`server listening on ${address}`);
    });
    return app;
};
createApp();
