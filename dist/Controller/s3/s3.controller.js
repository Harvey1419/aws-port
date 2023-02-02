"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const s3_service_1 = require("../../Services/s3/s3.service");
const routerS3 = (0, express_1.Router)();
routerS3.post('/upload/:method/:numero_do', s3_service_1.uploadFileBasedOnDocumentNameService);
routerS3.get('/download/:filename', s3_service_1.dowloadFile);
exports.default = routerS3;
