import { Router } from 'express'

import { uploadFileBasedOnDocumentNameService } from '../../Services/s3/s3.service'

const routerS3 = Router()

routerS3.post('/upload/:method/:numero_do', uploadFileBasedOnDocumentNameService)


export default routerS3
