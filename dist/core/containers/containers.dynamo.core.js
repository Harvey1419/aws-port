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
exports.addStatusToContainer = exports.updateContainer = exports.deleteContainer = exports.getContainerByDo = exports.createOrUpdateContainer = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const config_1 = require("../../config/config");
//import { addNewContainerToExportation } from './exportation.dynamo.service';
const dynamodb = new client_dynamodb_1.DynamoDBClient({
    region: config_1.AWS_DYNAMO_REGION,
    credentials: {
        accessKeyId: config_1.AWS_DYNAMO_PUBLIC_KEY,
        secretAccessKey: config_1.AWS_DYNAMO_SECRET_KEY
    }
});
const createOrUpdateContainer = (numero_do, container) => __awaiter(void 0, void 0, void 0, function* () {
    container.createdAt = new Date().toDateString();
    container.numero_do = numero_do;
    const itemParams = {
        TableName: config_1.AWS_DYNAMO_CONTAINER_TABLE,
        Item: container
    };
    const command = new lib_dynamodb_1.PutCommand(itemParams);
    return yield dynamodb.send(command);
});
exports.createOrUpdateContainer = createOrUpdateContainer;
const getContainerByDo = (numero_do) => __awaiter(void 0, void 0, void 0, function* () {
    const itemParam = {
        TableName: config_1.AWS_DYNAMO_CONTAINER_TABLE,
        FilterExpression: 'numero_do = :numero_do',
        ExpressionAttributeValues: {
            ':numero_do': numero_do
        }
    };
    const command = new lib_dynamodb_1.ScanCommand(itemParam);
    return yield dynamodb.send(command);
});
exports.getContainerByDo = getContainerByDo;
const deleteContainer = (numero_do, numero_contenedor) => __awaiter(void 0, void 0, void 0, function* () {
    const itemParams = new lib_dynamodb_1.DeleteCommand({
        TableName: config_1.AWS_DYNAMO_CONTAINER_TABLE,
        Key: {
            "numero_do": numero_do,
            "numero_contenedor": numero_contenedor
        }
    });
    return yield dynamodb.send(itemParams);
});
exports.deleteContainer = deleteContainer;
const updateContainer = (numero_do, numero_contenedor, container) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateExpression, expressionAttributeValues } = getExpressions(container);
    const itemParams = new lib_dynamodb_1.UpdateCommand({
        TableName: config_1.AWS_DYNAMO_CONTAINER_TABLE,
        Key: {
            numero_do: numero_do,
            numero_contenedor: numero_contenedor
        },
        UpdateExpression: `SET ${updateExpression.join(', ')}`,
        ExpressionAttributeValues: expressionAttributeValues
    });
    return yield dynamodb.send(itemParams);
});
exports.updateContainer = updateContainer;
const addStatusToContainer = (numero_do, numero_contenedor, status) => __awaiter(void 0, void 0, void 0, function* () {
    const itemParams = new lib_dynamodb_1.UpdateCommand({
        TableName: config_1.AWS_DYNAMO_CONTAINER_TABLE,
        Key: {
            numero_do: numero_do,
            numero_contenedor: numero_contenedor
        },
        UpdateExpression: "SET historico = list_append(historico, :attrValues)",
        ConditionExpression: "NOT contains (historico, :statusObject)",
        ExpressionAttributeValues: {
            ":attrValues": [status],
            ":statusObject": status
        }
    });
    return yield dynamodb.send(itemParams);
});
exports.addStatusToContainer = addStatusToContainer;
const getExpressions = (container) => {
    const updateExpression = [];
    const expressionAttributeValues = {};
    Object.keys(container).map(keys => {
        updateExpression.push(`${keys} = :${keys}`);
        expressionAttributeValues[`:${keys}`] = container[keys];
    });
    return { updateExpression, expressionAttributeValues };
};
