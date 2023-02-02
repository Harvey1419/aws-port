import { Router } from "express";
import { createExportationService, getExportationBycompanyService, getExportationByNumeroDoService, sendEmailBasedOnDocumentKey } from "../../Services/exportation/exportation.service";

const ExportationRouter = Router()

ExportationRouter.post('', createExportationService)
                 .get('/getByCompany/:empresa',getExportationBycompanyService)
                 .get('/sendMessage/:numero_do/:method', sendEmailBasedOnDocumentKey)
                 .get(':numero_do',getExportationByNumeroDoService)

export default ExportationRouter