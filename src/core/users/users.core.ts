import { DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput, PutCommandOutput, ScanCommand, ScanCommandInput, ScanCommandOutput, UpdateCommand, UpdateCommandInput, UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { AWS_DYNAMO_REGION, AWS_DYNAMO_PUBLIC_KEY, AWS_DYNAMO_SECRET_KEY, AWS_DYNAMO_GENERAL_PROCESS_TABLE, AWS_DYNAMO_USERS_TABLE } from "../../config/config";
import { User } from "../../Models/users.model";

const dynamodb = new DynamoDBClient({
    region: AWS_DYNAMO_REGION,
    credentials: {
        accessKeyId: AWS_DYNAMO_PUBLIC_KEY,
        secretAccessKey: AWS_DYNAMO_SECRET_KEY
    }
})

export const createUser = async (user: User): Promise<PutCommandOutput> => {
    const itemParams: PutCommandInput = {
        TableName: AWS_DYNAMO_USERS_TABLE,
        Item: user
    }
    const command = new PutCommand(itemParams)
    return await dynamodb.send(command)
}

export const getUserByUsername = async (username: string): Promise<ScanCommandOutput> => {
    const itemParam: ScanCommandInput = {
        TableName: AWS_DYNAMO_USERS_TABLE,
        FilterExpression: 'usuario = :usuario',
        ExpressionAttributeValues: {
            ':usuario': username
        }
    }
    const command = new ScanCommand(itemParam)
    return await dynamodb.send(command)
}