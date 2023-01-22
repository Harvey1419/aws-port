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
const express_1 = require("express");
const s3_service_1 = require("../../core/s3/s3.service");
const routerS3 = (0, express_1.Router)();
routerS3.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
        yield (0, s3_service_1.uploadFile)(file);
        //await createContainerDb(file)
        //return res.send(await getSignedURL(file.name))
    }
    catch (error) {
        return res.send(error);
    }
}));
exports.default = routerS3;
