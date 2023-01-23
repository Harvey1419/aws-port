import { Router } from "express";
import { addNewContainerToExportationService, deleteContainerInExportationService, updateContainerInExportationService } from "../../Services/container-exportation/container-exportacion.service";
import { createExportationService, getExportationBycompanyService } from "../../Services/exportation/exportation.service";

const ExportationRouter = Router()

ExportationRouter.post('', createExportationService)
                 .post('/newContainer/:numero_do', addNewContainerToExportationService)
                 .post('/updateContainers/:numero_do/:numero_contenedor', updateContainerInExportationService)
                 .get('/getByCompany/:empresa',getExportationBycompanyService)
                 .delete('/deleteContainer/:numero_do/:numero_contenedor',deleteContainerInExportationService)

export default ExportationRouter