import { Router } from 'express'
import { getSignedURL, uploadFile } from '../../core/s3/s3.core'
import { UploadedFile } from 'express-fileupload'
import { createOrUpdateContainer } from '../../core/containers/containers.dynamo.core'
import { uploadFileBasedOnDocumentNameService } from '../../Services/s3/s3.service'

const routerS3 = Router()

routerS3.post('/upload/:method/:numero_do', uploadFileBasedOnDocumentNameService)


export default routerS3
