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
exports.updateExportation = exports.changeDocumentNameBasedOnUploadedDocument = exports.getExportationByNumeroDo = exports.getExportationBycompany = exports.createExportation = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const config_1 = require("../../config/config");
const dynamodb = new client_dynamodb_1.DynamoDBClient({
    region: config_1.AWS_DYNAMO_REGION,
    credentials: {
        accessKeyId: config_1.AWS_DYNAMO_PUBLIC_KEY,
        secretAccessKey: config_1.AWS_DYNAMO_SECRET_KEY
    }
});
const createExportation = (exportation) => __awaiter(void 0, void 0, void 0, function* () {
    exportation.createdAt = new Date().toLocaleDateString();
    const itemParams = {
        TableName: config_1.AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Item: exportation
    };
    const command = new lib_dynamodb_1.PutCommand(itemParams);
    return yield dynamodb.send(command);
});
exports.createExportation = createExportation;
const getExportationBycompany = (empresa) => __awaiter(void 0, void 0, void 0, function* () {
    const itemParam = {
        TableName: config_1.AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        FilterExpression: 'empresa = :empresa',
        ExpressionAttributeValues: {
            ':empresa': empresa
        }
    };
    const command = new lib_dynamodb_1.ScanCommand(itemParam);
    return yield dynamodb.send(command);
});
exports.getExportationBycompany = getExportationBycompany;
const getExportationByNumeroDo = (numero_do) => __awaiter(void 0, void 0, void 0, function* () {
    const itemParam = {
        TableName: config_1.AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        FilterExpression: 'numero_do = :numero_do',
        ExpressionAttributeValues: {
            ':numero_do': numero_do
        }
    };
    const command = new lib_dynamodb_1.ScanCommand(itemParam);
    return yield dynamodb.send(command);
});
exports.getExportationByNumeroDo = getExportationByNumeroDo;
const changeDocumentNameBasedOnUploadedDocument = (numero_do, document_key, document_name) => __awaiter(void 0, void 0, void 0, function* () {
    const itemParams = {
        TableName: config_1.AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Key: {
            numero_do: numero_do
        },
        UpdateExpression: `SET ${document_key} = :document_key`,
        ExpressionAttributeValues: {
            ":document_key": document_name
        },
    };
    const command = new lib_dynamodb_1.UpdateCommand(itemParams);
    return yield dynamodb.send(command);
});
exports.changeDocumentNameBasedOnUploadedDocument = changeDocumentNameBasedOnUploadedDocument;
const updateExportation = (numero_do, toUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const params = new lib_dynamodb_1.UpdateCommand({
        TableName: config_1.AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Key: {
            "numero_do": numero_do
        },
        UpdateExpression: "SET empresa = :empresa, reserva = :reserva",
        ExpressionAttributeValues: { ":empresa": toUpdate.empresa,
            ":reserva": toUpdate.reserva }
    });
    return yield dynamodb.send(params);
});
exports.updateExportation = updateExportation;
