"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const postgres_js_1 = require("./lib/postgres.js");
const modules_1 = __importDefault(require("./modules"));
const fastify_redis_1 = __importDefault(require("fastify-redis"));
const axios_1 = __importDefault(require("axios"));
const app = (0, fastify_1.default)({ logger: true });
app.register(fastify_redis_1.default, { host: '127.0.0.1' });
app.register(modules_1.default);
app.decorate("sequelize", postgres_js_1.sequelize);
// fastify-redis
app.get("/photos", (req, rep) => __awaiter(void 0, void 0, void 0, function* () {
    const { redis } = app;
    redis.get("images", (err, images) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            console.log(err);
        if (images != null) {
            return rep.send(JSON.parse(images));
        }
        else {
            const { data } = yield axios_1.default.get("https://jsonplaceholder.typicode.com/photos");
            redis.set("images", JSON.stringify(data));
            return rep.send(data);
        }
    }));
}));
app.listen({ port: 5000 }, (err, address) => __awaiter(void 0, void 0, void 0, function* () {
    if (err) {
        app.log.error(err);
        yield postgres_js_1.sequelize.close();
        process.exit(1);
    }
    console.log(`Server is running at ${address}`);
}));
