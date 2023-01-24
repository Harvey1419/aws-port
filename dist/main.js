"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const config_1 = require("./config/config");
const s3_controller_1 = __importDefault(require("./Controller/s3/s3.controller"));
const containers_dynamo_controller_1 = __importDefault(require("./Controller/containers/containers.dynamo.controller"));
const exportation_dynamo_controller_1 = __importDefault(require("./Controller/exportation/exportation.dynamo.controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.use('/file', s3_controller_1.default);
app.use('/container', containers_dynamo_controller_1.default);
app.use('/exportation', exportation_dynamo_controller_1.default);
app.listen(config_1.PORT, () => {
    console.log(`Escuchando en el puerto ${config_1.PORT}`);
});
