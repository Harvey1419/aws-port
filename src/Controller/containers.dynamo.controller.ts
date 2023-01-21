import { Router } from "express";
import { createContainer, getContainer, deleteContainer } from "../Services/containers.dynamo.service";
import { containerKeysValidator, containerValidations } from "../utils/validators";

const ContainersRouter = Router()

ContainersRouter.post('/createContainer', containerValidations(containerKeysValidator),  async (req,res) => {
    await createContainer(req.body)
    res.json(req.body)  
})

ContainersRouter.get('/:numero_do', async (req, res) => {
    const container = await getContainer(req.params.numero_do)
    console.log(container);
    
    res.json(container.Items)
})

ContainersRouter.delete('/:numero_do/:numero_contenedor',async (req,res) => {
    const deleteConta = await deleteContainer(req.params.numero_do,req.params.numero_contenedor)
    res.json(deleteConta)
})


export default ContainersRouter