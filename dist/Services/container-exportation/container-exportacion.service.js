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
exports.deleteContainerInExportationService = exports.updateContainerInExportationService = exports.addNewContainerToExportationService = void 0;
const containers_dynamo_core_1 = require("../../core/containers/containers.dynamo.core");
const exportation_dynamo_core_1 = require("../../core/exportation/exportation.dynamo.core");
const addNewContainerToExportationService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (req.params.numero_do === req.body.numero_do) {
            yield (0, containers_dynamo_core_1.createOrUpdateContainer)(req.body);
            yield (0, exportation_dynamo_core_1.addNewContainerToExportation)((_a = req.params) === null || _a === void 0 ? void 0 : _a.numero_do, req.body);
            res.json({ 'MSG': "Se creó un nuevo contenedor con exito" });
        }
        else {
            res.status(400).json({ 'message': "EL numero de do deben coincidir" });
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.addNewContainerToExportationService = addNewContainerToExportationService;
const updateContainerInExportationService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.numero_do === req.body.numero_do /* && req.params.numero_contenedor === req.body.numero_contenedor */) {
            const index = yield (0, exportation_dynamo_core_1.getIndexContainer)(req.params.numero_do, req.params.numero_contenedor);
            if (index != undefined) {
                yield (0, containers_dynamo_core_1.updateContainerByIndex)(req.params.numero_do, index, req.body);
                res.json({ 'message': "Contenedor Actualizado correctamente en Exportaciones" });
            }
            else {
                res.status(400).send("No se encuentra el indice");
            }
        }
        else {
            res.status(400).json({ 'message': "EL numero de do y de contenedor deben ser iguales a los enviados en los parametros deben coincidir" });
        }
        yield (0, containers_dynamo_core_1.createOrUpdateContainer)(req.body);
    }
    catch (error) {
        res.json(error);
    }
});
exports.updateContainerInExportationService = updateContainerInExportationService;
const deleteContainerInExportationService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = yield (0, exportation_dynamo_core_1.getIndexContainer)(req.params.numero_do, req.params.numero_contenedor);
        if (index != undefined) {
            yield (0, containers_dynamo_core_1.deleteContainerByIndex)(req.params.numero_do, index);
            res.json({ 'message': `El contenedor numero:${req.params.numero_contenedor} se eliminó de manera exitosa` });
        }
        else {
            res.status(400).send("No se encuentra el indice");
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.deleteContainerInExportationService = deleteContainerInExportationService;
