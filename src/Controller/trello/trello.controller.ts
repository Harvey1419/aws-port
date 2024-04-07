import { Router } from "express"
import { verifyToken } from "../../Services/auth/verifyToken.service"
import { createCardService, getCardsInListService } from "../../Services/trello/trello.service"

const trelloRouter = Router()

trelloRouter.post('', verifyToken, createCardService )
            .get('/:listID', verifyToken, getCardsInListService)


export default trelloRouter
