import {DeleteBackupCommandOutput, DynamoDBClient} from '@aws-sdk/client-dynamodb'
import {PutCommand, ScanCommand, PutCommandInput, ScanCommandInput, ScanCommandOutput, PutCommandOutput, DeleteCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import { AWS_DYNAMO_CONTAINER_TABLE, AWS_DYNAMO_GENERAL_PROCESS_TABLE, AWS_DYNAMO_PUBLIC_KEY, AWS_DYNAMO_REGION, AWS_DYNAMO_SECRET_KEY } from '../../config/config';
import { Container } from '../../../Models/container.model';
//import { addNewContainerToExportation } from './exportation.dynamo.service';

const dynamodb = new DynamoDBClient({
    region: AWS_DYNAMO_REGION,
    credentials:{
        accessKeyId: AWS_DYNAMO_PUBLIC_KEY,
        secretAccessKey: AWS_DYNAMO_SECRET_KEY
    }
})

export const createContainer = async(container: Container): Promise<PutCommandOutput> => {
    container.createdAt = new Date().toLocaleDateString()
    const itemParams: PutCommandInput = {
        TableName: AWS_DYNAMO_CONTAINER_TABLE,
        Item: container

    }    
    const command = new PutCommand(itemParams)
    return await dynamodb.send(command)
}

export const getContainer = async(numero_do: string): Promise<ScanCommandOutput> => {
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

