"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userService = __importStar(require("./service"));
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAll();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
exports.userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.getById(parseInt(id));
        if (!user) {
            return res.status(404).json({ error: "No existe un usuario con ese id" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
exports.userRouter.get("/search/:query", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.params;
        const users = yield userService.search(query);
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
const validations = [
    (0, express_validator_1.body)("names").isString().notEmpty(),
    (0, express_validator_1.body)("lastnames").isString().notEmpty(),
    (0, express_validator_1.body)("email").isEmail().notEmpty(),
    (0, express_validator_1.body)("birthdate").isISO8601().notEmpty(),
    (0, express_validator_1.body)("cuit").isString().notEmpty(),
    (0, express_validator_1.body)("cellphone").isString().notEmpty(),
    (0, express_validator_1.body)("address").isString().notEmpty(),
];
exports.userRouter.post("/", ...validations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
            });
        }
        const user = yield userService.insert(req.body);
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
exports.userRouter.put("/:id", ...validations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.getById(parseInt(id));
        if (!user) {
            return res.status(404).json({ error: "No existe un usuario con ese id" });
        }
        const updatedUser = yield userService.update(parseInt(id), req.body);
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
exports.userRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.getById(parseInt(id));
        if (!user) {
            return res.status(404).json({ error: "No existe un usuario con ese id" });
        }
        yield userService.remove(parseInt(id));
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
