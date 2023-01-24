import {DeleteBackupCommandOutput, DynamoDBClient} from '@aws-sdk/client-dynamodb'
import {PutCommand, ScanCommand, PutCommandInput, ScanCommandInput, ScanCommandOutput, PutCommandOutput, DeleteCommand, UpdateCommand, UpdateCommandInput, UpdateCommandOutput} from "@aws-sdk/lib-dynamodb";
import { AWS_DYNAMO_CONTAINER_TABLE, AWS_DYNAMO_GENERAL_PROCESS_TABLE, AWS_DYNAMO_PUBLIC_KEY, AWS_DYNAMO_REGION, AWS_DYNAMO_SECRET_KEY } from '../../config/config';
import { Container } from '../../Models/container.model';
import { Status } from '../../Models/status.model';
//import { addNewContainerToExportation } from './exportation.dynamo.service';

const dynamodb = new DynamoDBClient({
    region: AWS_DYNAMO_REGION,
    credentials:{
        accessKeyId: AWS_DYNAMO_PUBLIC_KEY,
        secretAccessKey: AWS_DYNAMO_SECRET_KEY
    }
})

export const createOrUpdateContainer = async(container: Container): Promise<PutCommandOutput> => {
    container.createdAt = new Date().toDateString()
    const itemParams: PutCommandInput = {
        TableName: AWS_DYNAMO_CONTAINER_TABLE,
        Item: container

    }    
    const command = new PutCommand(itemParams)
    return await dynamodb.send(command)
}

export const getContainerByDo = async(numero_do: string): Promise<ScanCommandOutput> => {
    const itemParam: ScanCommandInput = {
        TableName: AWS_DYNAMO_CONTAINER_TABLE,
        FilterExpression: 'numero_do = :numero_do',
        ExpressionAttributeValues: {
            ':numero_do': numero_do
        }
    }
    const command = new ScanCommand(itemParam)
    return await dynamodb.send(command)
}

export const deleteContainer = async(numero_do: string,numero_contenedor:string): Promise<DeleteBackupCommandOutput> => {
    const itemParams = new DeleteCommand({
        TableName: AWS_DYNAMO_CONTAINER_TABLE,
        Key:{
            "numero_do":numero_do,
            "numero_contenedor":numero_contenedor
        }
    })
    return await dynamodb.send(itemParams)
}

export const updateContainerByIndex = async (numero_do:string, index:Number,container:Container) => {
    const itemParams: UpdateCommandInput = {
        TableName: AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Key: {
            "numero_do": numero_do
        },
        UpdateExpression: `SET containers[${index}] = :containers`,
        ExpressionAttributeValues: {
            ":containers" : container
        }
    }
    const command = new UpdateCommand(itemParams)
    return await dynamodb.send(command)
}

export const deleteContainerByIndex = async (numero_do:string, index: Number) => {
    console.log('?');
    
    const itemParams:UpdateCommandInput = {
        TableName: AWS_DYNAMO_GENERAL_PROCESS_TABLE,
        Key: {
            "numero_do":numero_do
        },
        UpdateExpression: `REMOVE containers[${index}]`
    }
    const command = new UpdateCommand(itemParams)
    return await dynamodb.send(command)
}
export const addStatusToContainer = async(numero_do: string, numero_contenedor:string, status: Status): Promise<UpdateCommandOutput> => {

    const itemParams = new UpdateCommand({
        TableName: AWS_DYNAMO_CONTAINER_TABLE,
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
    })
    return await dynamodb.send(itemParams);
} 

