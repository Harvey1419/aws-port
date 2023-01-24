import { config } from 'dotenv'

config()

export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string
export const AWS_S3_BUCKET_REGION = process.env.AWS_S3_BUCKET_REGION as string
export const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY as string
export const AWS_PRIVATE_KEY = process.env.AWS_PRIVATE_KEY as string
export const PORT = process.env.PORT as string

export const AWS_DYNAMO_REGION = process.env.AWS_DYNAMO_REGION as string
export const AWS_DYNAMO_PUBLIC_KEY = process.env.AWS_DYNAMO_PUBLIC_KEY as string
export const AWS_DYNAMO_SECRET_KEY = process.env.AWS_DYNAMO_SECRET_KEY as string
export const AWS_DYNAMO_CONTAINER_TABLE = process.env.AWS_DYNAMO_CONTAINER_TABLE as string
export const AWS_DYNAMO_GENERAL_PROCESS_TABLE = process.env.AWS_DYNAMO_GENERAL_PROCESS_TABLE as string
