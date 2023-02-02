"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exportation_service_1 = require("../../Services/exportation/exportation.service");
const ExportationRouter = (0, express_1.Router)();
ExportationRouter.post('', exportation_service_1.createExportationService)
    .get('/getByCompany/:empresa', exportation_service_1.getExportationBycompanyService)
    .get('/sendMessage/:numero_do/:method', exportation_service_1.sendEmailBasedOnDocumentKey)
    .get(':numero_do', exportation_service_1.getExportationByNumeroDoService);
exports.default = ExportationRouter;
