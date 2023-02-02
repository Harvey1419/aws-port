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
exports.sendEmailBasedOnDocumentKey = exports.getExportationByNumeroDoService = exports.getExportationBycompanyService = exports.createExportationService = void 0;
const sendEmails_core_1 = require("../../core/exportation/emails/sendEmails.core");
const exportation_dynamo_core_1 = require("../../core/exportation/exportation.dynamo.core");
const s3_core_1 = require("../../core/s3/s3.core");
const createExportationService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exportation_dynamo_core_1.createExportation)(req.body);
        res.json({ "Mensaje": "exportación Creada" });
    }
    catch (error) {
        res.json(error);
    }
});
exports.createExportationService = createExportationService;
const getExportationBycompanyService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exportations = yield (0, exportation_dynamo_core_1.getExportationBycompany)(req.params.empresa);
        res.json(exportations.Items);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getExportationBycompanyService = getExportationBycompanyService;
const getExportationByNumeroDoService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exportations = yield (0, exportation_dynamo_core_1.getExportationByNumeroDo)(req.params.numero_do);
        res.json(exportations.Items);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getExportationByNumeroDoService = getExportationByNumeroDoService;
const sendEmailBasedOnDocumentKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exportation = yield (0, exportation_dynamo_core_1.getExportationByNumeroDo)(req.params.numero_do);
        const items = exportation.Items;
        switch (req.params.method) {
            case 'initial':
                if (items != undefined) {
                    const fileRUrl = yield (0, s3_core_1.getSignedURL)(items[0]["reserva"]);
                    const fileFurl = yield (0, s3_core_1.getSignedURL)(items[0]["factura"]);
                    const fileCPurl = yield (0, s3_core_1.getSignedURL)(items[0]["CP"]);
                    const message = yield (0, sendEmails_core_1.returnMessageInitialDocuments)(fileRUrl, fileFurl, fileCPurl);
                    yield (0, sendEmails_core_1.sendMessage)(message);
                    res.json({ "Mensaje": "correo enviado" });
                }
                else {
                    res.send('error');
                }
                break;
            case 'saex':
                if (items != undefined) {
                    const fileSaexUrl = yield (0, s3_core_1.getSignedURL)(items[0]["SAE"]);
                    const message = yield (0, sendEmails_core_1.returnMessageSaex)(fileSaexUrl);
                    yield (0, sendEmails_core_1.sendMessage)(message);
                    res.json({ "Mensaje": "correo enviado" });
                }
                else {
                    res.send('error');
                }
                break;
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.sendEmailBasedOnDocumentKey = sendEmailBasedOnDocumentKey;
