import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput, PutCommandOutput, UpdateCommand, UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { AWS_DYNAMO_REGION, AWS_DYNAMO_PUBLIC_KEY, AWS_DYNAMO_SECRET_KEY, AWS_DYNAMO_CONTAINER_TABLE, AWS_DYNAMO_GENERAL_PROCESS_TABLE } from "../../config/config";
import { Container } from "../../../Models/container.model";

const dynamodb = new DynamoDBClient({
    region: AWS_DYNAMO_REGION,
    credentials:{
        accessKeyId: AWS_DYNAMO_PUBLIC_KEY,
        secretAccessKey: AWS_DYNAMO_SECRET_KEY
    }
})

export const createExportation = async(): Promise<PutCommandOutput> => {
    const itemParams: PutCommandInput = {
        TableName: AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Item: {
            numero_do: "AWDS-12345" ,
            empresa: "ACA",
            reserva: "",
            containers : []
        }

    }    
    const command = new PutCommand(itemParams)
    return await dynamodb.send(command)
}

export const addNewContainerToExportation = async(numero_do:string,container: Container): Promise<UpdateCommandOutput> => {
    const itemParams = new UpdateCommand({
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

    })    
    return await dynamodb.send(itemParams)
}
