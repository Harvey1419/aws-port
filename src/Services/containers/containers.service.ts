import express from 'express'
import { addStatusToContainer, createOrUpdateContainer, deleteContainer, getContainerByDo } from '../../core/containers/containers.dynamo.core'


export const createContainerService = async (req: express.Request,res: express.Response) => {
    await createOrUpdateContainer(req.body)
    res.json(req.body)  
}

export const getContainerService = async (req: express.Request,res: express.Response) => {
    const container = await getContainerByDo(req.params.numero_do)
    res.json(container.Items)
}

export const deleteContainerService = async (req: express.Request,res: express.Response) => {
    const deleteConta = await deleteContainer(req.params.numero_do,req.params.numero_contenedor)
    res.json(deleteConta)
}

export const newContainerStatus = async (req: express.Request, res: express.Response) => {
    const container = await addStatusToContainer(req.params.numero_do, req.params.numero_contenedor, req.body)
    res.json(container)
}