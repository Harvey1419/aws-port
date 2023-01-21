import express from 'express'
import { createContainer, deleteContainer, getContainer } from '../../core/containers/containers.dynamo.core'


export const createContainerService = async (req: express.Request,res: express.Response) => {
    await createContainer(req.body)
    res.json(req.body)  
}

export const getContainerService = async (req: express.Request,res: express.Response) => {
    const container = await getContainer(req.params.numero_do)
    res.json(container.Items)
}

export const deleteContainerService = async (req: express.Request,res: express.Response) => {
    const deleteConta = await deleteContainer(req.params.numero_do,req.params.numero_contenedor)
    res.json(deleteConta)
}