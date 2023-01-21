import { S3Client, PutObjectCommand, PutObjectCommandOutput, DeleteObjectCommand, DeleteObjectCommandOutput , GetObjectCommand} from '@aws-sdk/client-s3'
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { AWS_S3_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_PRIVATE_KEY, AWS_S3_BUCKET_NAME } from '../../config/config'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { UploadedFile } from 'express-fileupload'

const s3 = new S3Client({
  region: AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_PRIVATE_KEY
  }
})

export const uploadFile = async (file: UploadedFile): Promise<PutObjectCommandOutput> => {
  const fileData: Buffer = file?.data
  const fileParams = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: file.name,
    Body: fileData
  }
  const command = new PutObjectCommand(fileParams)
  return await s3.send(command)
}

export const getSignedURL = async (filename: string): Promise<string> => {
  const fileParams = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: filename
  })
  return await getSignedUrl(s3,fileParams)
}

export const deleteFile = async (filename: string): Promise<DeleteObjectCommandOutput> => {
  const deleteParams = new DeleteObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: filename
  })
  return await s3.send(deleteParams)
}
