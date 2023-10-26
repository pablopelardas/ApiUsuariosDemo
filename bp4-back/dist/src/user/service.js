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
exports.remove = exports.update = exports.insert = exports.search = exports.getById = exports.getAll = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.users.findMany({
        select: {
            id: true,
            names: true,
            lastnames: true,
            email: true,
            birthdate: true,
            cuit: true,
            cellphone: true,
            address: true,
        },
    });
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.users.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            names: true,
            lastnames: true,
            email: true,
            birthdate: true,
            cuit: true,
            cellphone: true,
            address: true,
        },
    });
});
exports.getById = getById;
const search = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.users.findMany({
        where: {
            OR: [
                {
                    names: {
                        contains: query,
                    },
                },
                {
                    lastnames: {
                        contains: query,
                    },
                },
                {
                    email: {
                        contains: query,
                    },
                },
                {
                    cuit: {
                        contains: query,
                    },
                },
                {
                    cellphone: {
                        contains: query,
                    },
                },
                {
                    address: {
                        contains: query,
                    },
                },
            ],
        },
        select: {
            id: true,
            names: true,
            lastnames: true,
            email: true,
            birthdate: true,
            cuit: true,
            cellphone: true,
            address: true,
        },
    });
});
exports.search = search;
const insert = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.users.create({
        data: {
            names: user.names,
            lastnames: user.lastnames,
            email: user.email,
            birthdate: new Date(user.birthdate),
            cuit: user.cuit,
            cellphone: user.cellphone,
            address: user.address,
        },
        select: {
            id: true,
            names: true,
            lastnames: true,
            email: true,
            birthdate: true,
            cuit: true,
            cellphone: true,
            address: true,
        },
    });
});
exports.insert = insert;
const update = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.users.update({
        where: {
            id,
        },
        data: {
            names: user.names,
            lastnames: user.lastnames,
            email: user.email,
            birthdate: user.birthdate,
            cuit: user.cuit,
            cellphone: user.cellphone,
            address: user.address,
        },
        select: {
            id: true,
            names: true,
            lastnames: true,
            email: true,
            birthdate: true,
            cuit: true,
            cellphone: true,
            address: true,
        },
    });
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.users.delete({
        where: {
            id,
        },
        select: {
            id: true,
            names: true,
            lastnames: true,
            email: true,
            birthdate: true,
            cuit: true,
            cellphone: true,
            address: true,
        },
    });
});
exports.remove = remove;
