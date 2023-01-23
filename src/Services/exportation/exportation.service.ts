import express from 'express'
import { createExportation, getExportationBycompany } from '../../core/exportation/exportation.dynamo.core'


export const createExportationService = async (req: express.Request, res: express.Response) => {
    try {
        await createExportation(req.body)
        res.json({ "Mensaje": "exportación Creada" })
    } catch (error) {
        res.json(error)
    }
}

export const getExportationBycompanyService = async (req: express.Request, res: express.Response) => {
    try {
        const exportations = await getExportationBycompany(req.params.empresa)
        res.json(exportations.Items)
    } catch (error) {
        res.json(error)
    }
}