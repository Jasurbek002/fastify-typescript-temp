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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../Models/User");
function GET(req, rep) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield User_1.User.findAll();
            rep.send(data);
        }
        catch (error) {
            throw error;
        }
    });
}
function POST(req, rep) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { firstName, lastName, age } = req.body;
            const user = yield User_1.User.create({ firstName, lastName, age });
            rep.code(200).send({ message: "successfuly added!", data: user });
        }
        catch (error) {
            rep.code(500).send({ error: "Internal Server Error" });
        }
    });
}
function PUT(req, rep) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const { firstName } = req.body;
            const user = yield User_1.User.findByPk(userId);
            if (user) {
                const data = yield user.update({ firstName });
                rep.code(200).send({
                    message: "Successfuly updated!",
                    data: data,
                });
            }
            else {
                rep.code(404).send({
                    message: "user not found!",
                    data: null,
                });
            }
        }
        catch (error) {
            rep.code(500).send({ error: "internal server error" });
        }
    });
}
function DELETE(req, rep) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const user = yield User_1.User.findByPk(userId);
            if (user) {
                yield user.destroy();
                rep.code(200).send({
                    message: "Successfully deleted!",
                });
            }
            else {
                rep.code(404).send({
                    message: "User not found!",
                });
            }
        }
        catch (error) {
            rep.code(500).send({ error: "Internal server error" });
        }
    });
}
exports.default = { GET, POST, PUT, DELETE };
