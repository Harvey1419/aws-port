"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_service_1 = require("../../Services/auth/verifyToken.service");
const exportation_service_1 = require("../../Services/exportation/exportation.service");
const ExportationRouter = (0, express_1.Router)();
ExportationRouter.post('', verifyToken_service_1.verifyToken, exportation_service_1.createExportationService)
    .get('/company/:empresa', verifyToken_service_1.verifyToken, exportation_service_1.getExportationBycompanyService)
    .get('/sendMessage/:numero_do/:method', verifyToken_service_1.verifyToken, exportation_service_1.sendEmailBasedOnDocumentKey)
    .get('/:numero_do', verifyToken_service_1.verifyToken, exportation_service_1.getExportationByNumeroDoService);
exports.default = ExportationRouter;
