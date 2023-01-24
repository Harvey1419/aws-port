import { Router } from "express";
import { createContainerService, getContainerService, deleteContainerService, newContainerStatusService,  } from "../../Services/containers/containers.service";
import { containerKeysValidator, containerValidations } from "../../utils/validators";

const ContainersRouter = Router()

ContainersRouter.post('/createContainer', containerValidations(containerKeysValidator),  createContainerService)
                .get('/:numero_do', getContainerService)
                .delete('/:numero_do/:numero_contenedor', deleteContainerService)
                .post('/newStatus/:numero_do/:numero_contenedor', newContainerStatusService)


export default ContainersRouter