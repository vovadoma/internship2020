"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var loginRoutes_1 = require("./src/router/loginRoutes");
var default_json_1 = require("./config/default.json");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api", loginRoutes_1.router);
app.listen(default_json_1.PORT, default_json_1.HOST, function () {
    console.log("server has been started on port: " + default_json_1.PORT);
});
