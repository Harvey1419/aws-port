"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_exportacion_service_1 = require("../../Services/container-exportation/container-exportacion.service");
const exportation_service_1 = require("../../Services/exportation/exportation.service");
const ExportationRouter = (0, express_1.Router)();
ExportationRouter.post('', exportation_service_1.createExportationService)
    .post('/newContainer/:numero_do', container_exportacion_service_1.addNewContainerToExportationService)
    .post('/updateContainers/:numero_do/:numero_contenedor', container_exportacion_service_1.updateContainerInExportationService)
    .get('/getByCompany/:empresa', exportation_service_1.getExportationBycompanyService)
    .delete('/deleteContainer/:numero_do/:numero_contenedor', container_exportacion_service_1.deleteContainerInExportationService)
    .get('/sendMessage/:numero_do/:method', exportation_service_1.sendEmailBasedOnDocumentKey);
exports.default = ExportationRouter;
