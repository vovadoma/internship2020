"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserScheme = new mongoose_1.Schema({
    firstName: { type: String },
    lastName: { type: Number },
    phone: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
});
var User = mongoose_1.model("Movie", UserScheme);
exports.default = User;
