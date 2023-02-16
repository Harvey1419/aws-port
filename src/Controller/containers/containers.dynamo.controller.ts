import { Router } from "express";
import { verifyToken } from "../../Services/auth/verifyToken.service";
import { createContainerService, getContainerService, deleteContainerService, newContainerStatusService, updateContainerService,  } from "../../Services/containers/containers.service";
import { containerKeysValidator, containerValidations } from "../../utils/validators";

const ContainersRouter = Router()

ContainersRouter.post('/createContainer/:numero_do', verifyToken, containerValidations(containerKeysValidator),  createContainerService)
                .get('/:numero_do', verifyToken, getContainerService)
                .delete('/:numero_do/:numero_contenedor', verifyToken , deleteContainerService)
                .post('/newStatus/:numero_do/:numero_contenedor', verifyToken , newContainerStatusService)
                .put('/:numero_do/:numero_contenedor', verifyToken ,updateContainerService)


export default ContainersRouter