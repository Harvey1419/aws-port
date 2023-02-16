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
exports.loginUserService = exports.createUserService = void 0;
const users_core_1 = require("../../core/users/users.core");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const createUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { usuario, password, role, empresa } = req.body;
        const user = yield (0, users_core_1.getUserByUsername)(usuario);
        if ((_a = user.Items) === null || _a === void 0 ? void 0 : _a.length) {
            res.status(400).json({ "Mensaje": "Ya existe ese usuario" });
            return;
        }
        const newPassword = bcrypt_1.default.hashSync(password, 10);
        const userToCreate = {
            usuario: usuario,
            password: newPassword,
            role: role,
            empresa: empresa
        };
        const createNewUser = yield (0, users_core_1.createUser)(userToCreate);
        if (createNewUser.$metadata.httpStatusCode == 200) {
            res.json({ "Mensaje": "Usuario Creado" });
        }
        else {
            res.json({ "Mensaje": "Error al crear el usuario" });
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.createUserService = createUserService;
const loginUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { usuario, password } = req.body;
    const user = yield (0, users_core_1.getUserByUsername)(usuario);
    if (!((_b = user.Items) === null || _b === void 0 ? void 0 : _b.length)) {
        res.status(400).json({ "Mensaje": "No existe este usuario" });
        return;
    }
    const validPassword = yield bcrypt_1.default.compare(password, user.Items[0].password);
    if (!validPassword) {
        return res.status(400).json({ "Mensaje": "Contraseña Incorrecta" });
    }
    const token = jsonwebtoken_1.default.sign({ user: user.Items[0] }, config_1.TOKEN_SECRET, { expiresIn: '6h' });
    res.header("token").json({
        "usuario": usuario,
        "token": token,
        "role": user.Items[0].role,
        "empresa": user.Items[0].empresa
    });
});
exports.loginUserService = loginUserService;
