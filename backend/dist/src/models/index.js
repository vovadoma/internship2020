"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("./User"));
var mongoose_1 = __importDefault(require("mongoose"));
exports.default = {
    connect: function (uri, dbName) {
        return mongoose_1.default.connect(uri + "/" + dbName, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    },
    User: User_1.default,
};
