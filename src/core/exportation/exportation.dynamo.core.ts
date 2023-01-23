import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput, PutCommandOutput, ScanCommand, ScanCommandInput, ScanCommandOutput, UpdateCommand, UpdateCommandInput, UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { AWS_DYNAMO_REGION, AWS_DYNAMO_PUBLIC_KEY, AWS_DYNAMO_SECRET_KEY, AWS_DYNAMO_GENERAL_PROCESS_TABLE } from "../../config/config";
import { Container } from "../../Models/container.model";
import { Exportation } from "../../Models/exportation.model";

const dynamodb = new DynamoDBClient({
    region: AWS_DYNAMO_REGION,
    credentials: {
        accessKeyId: AWS_DYNAMO_PUBLIC_KEY,
        secretAccessKey: AWS_DYNAMO_SECRET_KEY
    }
})

export const createExportation = async (exportation: Exportation): Promise<PutCommandOutput> => {
    exportation.containers = []
    exportation.createdAt = new Date().toLocaleDateString()
    const itemParams: PutCommandInput = {
        TableName: AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Item: exportation
    }
    const command = new PutCommand(itemParams)
    return await dynamodb.send(command)
}

export const getExportationBycompany = async (empresa: string): Promise<ScanCommandOutput> => {
    const itemParam: ScanCommandInput = {
        TableName: AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        FilterExpression: 'empresa = :empresa',
        ExpressionAttributeValues: {
            ':empresa': empresa
        }
    }
    const command = new ScanCommand(itemParam)
    return await dynamodb.send(command)
}

export const getIndexContainer = async (numero_do: string, numero_contenedor: string) => {
    const itemParam: ScanCommandInput = {
        TableName: AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        FilterExpression: 'numero_do = :numero_do',
        ExpressionAttributeValues: {
            ':numero_do': numero_do
        }
    }
    const command = new ScanCommand(itemParam)
    const response = await dynamodb.send(command)
    let items = response.Items;
    if (items != undefined) {
        const containers: Array<Container> = items[0]["containers"]
        const indexToUpdate = containers.map(x => x.numero_do && x.numero_contenedor).indexOf(numero_do && numero_contenedor)
        return indexToUpdate
    }

}

export const addNewContainerToExportation = async (numero_do: string, container: Container): Promise<UpdateCommandOutput> => {
    const itemParams = {
        TableName: AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Key: {
            numero_do: numero_do
        },
        UpdateExpression: "SET containers = list_append(containers, :attrValues)",
        ConditionExpression: "NOT contains (containers, :containersObject)",
        ExpressionAttributeValues: {
            ":attrValues": [container],
            ":containersObject": container
        },
    }
    const command = new UpdateCommand(itemParams)
    return await dynamodb.send(command)
}

export const changeDocumentNameBasedOnUploadedDocument = async (numero_do: string, document_key: string, document_name: string) => {
    const itemParams = {
        TableName: AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Key: {
            numero_do: numero_do
        },
        UpdateExpression: `SET ${document_key} = :document_key`,
        ExpressionAttributeValues: {
            ":document_key": document_name
        },
    }
    const command = new UpdateCommand(itemParams)
    return await dynamodb.send(command)
}
