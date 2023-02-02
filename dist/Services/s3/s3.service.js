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
exports.dowloadFile = exports.uploadFileBasedOnDocumentNameService = void 0;
const exportation_dynamo_core_1 = require("../../core/exportation/exportation.dynamo.core");
const s3_core_1 = require("../../core/s3/s3.core");
const uploadFileBasedOnDocumentNameService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
        const method = req.params.method;
        if (method === 'reserva' || method === 'factura' || method === 'CP' || method === 'BL' || method === 'DEX' || method === 'SAE') {
            yield (0, s3_core_1.uploadFile)(file);
            yield (0, exportation_dynamo_core_1.changeDocumentNameBasedOnUploadedDocument)(req.params.numero_do, method, file.name);
            res.json({ 'Mensaje': `Archivo subido en la exportancion con numero do: ${req.params.numero_do}` });
        }
        else {
            res.status(400).json({ 'Mensaje': `No existe el documento ${method} en exportaciones` });
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.uploadFileBasedOnDocumentNameService = uploadFileBasedOnDocumentNameService;
const dowloadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileName = req.params.filename;
        const url = yield (0, s3_core_1.getSignedURL)(fileName);
        res.json({ "URL": url });
    }
    catch (error) {
        res.json(error);
    }
});
exports.dowloadFile = dowloadFile;
