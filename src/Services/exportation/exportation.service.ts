import express from 'express'
import { returnMessageInitialDocuments, returnMessageSaex, returnUpdateDocument, sendMessage } from '../../core/exportation/emails/sendEmails.core'
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
        const numero_do = req.params.numero_do
        const exportation = await getExportationByNumeroDo(numero_do)
        const items = exportation.Items
        switch (req.params.method) {
            case 'initial':
                if (items != undefined) {
                    const fileRUrl = await getSignedURL(items[0]["booking"])
                    const fileFurl = await getSignedURL(items[0]["factura"])
                    const fileCPurl = await getSignedURL(items[0]["CP"])
                    const message = await returnMessageInitialDocuments(fileRUrl, fileFurl, fileCPurl, numero_do)
                    await sendMessage(message)
                    res.json({ "Mensaje": "correo enviado" })
                } else {
                    res.send('error')
                }
                break
            case 'SAE':
                if (items != undefined) {
                    const fileSaexUrl = await getSignedURL(items[0]["SAE"])
                    const message = await returnMessageSaex(fileSaexUrl, numero_do)
                    await sendMessage(message)
                    res.json({ "Mensaje": "correo enviado" })
                } else {
                    res.send('error')
                }
                break
            case 'booking':
                if (items != undefined) {
                    const fileUrl = await getSignedURL(items[0]["booking"])
                    const message = await returnUpdateDocument(fileUrl, numero_do, 'booking')
                    await sendMessage(message)
                    res.json({ "Mensaje": "correo enviado" })
                } else {
                    res.send('error')
                }
                break
            case 'factura':
                if (items != undefined) {
                    const fileUrl = await getSignedURL(items[0]["factura"])
                    const message = await returnUpdateDocument(fileUrl, numero_do, 'factura')
                    await sendMessage(message)
                    res.json({ "Mensaje": "correo enviado" })
                } else {
                    res.send('error')
                }
                break
            case 'CP':
                if (items != undefined) {
                    const fileUrl = await getSignedURL(items[0]["CP"])
                    const message = await returnUpdateDocument(fileUrl, numero_do, 'CP')
                    await sendMessage(message)
                    res.json({ "Mensaje": "correo enviado" })
                } else {
                    res.send('error')
                }
                break
        }


    } catch (error) {
        res.json(error)
    }
}