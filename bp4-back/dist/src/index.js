"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT,
}));
router_1.routes.forEach((route) => {
    app.use(route.path, route.router);
});
app.get("/", (req, res) => {
    res.send("Ingrese a /api/users para utilizar la api");
});
const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => {
    console.log(`💻 SERVER >> Server running on port ${PORT}`);
});
