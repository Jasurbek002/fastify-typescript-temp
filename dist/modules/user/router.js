"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const userRouter = (router, option, done) => {
    router.get("/users", controller_1.default.GET);
    router.post("/users", controller_1.default.POST);
    router.put("/users/:userId", controller_1.default.PUT);
    router.delete("/users/:userId", controller_1.default.DELETE);
    done();
};
exports.default = userRouter;
