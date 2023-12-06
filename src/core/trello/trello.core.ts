import axios from 'axios'
import { KEY_TRELLO, TOKEN_TRELLO } from '../../config/config'
import { CardTrello } from '../../Models/trello.model'

export const createCard = async (card: CardTrello) => {
    const {listID, mensaje } = card
    const params = {
        idList: listID,
        key: KEY_TRELLO,
        token: TOKEN_TRELLO,
        name: mensaje
    }
    const response = await axios.post(`https://api.trello.com/1/cards`, null, {params : params})
    return response.data
}

export const getCardsInList =async (listID: string) => {
    const response = await axios.get(`https://api.trello.com/1/lists/${listID}/cards`, {
        params: {
            key: KEY_TRELLO,
            token: TOKEN_TRELLO,
        }
    })
    return response.data
}