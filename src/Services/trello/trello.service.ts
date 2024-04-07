import { createCard, getCardsInList } from "../../core/trello/trello.core"
import express from 'express'

export const createCardService = async (req: express.Request, res: express.Response) => {
    try {
        await createCard(req.body)
        res.json({ "Mensaje": "Card creada" })
    } catch (error) {
        res.json(error)
    }
}

export const getCardsInListService =async (req: express.Request, res: express.Response) => {
    try {
        const cards = await getCardsInList(req.params.listID)
        res.json(cards)
    } catch (error) {
        res.json(error)
    }
}