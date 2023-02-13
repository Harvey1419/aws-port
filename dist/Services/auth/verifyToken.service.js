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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.token) {
        return res.status(401).json({
            message: "Unathorize request",
        });
    }
    const token = req.header('token');
    if (!token)
        return res.status(400).json({ "Mensaje": "Acceso denegado" });
    try {
        const verify = jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(500).json({
            "Mensaje": "Token Invalido"
        });
    }
});
exports.verifyToken = verifyToken;
