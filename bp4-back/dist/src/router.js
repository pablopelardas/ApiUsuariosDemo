"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const controller_1 = require("./user/controller");
exports.routes = [
    {
        path: "/api/users",
        router: controller_1.userController,
    },
];
