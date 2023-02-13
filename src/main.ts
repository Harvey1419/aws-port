import express, { Express } from 'express'
import uploadedFile from 'express-fileupload'
import { PORT } from './config/config'
import routerS3 from './Controller/s3/s3.controller'
import ContainersRouter from './Controller/containers/containers.dynamo.controller'
import ExportationRouter from './Controller/exportation/exportation.dynamo.controller'
import cors from 'cors'
 
const app: Express = express()


app.use(express.json())
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.use(uploadedFile())

app.use('/file', routerS3)

app.use('/container', ContainersRouter)

app.use('/exportation', ExportationRouter)

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`)
})
