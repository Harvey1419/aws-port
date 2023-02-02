import { Router } from 'express'

import { dowloadFile, uploadFileBasedOnDocumentNameService } from '../../Services/s3/s3.service'

const routerS3 = Router()

routerS3.post('/upload/:method/:numero_do', uploadFileBasedOnDocumentNameService)
routerS3.get('/download/:filename', dowloadFile)


export default routerS3
