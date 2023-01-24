import express from 'express'
import { createOrUpdateContainer, deleteContainer, getContainerByDo } from '../../core/containers/containers.dynamo.core'


export const createContainerService = async (req: express.Request, res: express.Response) => {
    try {
        await createOrUpdateContainer(req.body)
        res.json({ "Mensaje": "Se Creo un Contenedor de manera exitosa" })
    } catch (error) {
        res.json(error)
    }
}

export const getContainerService = async (req: express.Request, res: express.Response) => {
    try {
        const container = await getContainerByDo(req.params.numero_do)
        res.json(container.Items)
    } catch (error) {
        res.json(error)
    }

}

export const deleteContainerService = async (req: express.Request, res: express.Response) => {
    try {
        const deleteConta = await deleteContainer(req.params.numero_do, req.params.numero_contenedor)
        res.json(deleteConta)
    } catch (error) {
        res.json(error)
    }
}