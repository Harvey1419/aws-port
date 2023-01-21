import { Router } from "express";
import { addaNewContainerToExportation } from "../../Services/container-exportation/container-exportacion.service";
import { createExportation } from "../../core/exportation/exportation.dynamo.core";
import { createExportationService } from "../../Services/exportation/exportation.service";

const ExportationRouter = Router()

ExportationRouter.post('', createExportationService)
                 .post('/newContainer/:numero_do', addaNewContainerToExportation)


export default ExportationRouter