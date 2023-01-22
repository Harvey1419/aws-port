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
exports.addaNewContainerToExportation = void 0;
const containers_dynamo_core_1 = require("../../core/containers/containers.dynamo.core");
const exportation_dynamo_core_1 = require("../../core/exportation/exportation.dynamo.core");
const addaNewContainerToExportation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //Falta validar el numero_do que sean iguales
    yield (0, containers_dynamo_core_1.createContainer)(req.body);
    yield (0, exportation_dynamo_core_1.addNewContainerToExportation)((_a = req.params) === null || _a === void 0 ? void 0 : _a.numero_do, req.body);
    res.json({ 'MSG': "We did it" });
});
exports.addaNewContainerToExportation = addaNewContainerToExportation;
