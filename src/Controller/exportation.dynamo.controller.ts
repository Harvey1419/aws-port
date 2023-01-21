import { Router } from "express";
import { addaNewContainerToExportation } from "../core/dynamo";
import { createExportation } from "../Services/exportation.dynamo.service";

const ExportationRouter = Router()

ExportationRouter.post('', async(req,res) => {
    const a = await createExportation() 
    res.json(a)
})

ExportationRouter.post('/newContainer/:numero_do', addaNewContainerToExportation)





export default ExportationRouter