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
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerKeysValidator = exports.containerValidations = void 0;
const express_validator_1 = require("express-validator");
const containerValidations = (containerValidations) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all(containerValidations.map(validation => validation.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).send({ error: errors.array() });
    });
};
exports.containerValidations = containerValidations;
exports.containerKeysValidator = [
    (0, express_validator_1.body)('numero_do').isString().notEmpty().withMessage('No puede ser vacio'),
    (0, express_validator_1.body)('numero_contenedor').isString(),
    (0, express_validator_1.body)('volumen').isInt(),
    (0, express_validator_1.body)('tara').isInt(),
    (0, express_validator_1.body)('naviera').isString(),
    (0, express_validator_1.body)('Sellos').isString(),
    (0, express_validator_1.body)('Destino').isString(),
    (0, express_validator_1.body)('ETA').isString(),
    (0, express_validator_1.body)('Material').isString()
];
