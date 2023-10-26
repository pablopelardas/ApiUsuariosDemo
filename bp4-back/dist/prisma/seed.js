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
const prisma_1 = __importDefault(require("../src/utils/prisma"));
const seedUsers = () => {
    return [
        {
            names: "Juan",
            lastnames: "Perez",
            email: "juan.perez@gmali.com",
            birthdate: new Date(),
            cuit: "20345678901",
            cellphone: "123456789",
            address: "Calle falsa 123",
        },
        {
            names: "Pedro",
            lastnames: "Gomez",
            email: "pedro.gomez@gmail.com",
            birthdate: new Date(),
            cuit: "20345678902",
            cellphone: "123456789",
            address: "Calle falsa 123",
        },
        {
            names: "Maria",
            lastnames: "Gonzalez",
            email: "maria.gonzalez@gmail.com",
            birthdate: new Date(),
            cuit: "20345678903",
            cellphone: "123456789",
            address: "Calle falsa 123",
        },
    ];
};
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(seedUsers().map((user) => prisma_1.default.users.create({ data: user })));
    });
}
seed()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
}));
