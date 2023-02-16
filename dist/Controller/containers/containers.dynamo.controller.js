"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_service_1 = require("../../Services/auth/verifyToken.service");
const containers_service_1 = require("../../Services/containers/containers.service");
const validators_1 = require("../../utils/validators");
const ContainersRouter = (0, express_1.Router)();
ContainersRouter.post('/createContainer/:numero_do', verifyToken_service_1.verifyToken, (0, validators_1.containerValidations)(validators_1.containerKeysValidator), containers_service_1.createContainerService)
    .get('/:numero_do', verifyToken_service_1.verifyToken, containers_service_1.getContainerService)
    .delete('/:numero_do/:numero_contenedor', verifyToken_service_1.verifyToken, containers_service_1.deleteContainerService)
    .post('/newStatus/:numero_do/:numero_contenedor', verifyToken_service_1.verifyToken, containers_service_1.newContainerStatusService)
    .put('/:numero_do/:numero_contenedor', verifyToken_service_1.verifyToken, containers_service_1.updateContainerService);
exports.default = ContainersRouter;
