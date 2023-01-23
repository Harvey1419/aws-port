import express from 'express'
import { createExportation, getExportationBycompany } from '../../core/exportation/exportation.dynamo.core'


export const createExportationService = async (req: express.Request,res: express.Response) => {
    await createExportation()
    res.send('exportación Creada')
}

export const getExportationBycompanyService =async (req: express.Request,res: express.Response) => {
    const exportations = await getExportationBycompany(req.params.empresa)
    res.json(exportations.Items)
}