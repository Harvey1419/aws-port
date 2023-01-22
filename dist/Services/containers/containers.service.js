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
exports.deleteContainerService = exports.getContainerService = exports.createContainerService = void 0;
const containers_dynamo_core_1 = require("../../core/containers/containers.dynamo.core");
const createContainerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, containers_dynamo_core_1.createContainer)(req.body);
    res.json(req.body);
});
exports.createContainerService = createContainerService;
const getContainerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const container = yield (0, containers_dynamo_core_1.getContainer)(req.params.numero_do);
    res.json(container.Items);
});
exports.getContainerService = getContainerService;
const deleteContainerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteConta = yield (0, containers_dynamo_core_1.deleteContainer)(req.params.numero_do, req.params.numero_contenedor);
    res.json(deleteConta);
});
exports.deleteContainerService = deleteContainerService;
