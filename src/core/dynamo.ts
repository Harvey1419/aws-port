import  express  from "express"
import { createContainer } from "../Services/containers.dynamo.service"
import { addNewContainerToExportation } from "../Services/exportation.dynamo.service"


export const addaNewContainerToExportation = async(req: express.Request,res: express.Response) => {
    await createContainer(req.body)
    await addNewContainerToExportation(req.params?.numero_do,req.body)
    res.json({'MSG':"We did it"})
}