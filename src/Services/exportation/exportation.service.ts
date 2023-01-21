import express from 'express'
import { createExportation } from '../../core/exportation/exportation.dynamo.core'


export const createExportationService = async (req: express.Request,res: express.Response) => {
    await createExportation()
    res.send('exportación Creada')
}