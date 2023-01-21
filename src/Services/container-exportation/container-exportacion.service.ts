import  express  from "express"
import { createContainer } from "../../core/containers/containers.dynamo.core"
import { addNewContainerToExportation } from "../../core/exportation/exportation.dynamo.core"


export const addaNewContainerToExportation = async(req: express.Request,res: express.Response) => {
    //Falta validar el numero_do que sean iguales
    await createContainer(req.body)
    await addNewContainerToExportation(req.params?.numero_do,req.body)
    res.json({'MSG':"We did it"})
}