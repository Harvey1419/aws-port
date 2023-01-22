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
exports.deleteFile = exports.getSignedURL = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
const config_1 = require("../../config/config");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3 = new client_s3_1.S3Client({
    region: config_1.AWS_S3_BUCKET_REGION,
    credentials: {
        accessKeyId: config_1.AWS_PUBLIC_KEY,
        secretAccessKey: config_1.AWS_PRIVATE_KEY
    }
});
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const fileData = file === null || file === void 0 ? void 0 : file.data;
    const fileParams = {
        Bucket: config_1.AWS_S3_BUCKET_NAME,
        Key: file.name,
        Body: fileData
    };
    const command = new client_s3_1.PutObjectCommand(fileParams);
    return yield s3.send(command);
});
exports.uploadFile = uploadFile;
const getSignedURL = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const fileParams = new client_s3_1.GetObjectCommand({
        Bucket: config_1.AWS_S3_BUCKET_NAME,
        Key: filename
    });
    return yield (0, s3_request_presigner_1.getSignedUrl)(s3, fileParams);
});
exports.getSignedURL = getSignedURL;
const deleteFile = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteParams = new client_s3_1.DeleteObjectCommand({
        Bucket: config_1.AWS_S3_BUCKET_NAME,
        Key: filename
    });
    return yield s3.send(deleteParams);
});
exports.deleteFile = deleteFile;
