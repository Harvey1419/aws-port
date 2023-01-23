import express from "express"
import { createOrUpdateContainer, deleteContainerByIndex, updateContainerByIndex } from "../../core/containers/containers.dynamo.core"
import { addNewContainerToExportation, getIndexContainer } from "../../core/exportation/exportation.dynamo.core"


export const addNewContainerToExportationService = async (req: express.Request, res: express.Response) => {
    try {
        if (req.params.numero_do === req.body.numero_do) {
            await createOrUpdateContainer(req.body)
            await addNewContainerToExportation(req.params?.numero_do, req.body)
            res.json({ 'MSG': "Se creó un nuevo contenedor con exito" })
        } else {
            res.status(400).json({ 'message': "EL numero de do deben coincidir" })
        }
    } catch (error) {
        res.json(error)
    }
}

export const updateContainerInExportationService = async (req: express.Request, res: express.Response) => {
    try {
        if (req.params.numero_do === req.body.numero_do /* && req.params.numero_contenedor === req.body.numero_contenedor */) {
            const index = await getIndexContainer(req.params.numero_do, req.params.numero_contenedor)
            if (index != undefined) {
                await updateContainerByIndex(req.params.numero_do, index, req.body)
                res.json({ 'message': "Contenedor Actualizado correctamente en Exportaciones" })
            }
            else {
                res.status(400).send("No se encuentra el indice")
            }
        } else {
            res.status(400).json({ 'message': "EL numero de do y de contenedor deben ser iguales a los enviados en los parametros deben coincidir" })
        }

        await createOrUpdateContainer(req.body)
    } catch (error) {
        res.json(error)
    }
}

export const deleteContainerInExportationService = async (req: express.Request, res: express.Response) => {
    try {
        const index = await getIndexContainer(req.params.numero_do, req.params.numero_contenedor)
        if (index != undefined) {
            await deleteContainerByIndex(req.params.numero_do, index)
            res.json({ 'message': `El contenedor numero:${req.params.numero_contenedor} se eliminó de manera exitosa` })
        }
        else {
            res.status(400).send("No se encuentra el indice")
        }
        
    } catch (error) {
        res.json(error)
    }
}