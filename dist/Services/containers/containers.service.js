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
exports.deleteContainerService = exports.updateContainerService = exports.newContainerStatusService = exports.getContainerService = exports.createContainerService = void 0;
const containers_dynamo_core_1 = require("../../core/containers/containers.dynamo.core");
const createContainerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numero_do = req.params.numero_do;
        if (numero_do != undefined)
            yield (0, containers_dynamo_core_1.createOrUpdateContainer)(numero_do, req.body);
        res.json({ "Mensaje": "Se Creo un Contenedor de manera exitosa" });
    }
    catch (error) {
        res.json(error);
    }
});
exports.createContainerService = createContainerService;
const getContainerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = yield (0, containers_dynamo_core_1.getContainerByDo)(req.params.numero_do);
        res.json(container.Items);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getContainerService = getContainerService;
const newContainerStatusService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = yield (0, containers_dynamo_core_1.addStatusToContainer)(req.params.numero_do, req.params.numero_contenedor, req.body);
        res.json(container);
    }
    catch (error) {
        res.json(error);
    }
});
exports.newContainerStatusService = newContainerStatusService;
const updateContainerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, containers_dynamo_core_1.updateContainer)(req.params.numero_do, req.params.numero_contenedor, req.body);
        res.json({ "Mensaje": "Se Actualizó un Contenedor de manera exitosa" });
    }
    catch (error) {
        res.json(error);
    }
});
exports.updateContainerService = updateContainerService;
const deleteContainerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteConta = yield (0, containers_dynamo_core_1.deleteContainer)(req.params.numero_do, req.params.numero_contenedor);
        res.json(deleteConta);
    }
    catch (error) {
        res.json(error);
    }
});
exports.deleteContainerService = deleteContainerService;
