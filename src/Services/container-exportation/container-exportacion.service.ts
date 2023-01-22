import express from "express"
import { createContainer } from "../../core/containers/containers.dynamo.core"
import { addNewContainerToExportation } from "../../core/exportation/exportation.dynamo.core"


export const addaNewContainerToExportation = async (req: express.Request, res: express.Response) => {
    try {
        if (req.params.numero_do === req.body.numero_do) {
            await createContainer(req.body)
            await addNewContainerToExportation(req.params?.numero_do, req.body)
            res.json({ 'MSG': "We did it" })
        } else {
            res.status(400).send('EL numero de do deben coincidir')
        }
    } catch (error) {
        res.json(error)
    }
}