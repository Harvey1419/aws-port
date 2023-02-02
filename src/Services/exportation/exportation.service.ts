import express from 'express'
import { returnMessageInitialDocuments, returnMessageSaex, sendMessage } from '../../core/exportation/emails/sendEmails.core'
import { createExportation, getExportationBycompany, getExportationByNumeroDo } from '../../core/exportation/exportation.dynamo.core'
import { getSignedURL } from '../../core/s3/s3.core'


export const createExportationService = async (req: express.Request, res: express.Response) => {
    try {
        await createExportation(req.body)
        res.json({ "Mensaje": "exportación Creada" })
    } catch (error) {
        res.json(error)
    }
}

export const getExportationBycompanyService = async (req: express.Request, res: express.Response) => {
    try {
        const exportations = await getExportationBycompany(req.params.empresa)
        res.json(exportations.Items)
    } catch (error) {
        res.json(error)
    }
}
export const getExportationByNumeroDoService = async (req: express.Request, res: express.Response) => {
    try {
        const exportations = await getExportationByNumeroDo(req.params.numero_do)
        res.json(exportations.Items)
    } catch (error) {
        res.json(error)
    }
}


export const sendEmailBasedOnDocumentKey = async (req: express.Request, res: express.Response) => {
    try {
        const exportation = await getExportationByNumeroDo(req.params.numero_do)
        const items = exportation.Items
        switch (req.params.method) {
            case 'initial':
                if (items != undefined) {
                    const fileRUrl = await getSignedURL(items[0]["reserva"])
                    const fileFurl = await getSignedURL(items[0]["factura"])
                    const fileCPurl = await getSignedURL(items[0]["CP"])
                    const message = await returnMessageInitialDocuments(fileRUrl, fileFurl, fileCPurl)
                    await sendMessage(message)
                    res.json({ "Mensaje": "correo enviado" })
                } else {
                    res.send('error')
                }
                break
            case 'saex':
                if (items != undefined) {
                    const fileSaexUrl = await getSignedURL(items[0]["SAE"])
                    const message = await returnMessageSaex(fileSaexUrl)
                    await sendMessage(message)
                    res.json({ "Mensaje": "correo enviado" })
                }else{
                    res.send('error')
                }
                break
        }


    } catch (error) {
        res.json(error)
    }
}