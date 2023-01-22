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
exports.addNewContainerToExportation = exports.createExportation = void 0;
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
const createExportation = () => __awaiter(void 0, void 0, void 0, function* () {
    const itemParams = {
        TableName: config_1.AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Item: {
            numero_do: "AWDS-12345",
            empresa: "ACA",
            reserva: "",
            containers: []
        }
    };
    const command = new lib_dynamodb_1.PutCommand(itemParams);
    return yield dynamodb.send(command);
});
exports.createExportation = createExportation;
const addNewContainerToExportation = (numero_do, container) => __awaiter(void 0, void 0, void 0, function* () {
    const itemParams = new lib_dynamodb_1.UpdateCommand({
        TableName: config_1.AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Key: {
            numero_do: numero_do
        },
        UpdateExpression: "SET containers = list_append(containers, :attrValues)",
        ConditionExpression: "NOT contains (containers, :containersObject)",
        ExpressionAttributeValues: {
            ":attrValues": [container],
            ":containersObject": container
        },
    });
    return yield dynamodb.send(itemParams);
});
exports.addNewContainerToExportation = addNewContainerToExportation;
