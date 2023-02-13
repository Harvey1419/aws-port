import { Router } from "express";
import { verifyToken } from "../../Services/auth/verifyToken.service";
import { createExportationService, getExportationBycompanyService, getExportationByNumeroDoService, sendEmailBasedOnDocumentKey } from "../../Services/exportation/exportation.service";

const ExportationRouter = Router()

ExportationRouter.post('', verifyToken ,  createExportationService)
                 .get('/company/:empresa', verifyToken , getExportationBycompanyService)
                 .get('/sendMessage/:numero_do/:method', verifyToken ,  sendEmailBasedOnDocumentKey)
                 .get('/:numero_do', verifyToken , getExportationByNumeroDoService)

export default ExportationRouter