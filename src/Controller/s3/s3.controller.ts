import { Router } from 'express'
import { verifyToken } from '../../Services/auth/verifyToken.service'

import { dowloadFile, uploadFileBasedOnDocumentNameService } from '../../Services/s3/s3.service'

const routerS3 = Router()

routerS3.post('/upload/:method/:numero_do', verifyToken, uploadFileBasedOnDocumentNameService)
routerS3.get('/download/:filename', verifyToken , dowloadFile)


export default routerS3
