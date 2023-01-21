import { Router } from 'express'
import { getSignedURL, uploadFile } from '../Services/s3.service'
import { UploadedFile } from 'express-fileupload'
import { createContainer } from '../Services/containers.dynamo.service'

const routerS3 = Router()

routerS3.post('/upload', async (req, res) => {
  try {
    const file = req.files?.file as UploadedFile
    await uploadFile(file)
    //await createContainerDb(file)
    //return res.send(await getSignedURL(file.name))
  } catch (error) {
    return res.send(error)
  }
})


export default routerS3
